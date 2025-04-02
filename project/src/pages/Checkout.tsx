import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [cartSummary, setCartSummary] = useState<{ total: string; items: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart summary from localStorage or API
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      const basket = JSON.parse(storedBasket);
      setCartSummary({
        total: basket.total_incl_tax,
        items: basket.num_items,
      });
    } else {
      setCartSummary({ total: '0.00', items: 0 });
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name in shippingAddress) {
      setShippingAddress({ ...shippingAddress, [name]: value });
    } else if (name in paymentDetails) {
      setPaymentDetails({ ...paymentDetails, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setOrderPlaced(false);

    // Validate inputs
    if (!shippingAddress.name || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip || !shippingAddress.country) {
      setError('Please fill out all shipping address fields.');
      setSubmitting(false);
      return;
    }
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      setError('Please fill out all payment details.');
      setSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Replace with actual API call logic
      // On Success:
      setOrderPlaced(true);
      localStorage.removeItem('basket'); // Clear cart after successful order
      // On Failure:
      // setError('Checkout failed. Please try again.');
      setSubmitting(false);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase.</p>
        <button onClick={() => navigate('/shopitems')} style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Checkout</h1>
      {cartSummary && (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '10px' }}>Cart Summary</h2>
          <p>Total: <strong>{cartSummary.total}</strong></p>
          <p>Items: <strong>{cartSummary.items}</strong></p>
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '10px' }}>Shipping Address</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={shippingAddress.name}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingAddress.state}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={shippingAddress.zip}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '10px' }}>Payment Details</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>Error: {error}</div>}
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
