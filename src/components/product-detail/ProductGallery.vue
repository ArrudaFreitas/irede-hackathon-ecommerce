<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  images: string[];
}>();

const selectedImage = ref(props.images[0]);
</script>

<template>
  <div class="flex gap-4 lg:w-1/2">
    <div class="flex flex-col gap-2">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        class="w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all"
        :class="
          selectedImage === image ? 'border-primary-500' : 'border-transparent'
        "
        @click="selectedImage = image"
      />
    </div>

    <div class="flex-1">
      <img :src="selectedImage" class="w-full h-96 object-cover rounded-lg" />
    </div>
  </div>
</template>
