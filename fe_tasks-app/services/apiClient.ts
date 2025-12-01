import axios from 'axios'

const API_GATEWAY_URL = 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
