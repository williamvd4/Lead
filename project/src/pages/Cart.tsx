import React, { useState, useEffect } from 'react';

interface LineItem {
    id: number;
    product: number;
    product_title: string;
    quantity: number;
    line_price_incl_tax: string; // Or number depending on serializer
}

interface Basket {
    id: number;
    lines: LineItem[];
    total_incl_tax: string; // Or number
    num_items: number;
}

const Cart: React.FC = () => {
  const [basket, setBasket] = useState<Basket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // NOTE: Fetching the basket usually requires authentication
    fetch('/api/basket/') // Adjust URL as needed
      .then(response => {
        if (!response.ok) {
            // Handle cases like 404 Not Found if basket doesn't exist yet
            if (response.status === 404) return null;
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setBasket(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        // Don't show error if it's just no basket found yet (e.g., 404 handled above)
        if (err.message.includes('404')) {
             setBasket(null); // Ensure basket state is null for "empty" display
        } else {
            setError('Failed to load cart. Ensure you are logged in or session is active.');
        }
        setLoading(false);
      });
  }, []);

  const handleUpdateQuantity = (lineId: number, newQuantity: number) => {
    // TODO: Implement API call to update quantity
    console.log(`Updating line ${lineId} to quantity ${newQuantity}`);
  };

  const handleRemoveItem = (lineId: number) => {
    // TODO: Implement API call to remove item
    console.log(`Removing line ${lineId}`);
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Shopping Cart</h1>
      {!basket || basket.lines.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {basket.lines.map(line => (
              <li key={line.id}>
                {line.product_title} - Qty: {line.quantity} - Price: {line.line_price_incl_tax}
                <button onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}>+</button>
                <button onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}>-</button>
                <button onClick={() => handleRemoveItem(line.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h2>Total: {basket.total_incl_tax} ({basket.num_items} items)</h2>
          <button>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
