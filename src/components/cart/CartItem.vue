<script setup lang="ts">
import type { CartItem } from '@/models/cart.model'
import { useCartStore } from '@/stores/cart.store'
import { Icon } from '@iconify/vue'

const props = defineProps<{ item: CartItem }>()

const cart = useCartStore()
</script>

<template>
    <div class="flex gap-4 py-5 px-4">
        <RouterLink :to="`/products/${item.id}`" class="shrink-0">
            <img :src="item.thumbnail" :alt="item.title"
                class="w-24 h-24 object-contain rounded-lg border border-gray-100 bg-white" />
        </RouterLink>

        <div class="flex flex-1 flex-col gap-2 min-w-0">
            <RouterLink :to="`/products/${item.id}`"
                class="text-sm text-gray-700 hover:underline line-clamp-2 font-medium">
                {{ item.title }}
            </RouterLink>

            <div class="flex items-center gap-2">
                <span class="text-xs line-through text-gray-400">
                    R$ {{ item.price.toFixed(2) }}
                </span>
                <Tag :value="`-${item.discountPercentage.toFixed(0)}%`" severity="danger" class="!text-xs !py-0" />
            </div>

            <span class="text-xl font-semibold text-gray-900">
                R$ {{ item.discountedPrice.toFixed(2) }}
            </span>

            <div class="flex items-center justify-between mt-1 flex-wrap gap-2">
                <div class="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                        class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        @click="cart.decreaseQuantity(item.id)">
                        <Icon icon="mdi:minus" class="text-sm" />
                    </button>
                    <span class="w-8 text-center text-sm font-medium">{{ item.quantity }}</span>
                    <button
                        class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        @click="cart.increaseQuantity(item.id)">
                        <Icon icon="mdi:plus" class="text-sm" />
                    </button>
                </div>

                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-500">
                        Total:
                        <span class="font-semibold text-gray-800">
                            R$ {{ (item.discountedPrice * item.quantity).toFixed(2) }}
                        </span>
                    </span>
                    <button class="text-gray-400 hover:text-red-500 transition-colors p-1" title="Remover item"
                        @click="cart.removeItem(item.id)">
                        <Icon icon="mdi:trash-can-outline" class="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>