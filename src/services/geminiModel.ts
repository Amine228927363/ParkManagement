import axios from 'axios';

const API_URL = 'http://localhost:3000';
// analyze car image function
export const analyzeCarImage = async (imageData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/api/analyze`, imageData);
        return response.data;
      } catch (error) {
        if (error.response) {
          // This will give you the response data from the server (if available)
          console.error('Response error:', error.response.data);
          console.error('Response status:', error.response.status);
        } else {
          console.error('Error analyzing car image:', error);
        }
        throw error;
      }
};