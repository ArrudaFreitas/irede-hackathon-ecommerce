<script setup lang="ts">
import type { Product } from "../../models/product.model";

defineProps<{ product: Product }>();

function formattedPrice(price: number): string {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function discountedPrice(price: number, discount: number): number {
    return price * (1 - discount / 100);
}
</script>

<template>
    <article class="product-card">
        <div class="card-image-wrapper">
            <img :src="product.thumbnail" :alt="product.title" class="card-image" loading="lazy" />
            <span v-if="product.discountPercentage > 0" class="discount-badge">
                -{{ Math.round(product.discountPercentage) }}%
            </span>
        </div>

        <div class="card-body">
            <div class="card-meta">
                <span class="category-tag">{{ product.category }}</span>
                <span class="rating">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {{ product.rating.toFixed(1) }}
                </span>
            </div>

            <h3 class="card-title">{{ product.title }}</h3>
            <p class="card-brand">{{ product.brand }}</p>

            <div class="card-pricing">
                <span v-if="product.discountPercentage > 0" class="price-original">
                    {{ formattedPrice(product.price) }}
                </span>
                <span class="price-current">
                    {{ formattedPrice(discountedPrice(product.price, product.discountPercentage)) }}
                </span>
            </div>
        </div>
    </article>
</template>

<style scoped>
.product-card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
    height: 100%;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

/* Image */
.card-image-wrapper {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #f8f8f8;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.product-card:hover .card-image {
    transform: scale(1.05);
}

.discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ef4444;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 999px;
    letter-spacing: 0.03em;
}

/* Body */
.card-body {
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
}

.card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.category-tag {
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #6366f1;
    background: #eef2ff;
    padding: 2px 8px;
    border-radius: 999px;
}

.rating {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #f59e0b;
}

.card-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.3;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-brand {
    font-size: 0.78rem;
    color: #9ca3af;
    margin: 0;
    font-weight: 500;
}

.card-pricing {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-top: auto;
    padding-top: 8px;
}

.price-original {
    font-size: 0.78rem;
    color: #9ca3af;
    text-decoration: line-through;
}

.price-current {
    font-size: 1.1rem;
    font-weight: 800;
    color: #111827;
}
</style>