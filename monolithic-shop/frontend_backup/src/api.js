import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const fetchOrders = async () => {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(`${API_BASE_URL}/users/register`, user);
    return response.data;
};

export const addProduct = async (product) => {
    const response = await axios.post(`${API_BASE_URL}/products/add`, product);
    return response.data;
};

export const addOrder = async (order) => {
    const response = await axios.post(`${API_BASE_URL}/orders/create`, order);
    return response.data;
};
