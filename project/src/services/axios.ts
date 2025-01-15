import axios from 'axios';

const API_URL = 'https://api-2f70.onrender.com';  // Ensure this is correct

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}products/`);
    return response.data;
};

export const getRetailers = async () => {
    const response = await axios.get(`${API_URL}retailers/`);
    return response.data;
};

export const getLabResults = async () => {
    const response = await axios.get(`${API_URL}lab-results/`);
    return response.data;
};

export const getTerpenes = async () => {
    const response = await axios.get(`${API_URL}terpenes/`);
    return response.data;
};

export const getEffects = async () => {
    const response = await axios.get(`${API_URL}effects/`);
    return response.data;
};