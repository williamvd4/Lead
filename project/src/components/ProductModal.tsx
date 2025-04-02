import React, { useState } from 'react';
import './ProductModal.css';

// Update the structure of a product to include category and size information
interface Product {
  id: number;
  name: string;
  price?: number;
  image?: string;
  description: string;
  category?: string;
  size?: string;
  available_sizes?: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSize: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product?.size || 'N/A');
  
  if (!product) {
    return null;
  }

  // Parse available sizes string to array
  const sizeOptions = product.available_sizes ? 
    product.available_sizes.split(',').map(size => size.trim()) : 
    [product.size || 'N/A'];

  const isClothing = product.category === 'clothing';

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2>{product.name}</h2>
        {product.image && (
          <img src={product.image} alt={product.name} className="modal-image" />
        )}
        <p>{product.description}</p>
        {product.price !== undefined && (
          <p className="product-price">Price: ${product.price.toFixed(2)}</p>
        )}
        
        {isClothing && sizeOptions.length > 0 && sizeOptions[0] !== 'N/A' && (
          <div className="size-selector">
            <label htmlFor="size-select">Size:</label>
            <select 
              id="size-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="size-dropdown"
            >
              {sizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
        
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-modal-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
