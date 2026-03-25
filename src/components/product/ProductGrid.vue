<script setup lang="ts">
import router from "@/router";
import type { Product } from "../../models/product.model";
import ProductCard from "./ProductCard.vue";

defineProps<{ products: Product[] }>();
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            class="cursor-pointer"
            @click="router.push({ name: 'product-detail', params: { id: product.id } })"
        />
    </div>
</template>