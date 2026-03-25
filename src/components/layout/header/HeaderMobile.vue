<script setup lang="ts">
import { ref } from "vue";

import HeaderSearch from "@/components/layout/header/HeaderSearch.vue";
import HeaderUserMenu from "@/components/layout/header/HeaderUserMenu.vue";
import HeaderCategories from "@/components/layout/header/HeaderCategories.vue";

import Button from "primevue/button";
import Divider from "primevue/divider";
import { Icon } from "@iconify/vue";

const isMenuOpen = ref(false);
</script>

<template>
    <div>
        <!-- Topo -->
        <div class="flex items-center gap-1 px-4 py-3">
            <RouterLink to="/" class="text-sm font-bold text-primary shrink-0">
                <img src="@/assets/mercado-irede.svg" alt="logo-mercado-irede">
            </RouterLink>

            <div class="flex-1 mx-1">
                <HeaderSearch placeholder="Buscar..." size="small" />
            </div>

            <Button severity="secondary" text rounded class="!p-1" @click="isMenuOpen = !isMenuOpen">
                <Icon icon="mdi:menu" class="text-lg" />
            </Button>

            <Button severity="secondary" text rounded class="!p-1">
                <Icon icon="mdi:cart-outline" class="text-lg" />
            </Button>
        </div>

        <!-- Menu -->
        <div v-if="isMenuOpen" class="border-t">
            <div class="flex flex-col">

                <!-- Categorias -->
                <HeaderCategories mode="mobile" :onNavigate="() => (isMenuOpen = false)" />

                <Divider />

                <Button label="Favoritos" severity="secondary" text class="justify-start">
                    <template #icon>
                        <Icon icon="mdi:heart-outline" class="mr-2" />
                    </template>
                </Button>

                <!-- Usuário -->
                <HeaderUserMenu mode="mobile" />
            </div>
        </div>
    </div>
</template>