import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
  Cart,
  AddToCartPayload,
  UpdateCartItemPayload,
  // ShopItem, // No longer directly used here, but kept for context if needed in future
  // Size // No longer directly used here
} from './ecommerceService'; 
import { toast } from 'react-toastify';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  fetchCart: () => Promise<void>;
  addItemToCart: (payload: AddToCartPayload) => Promise<void>;
  updateItemInCart: (itemId: number, payload: UpdateCartItemPayload) => Promise<void>;
  removeItemFromCart: (itemId: number) => Promise<void>;
  clearUserCart: () => Promise<void>;
  isItemInCart: (productId: number, sizeId?: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const cartData = await apiGetCart();
      setCart(cartData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      const errorMessage = (err as Error)?.message || 'Failed to load cart. Please try again.';
      setError(errorMessage); // Set error state for components that might need it
      toast.error(errorMessage); // Display toast notification
      // Consider if cart should be set to null or an empty state on fetch failure
      // setCart(null); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItemToCart = async (payload: AddToCartPayload) => {
    // setLoading(true); // Loading state is managed by the calling component for better UX
    try {
      const updatedCart = await apiAddToCart(payload);
      setCart(updatedCart);
      setError(null);
      // Success toast is typically handled by the component initiating the add (e.g., ShopPage, ProductDetailPage)
      // toast.success('Item added to cart!'); // Avoid double toast if calling component also shows one
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      const errorMessage = (err as Error)?.message || 'Could not add item to cart. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage); // Show toast for error
      throw err; // Re-throw to allow calling component to handle if needed
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const updateItemInCart = async (itemId: number, payload: UpdateCartItemPayload) => {
    // setLoading(true); // Let calling component (e.g., CartPage) handle its loading state
    try {
      const updatedCart = await apiUpdateCartItem(itemId, payload);
      setCart(updatedCart);
      setError(null);
      toast.success('Cart updated successfully.'); // General success message
    } catch (err) {
      console.error('Failed to update cart item:', err);
      const errorMessage = (err as Error)?.message || 'Could not update cart item. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err; // Re-throw
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const removeItemFromCart = async (itemId: number) => {
    // setLoading(true); // Let calling component handle its loading state
    try {
      const updatedCart = await apiRemoveFromCart(itemId);
      setCart(updatedCart);
      setError(null);
      toast.success('Item removed from cart.');
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
      const errorMessage = (err as Error)?.message || 'Could not remove item from cart. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err; // Re-throw
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const clearUserCart = async () => {
    // setLoading(true); // Let calling component handle its loading state (e.g. CheckoutPage)
    try {
      const updatedCart = await apiClearCart(); 
      setCart(updatedCart); // Should be an empty cart or null
      setError(null);
      toast.success('Cart has been cleared.');
    } catch (err) {
      console.error('Failed to clear cart:', err);
      const errorMessage = (err as Error)?.message || 'Could not clear cart. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err; // Re-throw
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const itemCount = cart && cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const isItemInCart = (productId: number, sizeId?: number) => {
    if (!cart) return false;
    return cart.items.some(item => 
      item.product.id === productId && 
      (sizeId === undefined || (item.size && item.size.id === sizeId))
    );
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      error, 
      itemCount,
      fetchCart, 
      addItemToCart, 
      updateItemInCart, 
      removeItemFromCart, 
      clearUserCart,
      isItemInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
