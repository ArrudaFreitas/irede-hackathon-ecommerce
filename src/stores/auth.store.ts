import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginService } from '../services/auth.service'
import type { LoginCredentials, AuthResponse } from '../models/user.model'
import { useCartStore } from './cart.store'
import { useFavoritesStore } from './favorites.store'

const STORAGE_KEY = 'auth'

interface AuthState {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
  refreshToken: string
}

function loadFromStorage(): AuthState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {

  const user = ref<AuthState | null>(loadFromStorage())

  const isAuthenticated = computed(() => !!user.value?.accessToken)
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  )

  async function login(credentials: LoginCredentials) {
    const response: AuthResponse = await loginService(credentials)

    user.value = {
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      image: response.image,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))

    const cart = useCartStore()
    const favs = useFavoritesStore()
    cart.loadForUser(user.value.id)
    favs.loadForUser(user.value.id)
  }

  function logout() {
    const cart = useCartStore()
    const favs = useFavoritesStore()
    cart.unload()
    favs.unload()

    user.value = null

    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, isAuthenticated, fullName, login, logout }
})