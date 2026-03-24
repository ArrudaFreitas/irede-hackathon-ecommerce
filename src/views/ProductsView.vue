<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useProducts } from "../composables/useProducts";
import ProductGrid from "../components/product/ProductGrid.vue";
import AppPaginator from "../components/layout/AppPaginator.vue";

const props = defineProps<{
  category?: string
}>()

const {
    products,
    loading,
    error,
    total,
    currentPage,
    itemsPerPage,
    fetchProducts,
    onPageChange,
} = useProducts();

function load() {
  fetchProducts(0, props.category)
}

onMounted(load);
watch(() => props.category, load)
</script>

<template>
  <section class="products-view">
    <div class="products-header">
      <h1 class="products-title">Produtos</h1>
      <p v-if="!loading && !error" class="products-count">
        {{ total }} itens encontrados
      </p>
    </div>

        <!-- Loading -->
        <div v-if="loading" class="feedback-wrapper">
            <div class="skeleton-grid">
                <div v-for="n in itemsPerPage" :key="n" class="skeleton-card">
                    <div class="skeleton-image shimmer" />
                    <div class="skeleton-body">
                        <div class="skeleton-line short shimmer" />
                        <div class="skeleton-line shimmer" />
                        <div class="skeleton-line shimmer" />
                        <div class="skeleton-line xshort shimmer" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="feedback-wrapper feedback-error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{{ error }}</p>
            <button class="retry-btn" @click="fetchProducts(0)">Tentar novamente</button>
        </div>

        <!-- Grid + Paginação -->
        <template v-else>
            <ProductGrid :products="products" />
            <AppPaginator :total="total" :rows="itemsPerPage" :first="currentPage" @page-change="onPageChange" />
        </template>
    </section>
</template>

<style scoped>
.products-view {
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 24px 80px;
}

.products-header {
    margin-bottom: 32px;
    display: flex;
    align-items: baseline;
    gap: 16px;
}

.products-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: #111827;
    margin: 0;
}

.products-count {
    font-size: 0.85rem;
    color: #9ca3af;
    margin: 0;
}

.feedback-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 300px;
    color: #6b7280;
}

.feedback-error {
    color: #ef4444;
}

.retry-btn {
    padding: 8px 20px;
    background: #111827;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.retry-btn:hover {
    opacity: 0.8;
}

/* Skeleton */
.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px;
    width: 100%;
}

.skeleton-card {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #f0f0f0;
    background: #fff;
}

.skeleton-image {
    aspect-ratio: 1 / 1;
    background: #e5e7eb;
}

.skeleton-body {
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-line {
    height: 12px;
    border-radius: 6px;
    background: #e5e7eb;
    width: 100%;
}

.skeleton-line.short {
    width: 60%;
}

.skeleton-line.xshort {
    width: 40%;
}

.shimmer {
    background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

@media (max-width: 480px) {
    .skeleton-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
    }

    .products-title {
        font-size: 1.4rem;
    }
}
</style>