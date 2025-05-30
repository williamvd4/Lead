import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../api/CartContext';
import { CartItem as CartItemType } from '../api/ecommerceService'; // Renaming to avoid conflict
import './CartPage.css';

const API_BASE_URL_MEDIA = process.env.REACT_APP_API_BASE_URL_MEDIA || 'http://localhost:8000';

const CartPage: React.FC = () => {
  const {
    cart,
    loading,
    error,
    updateItemInCart,
    removeItemFromCart,
    clearUserCart,
    itemCount,
  } = useCart();

  const handleQuantityChange = (item: CartItemType, quantity: number) => {
    if (quantity < 1) {
      // Or offer to remove the item
      removeItemFromCart(item.id);
      return;
    }
    updateItemInCart(item.id, { quantity });
  };

  if (loading && !cart) return <div className="cart-page-loading">Loading cart...</div>;
  if (error) return <div className="cart-page-error">Error: {error}</div>;
  if (!cart || itemCount === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="button-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-summary">
        <p>Total Items: {itemCount}</p>
        <p>Subtotal: <strong>${parseFloat(cart.total_price).toFixed(2)}</strong></p>
        <div className="cart-actions-top">
          <button 
            onClick={clearUserCart} 
            className="button-danger clear-cart-button" 
            disabled={loading}
          >
            Clear Cart
          </button>
          <Link to="/checkout" className="button-primary proceed-checkout-button">
            Proceed to Checkout
          </Link>
        </div>
      </div>

      <div className="cart-items-list">
        {cart.items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              {item.product.thumbnail && (
                <img 
                  src={item.product.thumbnail.startsWith('http') ? item.product.thumbnail : `${API_BASE_URL_MEDIA}${item.product.thumbnail}`}
                  alt={item.product.name} 
                />
              )}
            </div>
            <div className="cart-item-details">
              <h2>{item.product.name}</h2>
              {item.size && <p className="item-size">Size: {item.size.name}</p>}
              <p className="item-price">Price: ${parseFloat(item.product.price).toFixed(2)}</p>
              <div className="item-quantity">
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <input 
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  min="1"
                  disabled={loading}
                />
              </div>
              <p className="item-total">Total: <strong>${parseFloat(item.item_total).toFixed(2)}</strong></p>
            </div>
            <div className="cart-item-actions">
              <button 
                onClick={() => removeItemFromCart(item.id)} 
                className="button-outline-danger remove-item-button" 
                disabled={loading}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom actions could be redundant if summary is at top, but can be useful for long carts */}
      {/* <div className="cart-actions-bottom">
        <button onClick={clearUserCart} className="button-danger clear-cart-button" disabled={loading}>Clear Cart</button>
        <Link to="/checkout" className="button-primary proceed-checkout-button">Proceed to Checkout</Link>
      </div> */}
    </div>
  );
};

export default CartPage;
