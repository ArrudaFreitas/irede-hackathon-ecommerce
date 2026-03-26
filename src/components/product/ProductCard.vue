<script setup lang="ts">
import type { Product } from '../../models/product.model'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart.store'
import { useAuthStore } from '@/stores/auth.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useToast } from 'primevue/usetoast'

defineProps<{ product: Product }>()

const cart = useCartStore()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const toast = useToast()

function formattedPrice(price: number): string {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function discountedPrice(price: number, discount: number): number {
    return price * (1 - discount / 100)
}

function handleAddToCart(product: Product) {
    if (!auth.isAuthenticated) {
        auth.openLoginModal()
        return
    }
    cart.addItem(product)
    toast.add({
        severity: 'success',
        summary: 'Adicionado ao carrinho',
        detail: product.title,
        life: 3000,
    })
}

function handleToggleWishlist(product: Product) {
    if (!auth.isAuthenticated) {
        auth.openLoginModal()
        return
    }
    const added = wishlist.toggle(product)
    toast.add({
        severity: added ? 'success' : 'info',
        summary: added ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
        detail: product.title,
        life: 3000,
    })
}
</script>

<template>
    <article
        class="group bg-surface-0 rounded-2xl overflow-hidden flex flex-row sm:flex-col border border-surface-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
        <!-- Imagem -->
        <div class="relative w-24 shrink-0 sm:w-auto sm:aspect-square overflow-hidden bg-surface-50">
            <img :src="product.thumbnail" :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy" />
            <Tag v-if="product.discountPercentage > 0" :value="`-${Math.round(product.discountPercentage)}%`"
                severity="danger" class="absolute top-2.5 right-2.5 !text-[0.7rem]" />
            <button
                class="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110"
                :aria-label="wishlist.isInWishlist(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
                @click.stop.prevent="handleToggleWishlist(product)">
                <Icon :icon="wishlist.isInWishlist(product.id) ? 'mdi:heart' : 'mdi:heart-outline'"
                    class="text-base transition-colors duration-200"
                    :class="wishlist.isInWishlist(product.id) ? 'text-red-500' : 'text-surface-400'" />
            </button>
        </div>

        <!-- Corpo -->
        <div class="flex flex-col gap-1 px-3 py-3 sm:px-4 sm:pt-3.5 sm:pb-4 flex-1 min-w-0">
            <div class="flex items-center justify-between">
                <Tag :value="product.category" severity="secondary"
                    class="!text-[0.6rem] sm:!text-[0.68rem] !uppercase !tracking-widest" />
                <span class="flex items-center gap-1 text-[0.65rem] sm:text-xs font-semibold text-yellow-500">
                    <i class="pi pi-star-fill text-[0.55rem] sm:text-[0.65rem]" />
                    {{ product.rating.toFixed(1) }}
                </span>
            </div>

            <h3 class="text-xs sm:text-sm font-bold text-surface-900 leading-snug line-clamp-2 m-0">
                {{ product.title }}
            </h3>
            <p class="text-[0.65rem] sm:text-xs text-surface-400 font-medium m-0">{{ product.brand }}</p>

            <div class="flex items-end justify-between mt-auto pt-1 sm:pt-2">
                <div class="flex flex-col gap-0.5">
                    <span v-if="product.discountPercentage > 0"
                        class="text-[0.65rem] sm:text-xs text-surface-400 line-through">
                        {{ formattedPrice(product.price) }}
                    </span>
                    <span class="text-sm sm:text-lg font-extrabold text-surface-900">
                        {{ formattedPrice(discountedPrice(product.price, product.discountPercentage)) }}
                    </span>
                </div>
                <Button icon="pi pi-shopping-cart" severity="secondary" rounded text aria-label="Adicionar ao carrinho"
                    @click.stop.prevent="handleAddToCart(product)" />
            </div>
        </div>
    </article>
</template>