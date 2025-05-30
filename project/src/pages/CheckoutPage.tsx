import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../api/CartContext';
import { createOrder, OrderPayload } from '../api/ecommerceService';
import { toast } from 'react-toastify'; // Import toast
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  const { cart, clearUserCart, fetchCart, itemCount, loading: cartLoading, error: cartError } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    // Redirect to shop if cart is empty and not loading
    if (!cartLoading && (!cart || itemCount === 0)) {
      toast.info('Your cart is empty. Redirecting to shop...'); // Optional: inform user
      navigate('/shop');
    }
  }, [cart, itemCount, cartLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) {
      toast.error('Your cart is empty.'); // Use toast
      return;
    }

    setIsPlacingOrder(true);

    const orderPayload: OrderPayload = {
      shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
      // email: formData.email, // Consider if backend needs/uses this for the order itself
      // customer_name: formData.fullName, // Consider if backend needs/uses this
    };

    try {
      const newOrder = await createOrder(orderPayload);
      toast.success('Order placed successfully!'); // Use toast
      await clearUserCart(); 
      await fetchCart(); 
      navigate(`/order-confirmation/${newOrder.id}`);
    } catch (err) {
      console.error('Failed to place order:', err);
      const errorMessage = (err as Error)?.message || 'Failed to place your order. Please try again.';
      toast.error(errorMessage); // Use toast
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cartLoading) {
    return <div className="checkout-loading">Loading cart details...</div>;
  }

  if (cartError) {
    // Toast for cart error might be better handled in CartContext or where fetchCart is called
    // For now, keeping this direct feedback, but a toast could also be shown here.
    return <div className="checkout-error">Error loading cart: {cartError}. <a href="/cart">Go back to cart</a></div>;
  }

  if (!cart || cart.items.length === 0) {
    // This case should be handled by the useEffect redirect, but as a fallback:
    return <div className="checkout-empty">Your cart is empty. <a href="/shop">Continue shopping</a>.</div>;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-container">
        <div className="order-summary-section">
          <h3>Order Summary</h3>
          {cart.items.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.product.name} {item.size ? `(${item.size.name})` : ''} x {item.quantity}</span>
              <span>${parseFloat(item.item_total).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total: ${parseFloat(cart.total_price).toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="shipping-form-section">
          <h3>Shipping Information</h3>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
          </div>

          <button type="submit" className="place-order-btn" disabled={isPlacingOrder || cartLoading || !cart || cart.items.length === 0}>
            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
