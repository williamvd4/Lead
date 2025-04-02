import React, { useState, useEffect } from 'react';
import ProductModal from '../components/ProductModal';

// Update the interface to match the updated model
interface Product {
  id: number;
  name: string;
  price?: number; // Ensure price is consistent with ProductModal's definition
  image?: string;
  description: string;
  category?: string;
  size?: string;
  available_sizes?: string;
}

const ShopItems: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [popupVisible, setPopupVisible] = useState<number | null>(null); // State for popup visibility

  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/shopitems/")
      .then(response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("API response data:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load shop items. Error details:", error);
        setError("Failed to load shop items. Please try again later.");
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product: Product, selectedSize: string = 'N/A') => {
    console.log(`Added ${product.name} (Size: ${selectedSize}) to cart.`);
    const updatedCart = [...cart, { ...product, size: selectedSize }];
    setCart(updatedCart);
    localStorage.setItem('basket', JSON.stringify({
      id: 1,
      lines: updatedCart.map(item => ({
        id: item.id,
        product: item.id,
        product_title: item.name,
        quantity: 1,
        line_price_incl_tax: item.price ? item.price.toString() : '0.00',
      })),
      total_incl_tax: updatedCart.reduce((sum, item) => sum + (item.price ? parseFloat(item.price.toString()) : 0), 0).toFixed(2),
      num_items: updatedCart.length,
    }));

    // Show popup near the button
    setPopupVisible(product.id);
    setTimeout(() => setPopupVisible(null), 2000); // Hide after 2 seconds
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-black bg-center"
          style={{
            backgroundImage: `url('/images/logo.png')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-label="Shop"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-8xl font-bold mb-4">Shop</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && <p>Loading shop items...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-60 object-contain bg-black cursor-pointer"
                      onClick={() => openModal(product)}
                    />
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      {product.price !== undefined && product.price !== null && (
                        <span className="bg-emerald-100 text-emerald-900 text-sm font-medium px-2 py-1 rounded">
                          ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    {product.category === 'clothing' && product.size && product.size !== 'N/A' && (
                      <p className="text-gray-600 mb-4">Size: {product.size}</p>
                    )}
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent modal from opening
                          handleAddToCart(product, product.size || 'N/A');
                        }}
                        className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600"
                      >
                        Add to Cart
                      </button>
                      {popupVisible === product.id && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '10px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            fontSize: '14px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          Added to Cart!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No shop items available.</p>
            )}
          </div>
        )}

        {isModalOpen && selectedProduct && (
          <ProductModal
              product={selectedProduct as Product}
              onClose={closeModal}
              onAddToCart={handleAddToCart}
            />
        )}
      </div>
    </div>
  );
};

export default ShopItems;
