<script setup lang="ts">
import Galleria from "primevue/galleria";

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
  <section class="w-full">
    <Galleria
      :value="banners"
      :numVisible="5"
      :circular="true"
      :autoPlay="true"
      :transitionInterval="5000"
      :showThumbnails="false"
      :showIndicators="true"
      :showItemNavigators="true"
      containerClass="w-full"
    >
      <template #item="{ item }">
        <div
          class="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden"
        >
          <img
            :src="item.image"
            :alt="item.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </template>
    </Galleria>
  </section>
</template>
