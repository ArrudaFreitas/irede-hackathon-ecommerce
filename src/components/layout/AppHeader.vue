<template>
  <header class="border-b">
    <!-- Linha principal -->
    <div class="flex items-center gap-4 px-4 py-3">

      <!-- Logo (só desktop) -->
      <RouterLink to="/" class="hidden md:block text-xl font-bold text-primary shrink-0">
        iRede
      </RouterLink>

      <!-- Busca (só desktop) -->
      <div class="hidden md:flex flex-1">
        <IconField class="w-full">
          <InputIcon>
            <Icon icon="mdi:magnify" />
          </InputIcon>
          <InputText placeholder="Buscar produtos..." class="w-full" />
        </IconField>
      </div>

      <!-- Ações desktop -->
      <div class="hidden md:flex items-center gap-2 shrink-0">
        <div class="flex items-center gap-1 cursor-pointer">
          <Icon icon="mdi:account-outline" class="text-2xl" />
          <span class="text-sm">Usuário</span>
        </div>
        <Button severity="secondary" text rounded>
          <Icon icon="mdi:heart-outline" class="text-xl" />
        </Button>
        <Button severity="secondary" text rounded>
          <Icon icon="mdi:cart-outline" class="text-xl" />
        </Button>
      </div>

      <!-- Mobile -->
      <div class="flex md:hidden items-center gap-1 w-full">
        <RouterLink to="/" class="text-sm font-bold text-primary shrink-0">
          iRede
        </RouterLink>
        <div class="flex-1 mx-1">
          <IconField>
            <InputIcon>
              <Icon icon="mdi:magnify" class="text-sm" />
            </InputIcon>
            <InputText placeholder="Buscar..." class="w-full !text-sm !py-1 !pl-8 !pr-2" size="small" />
          </IconField>
        </div>
        <Button severity="secondary" text rounded class="!p-1" @click="menuAberto = !menuAberto">
          <Icon icon="mdi:menu" class="text-lg" />
        </Button>
        <Button severity="secondary" text rounded class="!p-1">
          <Icon icon="mdi:cart-outline" class="text-lg" />
        </Button>
      </div>

    </div>

    <!-- Categorias (só desktop) — fora da div principal -->
    <nav class="hidden md:flex items-center gap-1 px-4 py-1 border-t overflow-x-auto">
      <Button
        v-for="cat in categorias"
        :key="cat"
        :label="cat"
        severity="secondary"
        text
        size="small"
      />
    </nav>

    <!-- Menu sanduíche mobile — fora da div principal -->
    <div v-if="menuAberto" class="md:hidden border-t">
      <div class="flex flex-col">
        <Button
          v-for="cat in categorias"
          :key="cat"
          :label="cat"
          severity="secondary"
          text
          class="justify-start"
        />
        <Divider />
        <Button label="Favoritos" severity="secondary" text class="justify-start">
          <template #icon>
            <Icon icon="mdi:heart-outline" class="mr-2" />
          </template>
        </Button>
        <Button label="Minha conta" severity="secondary" text class="justify-start">
          <template #icon>
            <Icon icon="mdi:account-outline" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { Icon } from '@iconify/vue'

const menuAberto = ref(false)

const categorias = [
  'Eletrônicos',
  'Moda',
  'Casa',
  'Esporte',
  'Beleza',
  'Brinquedos',
  'Livros',
  'Automotivo',
]
</script>