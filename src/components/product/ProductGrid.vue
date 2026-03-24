<script setup lang="ts">
import router from "@/router";
import type { Product } from "../../models/product.model";
import ProductCard from "./ProductCard.vue";

defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="product-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      class="cursor-pointer"
      @click="router.push({ name: 'product-detail', params: { id: product.id } })"
    />
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}
</style>
