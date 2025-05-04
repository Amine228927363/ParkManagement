
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend base URL
//function to create arrival
export const createSupplierArrival = async (arrivalData: {
    supplierId: number;
    arrivalTime: string;
    parkingSpaceId: number;
    notes: string;
    scheduledBy: number;
   
  }) => {
    return axios.post(`${API_URL}/api/supplierArrivals/createSupplierArrival`, arrivalData);
  };
  //function to get all arrivals
