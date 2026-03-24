<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProduct } from "@/composables/useProduct";
import ProductGallery from "@/components/product-detail/ProductGallery.vue";
import ProductInfo from "@/components/product-detail/ProductInfo.vue";
import ProductDescription from "@/components/product-detail/ProductDescription.vue";
import ProductReviews from "@/components/product-detail/ProductReviews.vue";

const route = useRoute();
const { product, loading, error, fetchProduct } = useProduct();

function loadProduct() {
  fetchProduct(Number(route.params.id));
}

onMounted(loadProduct);

watch(() => route.params.id, loadProduct);
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-96">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="5" />
    </div>

    <div v-else-if="error" class="flex justify-center items-center min-h-96">
      <Message severity="error" :closable="false">{{ error }}</Message>
    </div>

    <div v-else-if="product" class="flex flex-col gap-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <ProductGallery :images="product.images" />
        <ProductInfo :product="product" />
      </div>
      <ProductDescription :description="product.description" />
      <ProductReviews :reviews="product.reviews" />
    </div>
  </div>
</template>
