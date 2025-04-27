
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
  