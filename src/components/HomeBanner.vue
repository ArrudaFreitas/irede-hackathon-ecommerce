<script setup lang="ts">
import banner1 from "@/assets/banners/banner-1.png";
import banner2 from "@/assets/banners/banner-2.png";
import banner3 from "@/assets/banners/banner-3.jpg";

const banners = [
  {
    image: banner1,
    alt: "Promoção 1",
  },
  {
    image: banner2,
    alt: "Promoção 2",
  },
  {
    image: banner3,
    alt: "Promoção 3",
  },
];
</script>

<template>
  <Carousel
    :value="banners"
    :num-visible="1"
    :num-scroll="1"
    :autoplay-interval="4000"
    circular
    class="w-full"
  >
    <template #item="{ data }">
      <img :src="data.image" :alt="data.alt" class="w-full block" />
    </template>
  </Carousel>
</template>
