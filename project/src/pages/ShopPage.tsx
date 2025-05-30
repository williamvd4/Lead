import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { getShopItems, ShopItem, Size, AddToCartPayload } from '../api/ecommerceService';
import { useCart } from '../api/CartContext';
import { toast } from 'react-toastify';
import './ShopPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_MEDIA || 'http://localhost:8000';

const ShopPage: React.FC = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(true);
  const [pageError, setPageError] = useState<string | null>(null); // Renamed from error to avoid conflict with cartError

  const {
    addItemToCart,
    loading: cartLoading, // Renamed to avoid conflict with loadingItems
    error: cartError,
    isItemInCart // Optional: to give feedback if item is already in cart
  } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        const data = await getShopItems();
        setItems(data);
        setPageError(null);
      } catch (err) {
        setPageError('Failed to fetch shop items. Please try again later.');
        console.error(err);
      } finally {
        setLoadingItems(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = async (productId: number, selectedSizeId?: number) => {
    const payload: AddToCartPayload = { product_id: productId, quantity: 1 };
    if (selectedSizeId) {
      payload.size_id = selectedSizeId;
    }

    try {
      await addItemToCart(payload);
      toast.success('Item added to cart!'); // Use toast notification
    } catch (err) {
      // Error is already handled by CartContext, which might show its own toast
      // If CartContext doesn't show a toast for this, or you want a specific one here:
      toast.error('Failed to add item to cart. Please try again.'); // Use toast notification
    }
  };

  if (loadingItems) return <div className="shop-page-loading">Loading products...</div>;
  if (pageError) return <div className="shop-page-error">{pageError}</div>;
  if (items.length === 0) return <div className="shop-page-empty">No products available at the moment.</div>;

  return (
    <div className="shop-page">
      <h1>Shop Our Products</h1>
      {cartError && <div className="shop-page-error cart-error">Cart Error: {cartError}</div>} {/* Display cart errors */}
      <div className="product-grid">
        {items.map((item) => {
          const itemAlreadyInCart = isItemInCart(item.id /*, selectedSizeId - need to get this if checking size too */);
          return (
            <div key={item.id} className="product-card">
              <Link to={`/product/${item.slug}`} className="product-link"> {/* Added Link wrapper */}
                {item.thumbnail && (
                  <img 
                    src={item.thumbnail.startsWith('http') ? item.thumbnail : `${API_BASE_URL}${item.thumbnail}`}
                    alt={item.name} 
                    className="product-image" 
                  />
                )}
                <h2>{item.name}</h2>
              </Link> {/* End Link wrapper */}
              <p className="product-price">${parseFloat(item.price).toFixed(2)}</p>
              <p className="product-description">{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</p>
              
              {item.sizes && item.sizes.length > 0 && (
                <div className="product-sizes">
                  <label htmlFor={`size-select-${item.id}`}>Size: </label>
                  <select id={`size-select-${item.id}`} defaultValue={item.sizes[0]?.id}> 
                    {item.sizes.map((size: Size) => (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button 
                onClick={() => {
                  const sizeSelect = document.getElementById(`size-select-${item.id}`) as HTMLSelectElement | null;
                  const selectedSizeId = item.sizes.length > 0 && sizeSelect ? parseInt(sizeSelect.value) : undefined;
                  handleAddToCart(item.id, selectedSizeId);
                }}
                disabled={!item.in_stock || cartLoading || itemAlreadyInCart} // Disable if out of stock, cart is loading, or item already in cart (basic check)
                className={`add-to-cart-button ${itemAlreadyInCart ? 'in-cart' : ''}`}
              >
                {cartLoading ? 'Adding...' : (itemAlreadyInCart ? 'In Cart' : (item.in_stock ? 'Add to Cart' : 'Out of Stock'))}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopPage;
