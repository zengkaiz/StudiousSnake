import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null, user: null }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/auth/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        return response.data
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    }
    // ... other actions ...
  }
})
