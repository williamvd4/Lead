// src/api/api.ts

import axios from 'axios';
import {
    Effect,
    Terpene,
    Product,
    LabResult,
    Retailer,
    CoreValue,
    HomeFeature,
    CarouselItem
} from './types';

// API configuration
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// API functions
export const getCarouselItems = () => api.get<{carouselItems: CarouselItem[]}>('/carousel/');
export const getProducts = () => api.get<Product[]>('/products/');
export const getRetailers = () => api.get<Retailer[]>('/retailers/');
export const getEffects = () => api.get<Effect[]>('/effects/');
export const getTerpenes = () => api.get<Terpene[]>('/terpenes/');
export const getLabResults = () => api.get<LabResult[]>('/lab-results/');
export const getCoreValues = () => api.get<CoreValue[]>('/core-values/');
export const getHomeFeatures = () => api.get<HomeFeature[]>('/home-features/');

// Export types (optional, since types are now in types.ts)
export type {
    Effect,
    Terpene,
    Product,
    LabResult,
    Retailer,
    CoreValue,
    HomeFeature,
    CarouselItem
};

export default api;