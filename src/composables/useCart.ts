import { ref } from 'vue'
import { getCartsByUser } from '../services/cart.service'
import type { CartItem } from '../models/cart.model'

export function useCart() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchCartItems(userId: number): Promise<CartItem[]> {
        loading.value = true
        error.value = null

        try {
            const response = await getCartsByUser(userId)

            const cart = response.carts?.[0]
            if (!cart) return []

            return cart.products.map((p) => ({
                id: p.id,
                title: p.title,
                price: p.price,
                discountPercentage: p.discountPercentage,
                discountedPrice: parseFloat(
                    (p.price * (1 - p.discountPercentage / 100)).toFixed(2),
                ),
                quantity: p.quantity,
                thumbnail: p.thumbnail,
            }))
        } catch (e) {
            error.value = 'Não foi possível carregar o carrinho.'
            console.error(e)
            return []
        } finally {
            loading.value = false
        }
    }

    return { loading, error, fetchCartItems }
}