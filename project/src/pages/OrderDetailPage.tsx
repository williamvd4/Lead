import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrder, Order, OrderItem as OrderItemType, ShopItem } from '../api/ecommerceService';
import { toast } from 'react-toastify';
import './OrderDetailPage.css';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) {
      toast.error('Order ID is missing.');
      navigate('/orders'); // Redirect if orderId is not present
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const numericOrderId = parseInt(orderId, 10);
        if (isNaN(numericOrderId)) {
          toast.error('Invalid Order ID format.');
          setLoading(false);
          navigate('/orders');
          return;
        }
        const orderDetails = await getOrder(numericOrderId);
        setOrder(orderDetails);
      } catch (err) {
        console.error(`Failed to fetch order ${orderId}:`, err);
        toast.error('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  if (loading) {
    return <div className="order-detail-loading">Loading order details...</div>;
  }

  if (!order && !loading) { // Ensure not to show "not found" during initial load if API is slow
    return (
        <div className="order-detail-not-found">
            <p>Order not found or could not be loaded.</p>
            <Link to="/orders" className="btn-back-to-orders">Back to Order History</Link>
        </div>
    );
  }

  if (!order) { // Should ideally be caught by the condition above, but as a fallback
    return null; // Or some other placeholder if !loading and still no order
  }

  // Helper to render product image, linking to product page if slug is available
  const renderProductImage = (item: OrderItemType) => {
    const product = item.product as ShopItem; // Assuming product is populated as ShopItem
    if (product && product.thumbnail) {
      if (product.slug) {
        return (
          <Link to={`/product/${product.slug}`}>
            <img src={product.thumbnail} alt={product.name} className="item-thumbnail" />
          </Link>
        );
      }
      return <img src={product.thumbnail} alt={product.name} className="item-thumbnail" />;
    }
    return <div className="item-no-image">No Image</div>;
  };

  return (
    <div className="order-detail-page">
      <div className="order-detail-header">
        <h2>Order Details</h2>
        <Link to="/orders" className="back-to-orders-link">Back to Order History</Link>
      </div>

      <div className="order-info-card">
        <div className="order-info-main">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date Placed:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Status:</strong> <span className={`order-status status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>{order.status}</span></p>
            <p><strong>Order Total:</strong> ${parseFloat(order.total_price).toFixed(2)}</p>
        </div>
        {/* Add shipping/billing address display here if available in Order model */}
        {/* e.g., <p><strong>Shipping Address:</strong> {order.shipping_address}</p> */}
      </div>

      <h3>Items in this Order</h3>
      <div className="order-items-list">
        {order.items.map(item => (
          <div key={item.id} className="order-item-card">
            <div className="item-image-container">
              {renderProductImage(item)}
            </div>
            <div className="item-details">
              <h4>{item.product.name}</h4>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price per item:</strong> ${parseFloat(item.price).toFixed(2)}</p>
              {item.size && <p><strong>Size:</strong> {item.size.name}</p>}
            </div>
            <div className="item-total">
              <p>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailPage;
