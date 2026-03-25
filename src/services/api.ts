import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

type QueuedRequest = {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

let isRefreshing = false
let failedQueue: QueuedRequest[] = []

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token!)
    }
  })
  failedQueue = []
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const raw = localStorage.getItem('auth')

  if (raw) {
    const auth = JSON.parse(raw)
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`
    }
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (!error.response) {
      return Promise.reject(error)
    }

    if (error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          },
          reject,
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const raw = localStorage.getItem('auth')
      if (!raw) throw new Error('Sem sessão')

      const auth = JSON.parse(raw)
      if (!auth?.refreshToken) throw new Error('Sem refresh token')

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        { refreshToken: auth.refreshToken }
      )

      auth.accessToken = data.accessToken
      auth.refreshToken = data.refreshToken
      localStorage.setItem('auth', JSON.stringify(auth))

      try {
        const { useAuthStore } = await import('../stores/auth.store')
        const store = useAuthStore()
        store.updateTokens(data)
      } catch { }

      processQueue(null, data.accessToken)

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
      return api(originalRequest)

    } catch (refreshError) {
      processQueue(refreshError, null)

      localStorage.removeItem('auth')

      try {
        const { useAuthStore } = await import('../stores/auth.store')
        const store = useAuthStore()
        store.logout()
      } catch { }

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api