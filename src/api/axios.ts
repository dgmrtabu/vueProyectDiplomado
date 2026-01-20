import { ENV } from '@/config/env'
import axios from 'axios'

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: ENV.API_URL,
})

// Interceptors para agregar el token de autenticación en cada solicitud

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor de errores
//TODO agregar interceptor de respuesta para manejar al tener login
export default api
