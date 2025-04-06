import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Views/FirstView.vue'
import Login from '../components/Views/Login.vue'
import Register from '../components/Views/Register.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
