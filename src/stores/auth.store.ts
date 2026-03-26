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
    user.value ? `${user.value.firstName} ${user.value.lastName}` : '',
  )

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

    const { useCartStore } = await import('./cart.store')
    const cartStore = useCartStore()
    await cartStore.hydrate()

    // Hidrata os favoritos após o login
    const { useWishlistStore } = await import('./wishlist.store')
    const wishlistStore = useWishlistStore()
    wishlistStore.hydrate()
  }

  function updateTokens(data: AuthResponse) {
    if (!user.value) return
    user.value.accessToken = data.accessToken
    user.value.refreshToken = data.refreshToken
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  async function logout() {
    const { useCartStore } = await import('./cart.store')
    const cartStore = useCartStore()
    cartStore.onLogout()

    const { useWishlistStore } = await import('./wishlist.store')
    const wishlistStore = useWishlistStore()
    wishlistStore.onLogout()

    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    user,
    isAuthenticated,
    fullName,
    login,
    updateTokens,
    logout,
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    redirectAfterLogin,
  }
})