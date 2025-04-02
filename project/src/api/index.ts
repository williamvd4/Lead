import axiosInstance from './axios';
import { Effect, Terpene, LabResult, Product, Retailer, CoreValue, HomeCarouselItem, HomeFeature, Order, OrderItem, Cart, CartItem, Review } from '../types';

// Example TypeScript interfaces
export interface Effect {
    id: number;
    name: string;
}

export interface Terpene {
    id: number;
    name: string;
    percentage: number;
}

export interface LabResult {
    id: number;
    batch_number: string;
    product: number;
    thc: number;
    cbd: number;
    date: string;
    lab: string;
    pdf: string;
}

export interface Product {
    id: number;
    name: string;
    category: string;
    type: string;
    thc: number;
    cbd: number;
    image: string;
    description: string;
    effects: Effect[];
    terpenes: Terpene[];
    lab_results: LabResult[];
}

export interface Retailer {
    id: number;
    name: string;
    logo: string;
    address: string;
    url: string;
    products: Product[];
}

export interface CoreValue {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface HomeCarouselItem {
    id: number;
    image: string;
    title: string;
    description: string;
    order: number;
}

export interface HomeFeature {
    id: number;
    icon: string;
    title: string;
    description: string;
    order: number;
}

export interface Order {
    id: number;
    user: string;
    created_at: string;
    updated_at: string;
    status: string;
    total_price: number;
}

export interface OrderItem {
    id: number;
    order: number;
    product: number;
    quantity: number;
    price: number;
}

export interface Cart {
    id: number;
    user: string;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: number;
    cart: number;
    product: number;
    quantity: number;
}

export interface Review {
    id: number;
    product: number;
    user: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

// API Calls

// Effects
export const fetchEffects = async (): Promise<Effect[]> => {
    const response = await axiosInstance.get<Effect[]>('/effects/');
    return response.data;
};

// Terpenes
export const fetchTerpenes = async (): Promise<Terpene[]> => {
    const response = await axiosInstance.get<Terpene[]>('/terpenes/');
    return response.data;
};

// Lab Results
export const fetchLabResults = async (): Promise<LabResult[]> => {
    const response = await axiosInstance.get<LabResult[]>('/lab-results/');
    return response.data;
};

// Products
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/products/');
    return response.data;
};

// Retailers
export const fetchRetailers = async (): Promise<Retailer[]> => {
    const response = await axiosInstance.get<Retailer[]>('/retailers/');
    return response.data;
};

// Core Values
export const fetchCoreValues = async (): Promise<CoreValue[]> => {
    const response = await axiosInstance.get<CoreValue[]>('/core-values/');
    return response.data;
};

// Home Carousel Items
export const fetchHomeCarouselItems = async (): Promise<HomeCarouselItem[]> => {
    const response = await axiosInstance.get<HomeCarouselItem[]>('/home-carousel/');
    return response.data;
};

// Home Features
export const fetchHomeFeatures = async (): Promise<HomeFeature[]> => {
    const response = await axiosInstance.get<HomeFeature[]>('/home-features/');
    return response.data;
};

// Orders
export const fetchOrders = async (): Promise<Order[]> => {
    const response = await axiosInstance.get<Order[]>('/orders/');
    return response.data;
};

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const response = await axiosInstance.post<Order>('/orders/', orderData);
    return response.data;
};

// Order Items
export const fetchOrderItems = async (): Promise<OrderItem[]> => {
    const response = await axiosInstance.get<OrderItem[]>('/order-items/');
    return response.data;
};

export const createOrderItem = async (orderItemData: Partial<OrderItem>): Promise<OrderItem> => {
    const response = await axiosInstance.post<OrderItem>('/order-items/', orderItemData);
    return response.data;
};

// Cart
export const fetchCart = async (): Promise<Cart> => {
    const response = await axiosInstance.get<Cart>('/carts/');
    return response.data;
};

export const createCart = async (cartData: Partial<Cart>): Promise<Cart> => {
    const response = await axiosInstance.post<Cart>('/carts/', cartData);
    return response.data;
};

// Cart Items
export const fetchCartItems = async (): Promise<CartItem[]> => {
    const response = await axiosInstance.get<CartItem[]>('/cart-items/');
    return response.data;
};

export const createCartItem = async (cartItemData: Partial<CartItem>): Promise<CartItem> => {
    const response = await axiosInstance.post<CartItem>('/cart-items/', cartItemData);
    return response.data;
};

// Reviews
export const fetchReviews = async (): Promise<Review[]> => {
    const response = await axiosInstance.get<Review[]>('/reviews/');
    return response.data;
};

export const createReview = async (reviewData: Partial<Review>): Promise<Review> => {
    const response = await axiosInstance.post<Review>('/reviews/', reviewData);
    return response.data;
};
