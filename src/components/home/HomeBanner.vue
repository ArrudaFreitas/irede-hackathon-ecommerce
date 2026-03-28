<script setup lang="ts">
import banner1 from "@/assets/banners/banner-1.png";
import banner2 from "@/assets/banners/banner-2.png";
import banner3 from "@/assets/banners/banner-3.png";
import { ref, computed } from "vue";

const gradientColor = computed(() => banners[current.value].color);

const banners = [
  { image: banner1, alt: "Promoção 1", color: "#9E9E9E" },
  { image: banner2, alt: "Promoção 2", color: "#A8A8A8" }, 
  { image: banner3, alt: "Promoção 3", color: "#C8C5BE" },
];

const current = ref(0);
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

function goTo(index: number) {
  current.value = (index + banners.length) % banners.length;
}

function prev() { goTo(current.value - 1); }
function next() { goTo(current.value + 1); }

function startAutoplay() {
  autoplayTimer = setInterval(() => next(), 4000);
}

function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
}

startAutoplay();
</script>

<template>
  <div class="banner-wrapper"
    @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <!-- Seta Esquerda -->
    <button class="banner-arrow banner-arrow--left" @click="prev" aria-label="Anterior">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <!-- Slides -->
    <div class="banner-track">
      <transition name="banner-fade" mode="out-in">
        <img :key="current" :src="banners[current].image" :alt="banners[current].alt" class="banner-img" />
      </transition>
    </div>

    <!-- Seta Direita -->
    <button class="banner-arrow banner-arrow--right" @click="next" aria-label="Próximo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>

    <!-- Dots -->
    <div class="banner-dots">
      <button v-for="(_, i) in banners" :key="i" class="banner-dot" :class="{ 'banner-dot--active': i === current }"
        @click="goTo(i)" :aria-label="`Ir para slide ${i + 1}`" />
    </div>
  </div>
</template>

<style scoped>
.banner-wrapper {
  position: relative;
  width: 100%;
  overflow: visible;
  transition: background 0.6s ease;
}

.banner-wrapper::after {
  content: "";
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, v-bind(gradientColor), transparent);
  pointer-events: none;
  z-index: 5;
}

/* Setas */
.banner-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
  transition: background 0.2s, transform 0.2s;
  color: #333;
}

.banner-arrow:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.1);
}

.banner-arrow svg {
  width: 24px;
  height: 24px;
}

.banner-arrow--left {
  left: 16px;
}

.banner-arrow--right {
  right: 16px;
}

/* Imagem */
.banner-track {
  width: 100%;
}

.banner-img {
  width: 100%;
  display: block;
  max-height: 420px;
  object-fit: cover;
}

/* Dots */
.banner-dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.banner-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  padding: 0;
}

.banner-dot--active {
  background: #fff;
  transform: scale(1.3);
}

/* Transição */
.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 0.4s ease;
}

.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .banner-img {
    max-height: 220px;
  }

  .banner-arrow {
    width: 36px;
    height: 36px;
  }

  .banner-arrow svg {
    width: 18px;
    height: 18px;
  }

  .banner-arrow--left {
    left: 8px;
  }

  .banner-arrow--right {
    right: 8px;
  }
}

@media (max-width: 480px) {
  .banner-img {
    max-height: 160px;
  }
}
</style>