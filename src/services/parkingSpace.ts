
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend base URL
//function to get all spaces
export const getAllSpaces = async () => {
    const response= axios.get(`${API_URL}/api/parkingSpaces/getAllParkingSpaces`);
    return (await response).data;
  };
//function to create space
export const createSpace = async (spaceData: {
    spaceNumber: number;
    floor: number;
    section: string;
    status: string;
    arrivalId: number | null;
  }) => {
    return axios.post(`${API_URL}/api/parkingSpaces/createParkingSpace`, spaceData);
  };
//function to update space
export const updateSpace = async (id: number, status: string) => {
    return axios.put(`${API_URL}/api/parkingSpaces/updateParkingSpace/${id}`, { status });
  };
//function to delete space by id
export const deleteSpaceById = async (id: number) => {
    return axios.delete(`${API_URL}/api/parkingSpaces/deleteParkingSpace/${id}`);
  };
//function to update space by id
export const updateSpaceInfo = async (id: number, spaceData: {
    spaceNumber: number;
    floor: number;
    section: string;
    status: string;
    arrivalId: number | null;
    }) => {
    return axios.put(`${API_URL}/api/parkingSpaces/updateParkingSpace/${id}`, spaceData);
    }
//function to update space status by space number 
export const updateSpaceStatusByNumber = async (spaceNumber: number, status: string) => {
    return axios.put(`${API_URL}/api/parkingSpaces/updateParkingSpaceBySpaceNumber/${spaceNumber}`, { status });
  };