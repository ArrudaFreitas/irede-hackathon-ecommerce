<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProductsView from './ProductsView.vue'

const route = useRoute()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <ProductsView :category="String(route.params.slug)" />
  </div>
</template>