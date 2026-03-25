import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginService } from '../services/auth.service'
import type { LoginCredentials, AuthResponse } from '../models/user.model'
import type { RouteLocationNormalized } from 'vue-router'

const STORAGE_KEY = 'auth'

function loadFromStorage(): AuthResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthResponse | null>(loadFromStorage())
  const isAuthenticated = computed(() => !!user.value?.accessToken)
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  )

  // Modal
  const showLoginModal = ref(false)
  const redirectAfterLogin = ref<RouteLocationNormalized | null>(null)

  function openLoginModal(redirect?: RouteLocationNormalized) {
    redirectAfterLogin.value = redirect ?? null
    showLoginModal.value = true
  }

  function closeLoginModal() {
    showLoginModal.value = false
    redirectAfterLogin.value = null
  }

  async function login(credentials: LoginCredentials) {
    user.value = await loginService(credentials)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  function updateTokens(data: AuthResponse) {
    if (!user.value) return
    user.value.accessToken = data.accessToken
    user.value.refreshToken = data.refreshToken
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    user, isAuthenticated, fullName,
    login, updateTokens, logout,
    showLoginModal, openLoginModal, closeLoginModal,
    redirectAfterLogin,
  }
})