import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'
import type { Product } from '../models/product.model'

function cartKey(userId: number) { return `cart:${userId}` }

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function persist(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<Product[]>([])

  const cartCount = computed(() => cartItems.value.length)

  function loadForUser(userId: number) {
    cartItems.value = load<Product>(cartKey(userId))
  }

  function unload() {
    cartItems.value = []
  }

  function addToCart(product: Product) {
    const auth = useAuthStore()
    if (!auth.user) return
    const exists = cartItems.value.find(p => p.id === product.id)
    if (!exists) {
      cartItems.value.push(product)
      persist(cartKey(auth.user.id), cartItems.value)
    }
  }

  function removeFromCart(productId: number) {
    const auth = useAuthStore()
    if (!auth.user) return
    cartItems.value = cartItems.value.filter(p => p.id !== productId)
    persist(cartKey(auth.user.id), cartItems.value)
  }

  function clearCart() {
    const auth = useAuthStore()
    if (!auth.user) return
    cartItems.value = []
    localStorage.removeItem(cartKey(auth.user.id))
  }

  return {
    cartItems,
    cartCount,
    loadForUser, unload,
    addToCart, removeFromCart, clearCart,
  }
})