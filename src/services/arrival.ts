
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend base URL
//function to create arrival 
export const createArrival = async (arrivalData: {
    sosUserId: number;
    supplierName: string;
    companyName: string;
    vehiclePlate: string;
    vehicleType: string;
    vehicleColor: string;
    requestedTime: string;
    parkingSpace: string;
  }) => {
    return axios.post(`${API_URL}/api/arrival/createArrival`, arrivalData);
  };
  //function to get all arrivals
export const getAllArrivals = async () => {
    const response= axios.get(`${API_URL}/api/arrival/getAllArrival`);
    return (await response).data;
  };
  // delete arrival by id
export const deleteArrivalById = async (id: number) => {
    return axios.delete(`${API_URL}/api/arrival/deleteArrival/${id}`);
  };
  export const deleteArrivalByVehiclePlate = async (vehiclePlate: string) => {
    return axios.delete(`${API_URL}/api/arrival/deleteArrivalByVehiclePlate/${vehiclePlate}`);
  }