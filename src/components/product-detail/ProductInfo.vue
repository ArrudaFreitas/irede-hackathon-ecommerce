<!-- components/product-detail/ProductInfo.vue -->
<script setup lang="ts">
import type { Product } from "@/models/product.model";
import { computed } from "vue";

const props = defineProps<{
  product: Product;
}>();

const discountedPrice = computed(() => {
  return props.product.price * (1 - props.product.discountPercentage / 100);
});
</script>

<template>
  <div class="flex flex-col gap-4 lg:w-1/2">
    <div class="flex gap-2">
      <Tag :value="product.category" severity="secondary" />
      <Tag :value="product.brand" severity="info" />
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
      <p
        class="text-sm font-medium"
        :class="{
          'text-green-600': product.availabilityStatus === 'In Stock',
          'text-yellow-600': product.availabilityStatus === 'Low Stock',
          'text-red-500': product.availabilityStatus === 'Out of Stock',
        }"
      >
        {{ product.availabilityStatus }}
      </p>
      <p class="text-xs text-gray-400">
        {{ product.stock }} unidades restantes
      </p>
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
      <Tag
        v-for="tag in product.tags"
        :key="tag"
        :value="tag"
        severity="secondary"
      />
    </div>

    <div class="flex gap-3 mt-2">
      <Button label="Comprar agora" class="flex-1" />
      <Button
        label="Adicionar ao carrinho"
        class="flex-1"
        severity="secondary"
        outlined
      />
    </div>
  </div>
</template>
