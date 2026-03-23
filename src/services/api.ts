import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error.response?.status)
    return Promise.reject(error)
  }
)

export default api