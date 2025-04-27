import { jwtDecode } from 'jwt-decode';
const getSosUserId = () => {
  const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
  if (!token) {
    throw new Error('No token found');
  }

  const decoded: any = jwtDecode(token);

  if (!decoded.userId) {
    throw new Error('sosUserId not found in token');
  }

  return decoded.userId;
};
export default getSosUserId;
