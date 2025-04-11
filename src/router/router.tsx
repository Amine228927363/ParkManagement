import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Views/FirstView.vue'
import Login from '../components/Views/Login.vue'
import Register from '../components/Views/Register.vue'
import Dashboard from '../components/Views/Dashboard.vue'
import UserView from '../components/Views/UserView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/userView', name: 'user', component: UserView},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
