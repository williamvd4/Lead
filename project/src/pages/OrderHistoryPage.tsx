import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, Order } from '../api/ecommerceService';
import { toast } from 'react-toastify';
import './OrderHistoryPage.css';

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userOrders = await getOrders();
        setOrders(userOrders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        toast.error('Failed to load your order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="order-history-loading">Loading your order history...</div>;
  }

  if (orders.length === 0 && !loading) { // Ensure not to show "no orders" during initial load if API is slow
    return (
      <div className="order-history-empty">
        <p>You haven't placed any orders yet.</p>
        <Link to="/shop" className="btn-shop-now">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <h2>Your Orders</h2>
      <div className="orders-list-container">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <h3>Order ID: {order.id}</h3>
              <span className={`order-status status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {order.status}
              </span>
            </div>
            <div className="order-card-body">
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${parseFloat(order.total_price).toFixed(2)}</p>
              <p><strong>Items:</strong> {order.items.length}</p>
            </div>
            <div className="order-card-footer">
              <Link to={`/orders/${order.id}`} className="btn-view-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
