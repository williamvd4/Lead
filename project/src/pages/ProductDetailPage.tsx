import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShopItem, ShopItem, Size as ProductSize, AddToCartPayload } from '../api/ecommerceService'; 
import { useCart } from '../api/CartContext';
import { toast } from 'react-toastify';
import './ProductDetailPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_MEDIA || 'http://localhost:8000';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ShopItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addItemToCart, loading: cartLoading, cart } = useCart(); 

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        const msg = 'Product slug is missing. Cannot fetch details.';
        setError(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getShopItem(slug);
        if (!data) { // Handle case where item is not found by slug
          const msg = `Product with slug "${slug}" not found.`;
          setError(msg);
          toast.error(msg);
          setProduct(null); // Ensure product is null if not found
        } else {
          setProduct(data);
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0].name); 
          }
          setError(null);
        }
      } catch (err) {
        const errorMessage = (err as Error)?.message || 'Failed to fetch product details.';
        setError(errorMessage);
        toast.error(errorMessage); // Add toast notification for fetch error
        console.error('Fetch product error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => { // Added async
    if (product && product.id) { 
      const productId = typeof product.id === 'string' ? parseInt(product.id, 10) : product.id;
      if (isNaN(productId)) {
        toast.error("Invalid product ID."); // Use toast
        return;
      }
      const selectedSizeObject = product.sizes?.find(s => s.name === selectedSize);
      const payload: AddToCartPayload = {
         product_id: productId, 
         quantity,
         ...(selectedSizeObject && { size_id: selectedSizeObject.id }),
        };
      
      try {
        await addItemToCart(payload); // Added await
        toast.success(`${product.name} added to cart!`); // Use toast
      } catch (error) {
        // Error is handled by CartContext, but you can show a specific toast here too
        toast.error(`Failed to add ${product.name} to cart. ${(error as Error).message || 'Please try again.'}`); // Use toast
      }
    }
  };

  if (loading) {
    return <div className="product-detail-loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="product-detail-error">Error: {error} <Link to="/shop">Go back to shop</Link></div>;
  }

  if (!product) {
    return <div className="product-detail-not-found">Product not found. <Link to="/shop">Go back to shop</Link></div>;
  }

  const currentQuantityInCart = cart?.items.reduce((acc, item) => {
    if (item.product.id === product.id && (selectedSize ? item.size?.name === selectedSize : true)) {
      return acc + item.quantity;
    }
    return acc;
  }, 0) ?? 0;
  
  const selectedProductSizeDetails = product.sizes?.find((s: ProductSize) => s.name === selectedSize);
  
  const effectiveStock = product.sizes && product.sizes.length > 0 
    ? (selectedProductSizeDetails?.stock ?? 0)
    : (product.in_stock ? Infinity : 0);


  const canAddToCart = effectiveStock > 0 && quantity <= (effectiveStock - currentQuantityInCart) ;
  const isOutOfStock = effectiveStock <= 0 || (effectiveStock !== Infinity && currentQuantityInCart >= effectiveStock) ;

  const getButtonText = () => {
    if (cartLoading) return 'Adding...';
    if (isOutOfStock) return 'Out of Stock';
    // Check if user is trying to add more than available stock for the current selection
    if (quantity > (effectiveStock - currentQuantityInCart)) return 'Not enough stock';
    if (!canAddToCart) return 'Cannot add to cart'; // General case if not covered above
    return 'Add to Cart';
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-section">
          {product.image && 
            <img 
              src={product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`}
              alt={product.name} 
              className="product-detail-image" 
            />}
        </div>
        <div className="product-info-section">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">${parseFloat(product.price).toFixed(2)}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="product-sizes">
              <label htmlFor="size-select">Size:</label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                disabled={cartLoading}
              >
                {product.sizes.map((size: ProductSize) => ( 
                  <option key={size.id} value={size.name}>
                    {size.name} (Stock: {size.stock})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="product-quantity">
            <label htmlFor="quantity-input">Quantity:</label>
            <input
              type="number"
              id="quantity-input"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              min="1"
              max={effectiveStock === Infinity ? undefined : (effectiveStock - currentQuantityInCart)} 
              disabled={cartLoading || isOutOfStock || effectiveStock === 0}
            />
          </div>
          
          <p className="product-stock-info">
            Available stock: {isOutOfStock ? 'Out of Stock' : (effectiveStock === Infinity ? 'Available' : (effectiveStock - currentQuantityInCart))}
          </p>
          {currentQuantityInCart > 0 && (
            <p className="in-cart-info">
              You have {currentQuantityInCart} of this item {selectedSize ? `(Size: ${selectedSize})` : ''} in your cart.
            </p>
          )}

          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={cartLoading || !canAddToCart || isOutOfStock }
          >
            {getButtonText()} 
          </button>
          {cartLoading && <p>Updating cart...</p>}
          
          <div className="product-detail-actions">
            <Link to="/shop" className="continue-shopping-link">Continue Shopping</Link>
            <Link to="/cart" className="go-to-cart-link">Go to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
