import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Review {
  id: number;
  product: number;
  user: string;
  rating: number;
  comment: string;
  created_at: string;
}

const ProductReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/reviews/')
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setError('Failed to load reviews.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Product Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h2>Product ID: {review.product}</h2>
              <p>User: {review.user}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              <p>Created At: {new Date(review.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductReviews;
