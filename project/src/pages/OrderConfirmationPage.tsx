import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../api/CartContext'; // Assuming fetchCart might be useful
import './OrderConfirmationPage.css';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { fetchCart } = useCart(); // To ensure cart is updated post-order
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the latest cart state, which should be empty or updated
    fetchCart();
  }, [fetchCart]);

  // Optional: Fetch order details here if needed to display more info
  // For now, just a simple confirmation message.

  if (!orderId) {
    // Should not happen if routed correctly, but good for robustness
    navigate('/shop');
    return null;
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <svg className="confirmation-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12s4.48,10 10,10 10,-4.48 10,-10S17.52,2 12,2zm-2,15l-5,-5 1.41,-1.41L10,16.17l7.59,-7.59L19,10l-9,9z" />
        </svg>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase.</p>
        <p>Your Order ID is: <strong>{orderId}</strong></p>
        <p>We have sent an email confirmation with your order details.</p>
        <div className="confirmation-actions">
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          {/* Optional: Link to an order history page */}
          {/* <Link to="/orders" className="btn btn-secondary">View Orders</Link> */}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
