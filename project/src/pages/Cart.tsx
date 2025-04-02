import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used

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
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket)); // Load basket from localStorage on initial render
    } else {
      setBasket({ id: 1, lines: [], total_incl_tax: '0.00', num_items: 0 });
    }
    setLoading(false);
  }, []); // Only runs once on component mount

  useEffect(() => {
    if (basket) {
      localStorage.setItem('basket', JSON.stringify(basket)); // Save basket to localStorage whenever it changes
    }
  }, [basket]);

  const saveBasket = (updatedBasket: Basket) => {
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
  };

  const handleAddToCart = (newItem: LineItem) => {
    if (!basket) return;
    const existingItem = basket.lines.find(line => line.id === newItem.id);
    let updatedLines;

    if (existingItem) {
      updatedLines = basket.lines.map(line =>
        line.id === newItem.id
          ? { ...line, quantity: line.quantity + newItem.quantity }
          : line
      );
    } else {
      updatedLines = [...basket.lines, newItem];
    }

    const updatedBasket = {
      ...basket,
      lines: updatedLines,
      total_incl_tax: updatedLines.reduce((sum, line) => sum + parseFloat(line.line_price_incl_tax) * line.quantity, 0).toFixed(2),
      num_items: updatedLines.reduce((sum, line) => sum + line.quantity, 0),
    };

    saveBasket(updatedBasket);
  };

  const handleRemoveItem = (lineId: number) => {
    if (!basket) return;

    const updatedLines = basket.lines.filter(line => line.id !== lineId);
    const updatedBasket = {
      ...basket,
      lines: updatedLines,
      total_incl_tax: updatedLines.reduce((sum, line) => sum + parseFloat(line.line_price_incl_tax) * line.quantity, 0).toFixed(2),
      num_items: updatedLines.reduce((sum, line) => sum + line.quantity, 0),
    };

    saveBasket(updatedBasket); // Persist updated basket after removing an item
  };

  const handleUpdateQuantity = (lineId: number, newQuantity: number) => {
    if (!basket) return;

    const updatedLines = basket.lines.map(line =>
      line.id === lineId ? { ...line, quantity: newQuantity } : line
    ).filter(line => line.quantity > 0);

    const updatedBasket = {
      ...basket,
      lines: updatedLines,
      total_incl_tax: updatedLines.reduce((sum, line) => sum + parseFloat(line.line_price_incl_tax) * line.quantity, 0).toFixed(2),
      num_items: updatedLines.reduce((sum, line) => sum + line.quantity, 0),
    };

    saveBasket(updatedBasket);
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
        }}>
          {notification}
        </div>
      )}
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Shopping Cart</h1>
      {!basket || basket.lines.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {basket.lines.map(line => (
              <div key={line.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{line.product_title}</h3>
                  <p style={{ margin: '0', color: '#888' }}>Price: {line.line_price_incl_tax}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{line.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                </div>
                <button onClick={() => handleRemoveItem(line.id)} style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <h2 style={{ marginBottom: '10px' }}>Total: {basket.total_incl_tax} ({basket.num_items} items)</h2>
            <button 
              style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }} 
              onClick={() => navigate('/shopitems')}
            >
              Return to Shop
            </button>
            <button 
              style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }} 
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
