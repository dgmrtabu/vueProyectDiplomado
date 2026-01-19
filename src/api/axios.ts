import { ENV } from '@/config/env'
import axios from 'axios'

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: ENV.API_URL,
})
