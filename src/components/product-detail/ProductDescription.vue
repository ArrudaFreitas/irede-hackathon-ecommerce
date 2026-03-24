<script setup lang="ts">
defineProps<{
  description: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <Divider />
    <h2 class="text-lg font-semibold">Descrição do produto</h2>
    <p class="text-gray-600 leading-relaxed">{{ description }}</p>
  </div>
</template>
