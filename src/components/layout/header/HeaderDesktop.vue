<script setup lang="ts">
import HeaderSearch from "@/components/layout/header/HeaderSearch.vue";
import HeaderUserMenu from "@/components/layout/header/HeaderUserMenu.vue";
import HeaderCategories from "@/components/layout/header/HeaderCategories.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
    <div>
        <!-- Linha principal -->
        <div class="flex items-center gap-4 px-4 py-3">
            <!-- Logo -->
            <RouterLink to="/" class="text-xl font-bold text-primary shrink-0">
                <img src="@/assets/mercado-irede.svg" alt="logo-mercado-irede">
            </RouterLink>

            <!-- Busca -->
            <div class="flex-1">
                <HeaderSearch />
            </div>

            <!-- Ações -->
            <div class="flex items-center gap-2 shrink-0">
                <HeaderUserMenu />

                <Button severity="secondary" text rounded>
                    <Icon icon="mdi:heart-outline" class="text-xl" />
                </Button>

                <Button severity="secondary" text rounded>
                    <Icon icon="mdi:cart-outline" class="text-xl" />
                </Button>
            </div>
        </div>

        <!-- Categorias -->
        <HeaderCategories />
    </div>
</template>