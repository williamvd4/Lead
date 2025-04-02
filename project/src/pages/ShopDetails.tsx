import React, { useState, useEffect } from 'react';

interface ShopDetail {
  id: number;
  shop: number;
  detail: string;
}

const ShopDetails: React.FC = () => {
  const shopId = '1'; // Placeholder ID - replace with dynamic ID
  const [details, setDetails] = useState<ShopDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shopId) return;

    setLoading(true);
    fetch(`/api/shopdetails/${shopId}/`) // Updated API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDetails(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setError('Failed to load shop details.');
        setLoading(false);
      });
  }, [shopId]);

  if (loading) return <div>Loading shop details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!details) return <div>Shop details not found.</div>;

  return (
    <div>
      <h1>Shop Details</h1>
      <p>{details.detail}</p>
    </div>
  );
};

export default ShopDetails;
