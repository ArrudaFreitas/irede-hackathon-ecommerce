import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'
import type { Product } from '../models/product.model'

function favKey(userId: number) { return `favorites:${userId}` }

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function persist(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Product[]>([])

  const favoritesCount = computed(() => favorites.value.length)

  function loadForUser(userId: number) {
    favorites.value = load<Product>(favKey(userId))
  }

  function unload() {
    favorites.value = []
  }

  function toggleFavorite(product: Product) {
    const auth = useAuthStore()
    if (!auth.user) return
    const index = favorites.value.findIndex(p => p.id === product.id)
    if (index === -1) {
      favorites.value.push(product)
    } else {
      favorites.value.splice(index, 1)
    }
    persist(favKey(auth.user.id), favorites.value)
  }

  function isFavorite(productId: number): boolean {
    return favorites.value.some(p => p.id === productId)
  }

  return {
    favorites,
    favoritesCount,
    loadForUser, unload,
    toggleFavorite, isFavorite,
  }
})