

import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend base URL
//function to get all suppliers
export const getAllSuppliers = async () => {
    const response= axios.get(`${API_URL}/api/suppliers/getAllSuppliers`);
    return (await response).data;
  };
//function to create supplier
export const createSupplier = async (supplierData: {
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    company: string;
    vehiclePlate: string;
    status?: 'ACTIVE' | 'INACTIVE'; // Optional if you rely on default
  }) => {
    return axios.post(`${API_URL}/api/suppliers/createSupplier`, supplierData);
  };
//function to update supplier
export const updateSupplier = async (id:any,supplierData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    return axios.put(`${API_URL}/api/suppliers/updateSupplier/${id}`, supplierData);
  };
//function to delete supplier by id
export const deleteSupplierById = async (id: number) => {
    return axios.delete(`${API_URL}/api/suppliers/deleteSupplier/${id}`);
  };
//function to get supplier by id
export const getSupplierById = async (id: number) => {
    const response= axios.get(`${API_URL}/api/suppliers/getSupplier/${id}`);
    return (await response).data;
  };
