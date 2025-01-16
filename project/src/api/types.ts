// src/api/types.ts

// Effect Interface
export interface Effect {
    id: number;
    name: string;
}

// Terpene Interface
export interface Terpene {
    id: number;
    name: string;
    percentage: number;
}

// Product Interface
export interface Product {
    id: number;
    name: string;
    category: 'flower' | 'concentrates' | 'edibles';
    type: 'Sativa' | 'Indica' | 'Hybrid';
    thc: number;
    cbd: number;
    image: string;
    description: string;
    effects: Effect[];
    terpenes: Terpene[];
}

// LabResult Interface
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

// Retailer Interface
export interface Retailer {
    id: number;
    name: string;
    logo: string;
    address: string;
    url: string;
    products: Product[];
}

// CoreValue Interface
export interface CoreValue {
    id: number;
    icon: string;
    title: string;
    description: string;
}

// HomeFeature Interface
export interface HomeFeature {
    id: number;
    icon: string;
    title: string;
    description: string;
    order: number;
}

// CarouselItem Interface
export interface CarouselItem {
    id: number;
    image: string;
    title: string;
    description: string;
    order: number;
}