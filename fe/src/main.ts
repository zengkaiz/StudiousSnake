import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/css/main.css'
import axios from 'axios'
import { useAuthStore } from './stores/auth'

axios.defaults.baseURL = 'http://localhost:3001' // Adjust based on backend port

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized, e.g., redirect to login
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
