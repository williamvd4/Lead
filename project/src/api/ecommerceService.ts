import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; // Adjust as per your Django API URL

// Function to get the auth token (replace with your actual auth logic)
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Example: get token from local storage
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session-based authentication if your Django setup uses it
});

// --- TypeScript Interfaces ---

export interface Size {
  id: number;
  name: string;
  abbreviation?: string;
  stock: number; // Added stock property
}

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: string; // Assuming price is a string from backend, convert to number as needed
  category: string;
  image: string | null;
  thumbnail: string | null;
  in_stock: boolean;
  slug: string;
  sizes: Size[];
  // Add other fields from your ShopItems model as needed
  // e.g., strain_type, thc_content, cbd_content if they are part of ShopItem directly
}

export interface CartItem {
  id: number;
  product: ShopItem; // Or just product_id: number and fetch details separately
  quantity: number;
  item_total: string; // Assuming this is calculated by the backend serializer
  size?: Size; // Optional: if cart items can have specific sizes
}

export interface Cart {
  id: number;
  user: number; // Assuming user ID
  items: CartItem[];
  total_price: string; // Assuming this is calculated by the backend serializer
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product: ShopItem; // Or just product_id and denormalized product details
  quantity: number;
  price: string; // Price at the time of order
  size?: Size; // Optional: if ordered items had a specific size
}

export interface Order {
  id: number;
  user: number; // Assuming user ID
  items: OrderItem[];
  created_at: string;
  updated_at: string;
  status: string;
  total_price: string;
}

// --- API Service Functions ---

// Shop Items
export const getShopItems = async (): Promise<ShopItem[]> => {
  try {
    const response = await apiClient.get<ShopItem[]>('/shopitems/');
    return response.data;
  } catch (error) {
    console.error('Error fetching shop items:', error);
    throw error;
  }
};

export const getShopItem = async (idOrSlug: string | number): Promise<ShopItem> => {
  try {
    const response = await apiClient.get<ShopItem>(`/shopitems/${idOrSlug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching shop item ${idOrSlug}:`, error);
    throw error;
  }
};

export const getSizes = async (): Promise<Size[]> => {
  try {
    const response = await apiClient.get<Size[]>('/sizes/');
    return response.data;
  } catch (error) {
    console.error('Error fetching sizes:', error);
    throw error;
  }
};

// Cart
// Note: Ensure your CartViewSet in Django is set up to handle these actions
// and that the URLs match. For example, a single '/cart/' endpoint might handle
// GET (retrieve), POST (add item or clear), DELETE (clear).
// Item-specific actions might be '/cart/items/<item_id>/' (PATCH for update, DELETE for remove).
// The current functions assume specific action routes as defined in previous backend discussions.

export const getCart = async (): Promise<Cart> => {
  try {
    const response = await apiClient.get<Cart>('/cart/');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export interface AddToCartPayload {
  product_id: number;
  quantity: number;
  size_id?: number; // If applicable and your backend supports it
}

export const addToCart = async (payload: AddToCartPayload): Promise<Cart> => { // Updated to return the whole cart
  try {
    const response = await apiClient.post<Cart>('/cart/add_item/', payload);
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export interface UpdateCartItemPayload {
  quantity: number;
}

export const updateCartItem = async (itemId: number, payload: UpdateCartItemPayload): Promise<Cart> => { // Updated to return the whole cart
  try {
    const response = await apiClient.patch<Cart>(`/cart/update_item/${itemId}/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId: number): Promise<Cart> => { // Updated to return the whole cart
  try {
    const response = await apiClient.delete<Cart>(`/cart/remove_item/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<Cart> => { // Updated to return the whole cart
  try {
    const response = await apiClient.post<Cart>('/cart/clear/');
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Orders

// Add this interface for the payload when creating an order
export interface OrderPayload {
  shipping_address: string;
  billing_address?: string; // Optional
  payment_method?: string; // Optional, or could be more complex
  // Add any other fields your backend expects for order creation
  // Note: Cart details are usually handled server-side based on the user's session/active cart.
  // If your API requires cart_id or explicit item details, add them here.
}

// Renamed createOrderFromCart to createOrder and accept a payload
export const createOrder = async (payload: OrderPayload): Promise<Order> => {
  try {
    // The endpoint might be just '/orders/' for a POST request
    // or a specific one like '/orders/create/' or '/orders/checkout/'
    // This assumes your OrderViewSet handles creation on POST to '/orders/'
    // and uses the authenticated user's current cart.
    const response = await apiClient.post<Order>('/orders/', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await apiClient.get<Order[]>('/orders/');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId: number): Promise<Order> => {
  try {
    const response = await apiClient.get<Order>(`/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

// You might need to intercept responses for errors or to handle token refresh for authentication
apiClient.interceptors.request.use(config => {
  // If you use token-based authentication (e.g., JWT), retrieve and add the token here
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally if needed
    // Example: if (error.response && error.response.status === 401) { // Unauthorized, redirect to login }
    console.error('API call error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;

