import React, { useState } from 'react';

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

    // TODO: Submit checkout data to your Django Oscar API endpoint
    // This requires a dedicated API endpoint (e.g., POST /api/checkout/)
    // that handles order placement logic in the backend.
    console.log("Submitting checkout...", { shippingAddress, paymentDetails });

    // Simulate API call
    setTimeout(() => {
        // Replace with actual API call logic
        // On Success:
        // setOrderPlaced(true);
        // On Failure:
        // setError('Checkout failed. Please try again.');
        setError('Checkout API endpoint not implemented.'); // Placeholder error
        setSubmitting(false);
    }, 1500);
  };

  if (orderPlaced) {
      return (
          <div>
              <h1>Order Confirmed!</h1>
              <p>Thank you for your purchase.</p>
              {/* TODO: Show order summary or link to order history */}
          </div>
      );
  }

  return (
    <div>
      <h1>Checkout</h1>
      {/* TODO: Fetch cart summary to display here */}
      <form onSubmit={handleSubmit}>
        <h2>Shipping Address</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={shippingAddress.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingAddress.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingAddress.state}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={shippingAddress.zip}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={handleInputChange}
          required
        />

        <h2>Payment Details</h2>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={paymentDetails.expiryDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChange={handleInputChange}
          required
        />

        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
