<script setup lang="ts">
import HomeBanner from "@/components/home/HomeBanner.vue";
import ProductsView from "./ProductsView.vue";
</script>

<template>
  <div>
    <HomeBanner />
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <ProductsView />
    </div>
  </div>
</template>