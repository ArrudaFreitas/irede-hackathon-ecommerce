<script setup lang="ts">
import type { Product } from '@/models/product.model'
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart.store'
import { useAuthStore } from '@/stores/auth.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { Icon } from '@iconify/vue'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const router = useRouter()
const toast = useToast()

const discountedPrice = computed(() =>
  props.product.price * (1 - props.product.discountPercentage / 100),
)

function handleAddToCart() {
  if (!auth.isAuthenticated) {
    auth.openLoginModal()
    return
  }
  cart.addItem(props.product)
  toast.add({
    severity: 'success',
    summary: 'Adicionado ao carrinho',
    detail: props.product.title,
    life: 3000,
  })
}

function handleBuyNow() {
  if (!auth.isAuthenticated) {
    auth.openLoginModal()
    return
  }
  cart.addItem(props.product)
  router.push('/cart')
}

function handleToggleWishlist() {
  if (!auth.isAuthenticated) {
    auth.openLoginModal()
    return
  }
  const added = wishlist.toggle(props.product)
  toast.add({
    severity: added ? 'success' : 'info',
    summary: added ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
    detail: props.product.title,
    life: 3000,
  })
}
</script>

<template>
  <div class="flex flex-col gap-4 lg:w-1/2">
    <div class="flex items-center justify-between gap-2">
      <div class="flex gap-2">
        <Tag :value="product.category" severity="secondary" />
        <Tag :value="product.brand" severity="info" />
      </div>

      <button
        class="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110"
        :class="wishlist.isInWishlist(product.id)
            ? 'border-red-200 bg-red-50 hover:bg-red-100'
            : 'border-surface-200 bg-surface-0 hover:bg-surface-100'
          " :aria-label="wishlist.isInWishlist(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          " @click="handleToggleWishlist">
        <Icon :icon="wishlist.isInWishlist(product.id) ? 'mdi:heart' : 'mdi:heart-outline'"
          class="text-xl transition-colors duration-200"
          :class="wishlist.isInWishlist(product.id) ? 'text-red-500' : 'text-surface-400'" />
      </button>
    </div>

    <h1 class="text-2xl font-semibold">{{ product.title }}</h1>

    <div class="flex items-center gap-2">
      <Rating :modelValue="product.rating" readonly :cancel="false" />
      <span class="text-sm text-gray-500">{{ product.rating }}</span>
    </div>

    <div class="flex flex-col gap-1">
      <span class="text-3xl font-bold text-primary-600">
        R$ {{ discountedPrice.toFixed(2) }}
      </span>
      <div class="flex items-center gap-2">
        <span class="text-lg line-through text-gray-400">
          R$ {{ product.price.toFixed(2) }}
        </span>
        <Tag :value="`-${product.discountPercentage}%`" severity="danger" />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium" :class="{
        'text-green-600': product.availabilityStatus === 'In Stock',
        'text-yellow-600': product.availabilityStatus === 'Low Stock',
        'text-red-500': product.availabilityStatus === 'Out of Stock',
      }">
        {{ product.availabilityStatus }}
      </p>
      <p class="text-xs text-gray-400">{{ product.stock }} unidades restantes</p>
    </div>

    <div class="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <i class="pi pi-shield" />
        <span>{{ product.warrantyInformation }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <i class="pi pi-truck" />
        <span>{{ product.shippingInformation }}</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Tag v-for="tag in product.tags" :key="tag" :value="tag" severity="secondary" />
    </div>

    <div class="flex gap-3 mt-2">
      <Button label="Comprar agora" class="flex-1 !bg-slate-700"
        :disabled="product.availabilityStatus === 'Out of Stock'" @click="handleBuyNow" />
      <Button label="Adicionar ao carrinho" class="flex-1" severity="secondary" outlined
        :disabled="product.availabilityStatus === 'Out of Stock'" @click="handleAddToCart" />
    </div>
  </div>
</template>