import axios from 'axios';

const API_URL = 'http://localhost:3000';
// create account request function 
export const createAccountRequest = async (requestData: { name: string; email: string; password: string; phone: string ;message:string}) => {
  return axios.post(`${API_URL}/api/accountRequests/createAccountRequest`, requestData);
};
// get all account requests
export const getAllAccountRequests = async () => {
  const response= axios.get(`${API_URL}/api/accountRequests/getAllAccountRequests`);
  return (await response).data
};
// update account request by id 
export const updateAccountRequest = async (id: number, updateData: { status: string; reviewedBy: number }) => {
    try {
        const response = await axios.put(`${API_URL}/api/accountRequests/updateAccountRequest/${id}`, updateData);
        return response.data;
        }
    catch (error) {
        console.error('Error updating account request:', error);
        throw error;
    }
};
