import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend base URL
export const createUser = async (userData: { name: string; email: string; password: string;role:string }) => {
  return axios.post(`${API_URL}/api/auth/register`, userData);
};

export const getUserById = async (id: number) => {
  return axios.get(`${API_URL}/users/${id}`);
};
//get all users with role="SOS_User"
export const getSOSUsers = async () => {
  const response= axios.get(`${API_URL}/api/users/getSOSUsers`);
  return (await response).data


};
//get all users with role="SOS_User" and status="active"
export const getAllActiveUsers = async () => {
  return axios.get(`${API_URL}/users?role=SOS_User&status=active`);
};
//get all users with role="SOS_User" and status="inactive"
export const getAllInactiveUsers = async () => {
  return axios.get(`${API_URL}/users?role=SOS_User&status=inactive`);
};
//get all users with role="SOS_User" and status="pending"
export const getAllPendingUsers = async () => {
  return axios.get(`${API_URL}/users?role=SOS_User&status=pending`);
};
//delete user by id
export const deleteUserById = async (id: number) => {
  return axios.delete(`${API_URL}/api/users/deleteUser/${id}`);
};
//update user by id
export const updateUser = async (id: number, userData: { name: string; email: string; password: string;role:string }) => {
  return axios.put(`${API_URL}/api/users/updateUser/${id}`, userData);
};
