import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CartItem } from '../models/cart.model'
import type { Product } from '../models/product.model'
import { useCart } from '../composables/useCart'
import { useAuthStore } from './auth.store'

const STORAGE_PREFIX = 'cart_user_'

function storageKey(userId: number) {
    return `${STORAGE_PREFIX}${userId}`
}

function loadFromStorage(userId: number): CartItem[] {
    try {
        const raw = localStorage.getItem(storageKey(userId))
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveToStorage(userId: number, items: CartItem[]) {
    localStorage.setItem(storageKey(userId), JSON.stringify(items))
}

function removeFromStorage(userId: number) {
    localStorage.removeItem(storageKey(userId))
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])
    const hydrated = ref(false)

    const totalItems = computed(() =>
        items.value.reduce((acc, i) => acc + i.quantity, 0),
    )

    const subtotal = computed(() =>
        items.value.reduce((acc, i) => acc + i.price * i.quantity, 0),
    )

    const totalDiscount = computed(() =>
        items.value.reduce(
            (acc, i) => acc + (i.price - i.discountedPrice) * i.quantity,
            0,
        ),
    )

    const total = computed(() => subtotal.value - totalDiscount.value)

    async function hydrate() {
        const auth = useAuthStore()
        if (!auth.isAuthenticated || !auth.user) return

        const userId = auth.user.id
        const cached = loadFromStorage(userId)

        if (cached.length > 0) {
            items.value = cached
            hydrated.value = true
            return
        }

        const { fetchCartItems } = useCart()
        const apiItems = await fetchCartItems(userId)
        items.value = apiItems
        if (apiItems.length > 0) {
            saveToStorage(userId, apiItems)
        }
        hydrated.value = true
    }

    function persist() {
        const auth = useAuthStore()
        if (!auth.user) return
        saveToStorage(auth.user.id, items.value)
    }

    watch(items, persist, { deep: true })

    function addItem(product: Product) {
        const existing = items.value.find((i) => i.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            const discountedPrice = parseFloat(
                (product.price * (1 - product.discountPercentage / 100)).toFixed(2),
            )
            items.value.push({
                id: product.id,
                title: product.title,
                price: product.price,
                discountPercentage: product.discountPercentage,
                discountedPrice,
                quantity: 1,
                thumbnail: product.thumbnail,
            })
        }
    }

    function removeItem(productId: number) {
        items.value = items.value.filter((i) => i.id !== productId)
    }

    function increaseQuantity(productId: number) {
        const item = items.value.find((i) => i.id === productId)
        if (item) item.quantity++
    }

    function decreaseQuantity(productId: number) {
        const item = items.value.find((i) => i.id === productId)
        if (!item) return
        if (item.quantity > 1) {
            item.quantity--
        } else {
            removeItem(productId)
        }
    }

    function clearCart() {
        const auth = useAuthStore()
        items.value = []
        if (auth.user) removeFromStorage(auth.user.id)
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
        subtotal,
        totalDiscount,
        total,
        hydrate,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        onLogout,
    }
})