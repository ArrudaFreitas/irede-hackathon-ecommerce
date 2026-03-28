<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div
    class="flex-1 flex flex-col items-center justify-center gap-6 text-center px-4"
  >
    <p class="text-8xl font-bold text-gray-200">404</p>
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-gray-800">
        Página não encontrada
      </h1>
      <p class="text-gray-500">
        A URL que você acessou não existe ou foi removida.
      </p>
    </div>
    <Button label="Voltar para a home" @click="router.push({ name: 'home' })" />
  </div>
</template>
