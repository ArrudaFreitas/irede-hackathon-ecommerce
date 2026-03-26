<script setup lang="ts">
import { onMounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useAuthStore } from '@/stores/auth.store'
import WishlistCard from '@/components/wishlist/WishlistCard.vue'
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const wishlist = useWishlistStore()
const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
    if (!auth.isAuthenticated) {
        auth.openLoginModal()
        router.push('/')
        return
    }
    if (!wishlist.hydrated) {
        wishlist.hydrate()
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-6xl mx-auto px-4 py-6">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">Favoritos</h1>

            <!-- Não autenticado -->
            <div v-if="!auth.isAuthenticated" class="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <Icon icon="mdi:heart-off-outline" class="text-6xl text-gray-300" />
                <p class="text-lg text-gray-500">Você precisa estar logado para ver seus favoritos.</p>
                <Button label="Entrar" @click="auth.openLoginModal()" />
            </div>

            <!-- Lista de favoritos -->
            <div v-else-if="wishlist.totalItems > 0">
                <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <span class="font-medium text-gray-700">
                            {{ wishlist.totalItems }} {{ wishlist.totalItems === 1 ? 'item' : 'itens' }}
                        </span>
                    </div>
                    <div class="divide-y divide-gray-100">
                        <WishlistCard v-for="product in wishlist.items" :key="product.id" :product="product" />
                    </div>
                </div>
            </div>

            <!-- Estado vazio -->
            <div v-else class="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <Icon icon="mdi:heart-outline" class="text-6xl text-gray-300" />
                <p class="text-lg text-gray-500">Seus favoritos estão vazios.</p>
                <Button label="Ver produtos" severity="secondary" outlined as="router-link" to="/products" />
            </div>
        </div>
    </div>
</template>