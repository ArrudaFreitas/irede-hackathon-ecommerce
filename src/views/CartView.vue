<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart.store'
import { useAuthStore } from '@/stores/auth.store'
import CartItem from '@/components/cart/CartItem.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import { Icon } from '@iconify/vue'

const cart = useCartStore()
const auth = useAuthStore()

onMounted(async () => {
    if (auth.isAuthenticated && !cart.hydrated) {
        await cart.hydrate()
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-6xl mx-auto px-4 py-6">

            <h1 class="text-2xl font-semibold text-gray-800 mb-6">
                Carrinho de compras
            </h1>

            <div v-if="!cart.hydrated && auth.isAuthenticated" class="flex justify-center py-20">
                <ProgressSpinner />
            </div>

            <div v-else-if="!auth.isAuthenticated"
                class="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <Icon icon="mdi:cart-off" class="text-6xl text-gray-300" />
                <p class="text-lg text-gray-500">Você precisa estar logado para ver seu carrinho.</p>
                <Button label="Entrar" @click="auth.openLoginModal()" />
            </div>

            <div v-else-if="cart.items.length === 0"
                class="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <Icon icon="mdi:cart-outline" class="text-6xl text-gray-300" />
                <p class="text-lg text-gray-500">Seu carrinho está vazio.</p>
                <Button label="Ver produtos" severity="secondary" outlined as="router-link" to="/products" />
            </div>

            <div v-else class="flex flex-col lg:flex-row gap-6 items-start">

                <div class="flex-1 min-w-0">
                    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

                        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <span class="font-medium text-gray-700">
                                {{ cart.totalItems }} {{ cart.totalItems === 1 ? 'produto' : 'produtos' }}
                            </span>
                            <button
                                class="text-sm text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
                                @click="cart.clearCart()">
                                <Icon icon="mdi:trash-can-outline" />
                                Limpar tudo
                            </button>
                        </div>

                        <div class="divide-y divide-gray-100">
                            <CartItem v-for="item in cart.items" :key="item.id" :item="item" />
                        </div>

                        <div
                            class="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center gap-2 text-sm text-gray-500">
                            <Icon icon="mdi:truck-outline" class="text-green-500 text-base" />
                            <span>Frete <span class="text-green-600 font-medium">Grátis</span> para todos os
                                itens</span>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-80 shrink-0">
                    <CartSummary />
                </div>

            </div>
        </div>
    </div>
</template>