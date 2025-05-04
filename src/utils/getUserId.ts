import { jwtDecode } from 'jwt-decode';
const getSosUserId = () => {
  const token = localStorage.getItem('token')  // or sessionStorage
if (token) {
  const decoded = jwtDecode(token)
  const adminId = decoded?.id // depends on your token structure*
  return adminId
}
 
  return null // or handle the case when token is not present

};
export default getSosUserId;
