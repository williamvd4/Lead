// src/api/index.ts

import axiosInstance from './axios';
import { Effect, Terpene, LabResult, Product, Retailer, CoreValue, HomeCarouselItem, HomeFeature } from '../types';

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