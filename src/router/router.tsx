import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Views/FirstView.vue'
import Login from '../components/Views/Login.vue'
import Register from '../components/Views/Register.vue'
import Dashboard from '../components/Views/Dashboard.vue'
import UserView from '../components/Views/UserView.vue'
import sosView from '../components/Views/sosUser/sosView.vue'
import accountRequest from '../components/Views/sosUser/accountRequest.vue'
import accountRequestView from '../components/Views/DashboardComponents/accountRequestView.vue'
import Arrivals from '../components/Views/DashboardComponents/Arrivals.vue'
import Suppliers from '../components/Views/Suppliers.vue'
import VehicleExit from '../components/Views/sosUser/vehicleExit.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard ,meta: { requiresAuth: true, requiresRole: 'ADMIN' }},
  { path: '/sos-users', name: 'user', component: UserView,meta: { requiresAuth: true, requiresRole: 'ADMIN' }},
  { path: '/sosView', name: 'sos', component: sosView,meta: { requiresAuth: true, requiresRole: 'SOS_USER' }},
  { path: '/accountRequest', name: 'accountRequest', component : accountRequest},
  { path: '/manageAccountRequests', name: 'request', component: accountRequestView,meta: { requiresAuth: true, requiresRole: 'ADMIN' }},
  { path: '/arrivals', name: 'arrivals', component: Arrivals,meta: { requiresAuth: false}},
  { path: '/suppliers', name: 'suppliers', component: Suppliers,meta: { requiresAuth: true, requiresRole: 'ADMIN' }},
  { path: '/vehicleExit', name: 'exit', component: VehicleExit,meta: { requiresAuth: true, requiresRole: 'SOS_USER' }},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})




router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')?.toUpperCase();
  const id = localStorage.getItem('id');
  // Debugging
  console.log('Navigation - Route:', to.path);
  console.log('Auth state:', { token: !!token, role ,id});
  // Check if route requires authentication
  if (to.meta.requiresAuth && !token) {
    console.log('Redirecting to login - authentication required');
    next('/login');
    return;
  }
  
  if (to.meta.requiresRole && role !== to.meta.requiresRole) {
    console.log('Unauthorized - role mismatch');
    next('/'); 
    return;
  }
  next();
});
export default router
