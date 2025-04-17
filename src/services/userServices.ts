import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend base URL
export const createUser = async (userData: { name: string; email: string; password: string }) => {
  return axios.post(`${API_URL}/createUser`, userData);
};

export const getUserById = async (id: number) => {
  return axios.get(`${API_URL}/users/${id}`);
};
