<script setup lang="ts">
import type { Product } from '@/models/product.model'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart.store'
import { useAuthStore } from '@/stores/auth.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

defineProps<{ product: Product }>()

const cart = useCartStore()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const toast = useToast()
const router = useRouter()

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

function handleRemoveFromWishlist(product: Product) {
    wishlist.removeItem(product.id)
    toast.add({
        severity: 'info',
        summary: 'Removido dos favoritos',
        detail: product.title,
        life: 3000,
    })
}

function goToProduct(id: number) {
    router.push({ name: 'product-detail', params: { id } })
}
</script>

<template>
    <article
        class="group bg-surface-0 rounded-2xl overflow-hidden flex flex-row  shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        <div class="relative w-32 shrink-0 overflow-hidden bg-surface-50 cursor-pointer"
            @click="goToProduct(product.id)">
            <img :src="product.thumbnail" :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy" />
            <Tag v-if="product.discountPercentage > 0" :value="`-${Math.round(product.discountPercentage)}%`"
                severity="danger" class="absolute top-2 left-2 !text-[0.65rem]" />
        </div>

        <div class="flex flex-col gap-1.5 px-4 py-3 flex-1 min-w-0">
            <div class="flex items-center justify-between">
                <Tag :value="product.category" severity="secondary"
                    class="!text-[0.62rem] !uppercase !tracking-widest" />
                <span class="flex items-center gap-1 text-xs font-semibold text-yellow-500">
                    <i class="pi pi-star-fill text-[0.6rem]" />
                    {{ product.rating.toFixed(1) }}
                </span>
            </div>

            <h3 class="text-sm font-bold text-surface-900 leading-snug line-clamp-2 m-0 cursor-pointer hover:text-primary transition-colors"
                @click="goToProduct(product.id)">
                {{ product.title }}
            </h3>

            <p class="text-xs text-surface-400 font-medium m-0">{{ product.brand }}</p>

            <div class="flex items-end justify-between mt-auto pt-1">
                <div class="flex flex-col gap-0.5">
                    <span v-if="product.discountPercentage > 0" class="text-xs text-surface-400 line-through">
                        {{ formattedPrice(product.price) }}
                    </span>
                    <span class="text-lg font-extrabold text-surface-900">
                        {{ formattedPrice(discountedPrice(product.price, product.discountPercentage)) }}
                    </span>
                    <span class="text-xs text-green-600 font-medium">{{ product.shippingInformation }}</span>
                </div>

                <div class="flex items-center gap-1">
                    <Button severity="danger" text rounded aria-label="Remover dos favoritos"
                        @click.stop.prevent="handleRemoveFromWishlist(product)">
                        <Icon icon="mdi:heart" class="text-lg text-red-500" />
                    </Button>

                    <Button icon="pi pi-shopping-cart" severity="secondary" rounded text
                        aria-label="Adicionar ao carrinho" @click.stop.prevent="handleAddToCart(product)" />
                </div>
            </div>
        </div>
    </article>
</template>