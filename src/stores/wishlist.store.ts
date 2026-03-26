import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '../models/product.model'
import { useAuthStore } from './auth.store'

const STORAGE_PREFIX = 'wishlist_user_'

function storageKey(userId: number) {
    return `${STORAGE_PREFIX}${userId}`
}

function loadFromStorage(userId: number): Product[] {
    try {
        const raw = localStorage.getItem(storageKey(userId))
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveToStorage(userId: number, items: Product[]) {
    localStorage.setItem(storageKey(userId), JSON.stringify(items))
}

function removeFromStorage(userId: number) {
    localStorage.removeItem(storageKey(userId))
}

export const useWishlistStore = defineStore('wishlist', () => {
    const items = ref<Product[]>([])
    const hydrated = ref(false)

    const totalItems = computed(() => items.value.length)

    function isInWishlist(productId: number): boolean {
        return items.value.some((i) => i.id === productId)
    }

    function hydrate() {
        const auth = useAuthStore()
        if (!auth.isAuthenticated || !auth.user) return

        const userId = auth.user.id
        items.value = loadFromStorage(userId)
        hydrated.value = true
    }

    function persist() {
        const auth = useAuthStore()
        if (!auth.user) return
        saveToStorage(auth.user.id, items.value)
    }

    watch(items, persist, { deep: true })

    function toggle(product: Product) {
        const auth = useAuthStore()
        if (!auth.isAuthenticated) return false

        const idx = items.value.findIndex((i) => i.id === product.id)
        if (idx >= 0) {
            items.value.splice(idx, 1)
            return false // removido
        } else {
            items.value.push(product)
            return true // adicionado
        }
    }

    function removeItem(productId: number) {
        items.value = items.value.filter((i) => i.id !== productId)
    }

    function onLogout() {
        const auth = useAuthStore()
        if (auth.user) removeFromStorage(auth.user.id)
        items.value = []
        hydrated.value = false
    }

    return {
        items,
        hydrated,
        totalItems,
        isInWishlist,
        hydrate,
        toggle,
        removeItem,
        onLogout,
    }
})