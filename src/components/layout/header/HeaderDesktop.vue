<script setup lang="ts">
import HeaderSearch from '@/components/layout/header/HeaderSearch.vue'
import HeaderUserMenu from '@/components/layout/header/HeaderUserMenu.vue'
import HeaderCategories from '@/components/layout/header/HeaderCategories.vue'
import { useCartStore } from '@/stores/cart.store'
import { useAuthStore } from '@/stores/auth.store'
import { Icon } from '@iconify/vue'

const cart = useCartStore()
const auth = useAuthStore()
</script>

<template>
    <div>
        <!-- Linha principal -->
        <div class="flex items-center gap-4 px-4 py-3">
            <!-- Logo -->
            <RouterLink to="/" class="text-xl font-bold text-primary shrink-0">
                <img src="@/assets/mercado-irede.svg" alt="logo-mercado-irede" />
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

                <!-- Botão do carrinho com badge -->
                <RouterLink to="/cart" class="relative">
                    <Button severity="secondary" text rounded>
                        <Icon icon="mdi:cart-outline" class="text-xl" />
                    </Button>
                    <!-- Badge de quantidade -->
                    <span v-if="auth.isAuthenticated && cart.totalItems > 0"
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 pointer-events-none">
                        {{ cart.totalItems > 99 ? '99+' : cart.totalItems }}
                    </span>
                </RouterLink>
            </div>
        </div>

        <!-- Categorias -->
        <HeaderCategories />
    </div>
</template>