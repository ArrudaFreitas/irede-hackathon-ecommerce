<script setup lang="ts">
import { ref } from 'vue'
import HeaderSearch from '@/components/layout/header/HeaderSearch.vue'
import HeaderUserMenu from '@/components/layout/header/HeaderUserMenu.vue'
import HeaderCategories from '@/components/layout/header/HeaderCategories.vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useCartStore } from '@/stores/cart.store'
import { useAuthStore } from '@/stores/auth.store'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

function goToWishlist() {
    isMenuOpen.value = false
    router.push('/wishlist')
}
</script>

<template>
    <div>
        <!-- Topo -->
        <div class="flex items-center gap-1 px-4 py-3">
            <RouterLink to="/" class="text-sm font-bold text-primary shrink-0">
                <img src="@/assets/mercado-irede.svg" alt="logo-mercado-irede" />
            </RouterLink>
            <div class="flex-1 mx-1">
                <HeaderSearch placeholder="Buscar..." size="small" />
            </div>
            <Button severity="secondary" text rounded class="!p-1" @click="isMenuOpen = !isMenuOpen">
                <Icon icon="mdi:menu" class="text-lg" />
            </Button>
            <!-- Botão do carrinho mobile com badge -->
            <RouterLink to="/cart" class="relative">
                <Button severity="secondary" text rounded class="!p-1">
                    <Icon icon="mdi:cart-outline" class="text-lg" />
                </Button>
                <span v-if="auth.isAuthenticated && cart.totalItems > 0"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5 pointer-events-none">
                    {{ cart.totalItems > 99 ? '99+' : cart.totalItems }}
                </span>
            </RouterLink>
        </div>

        <!-- Menu -->
        <div v-if="isMenuOpen" class="border-t">
            <div class="flex flex-col">
                <!-- Categorias -->
                <HeaderCategories mode="mobile" :onNavigate="() => (isMenuOpen = false)" />

                <Divider />

                <!-- Favoritos -->
                <Button severity="secondary" text class="justify-center" @click="goToWishlist">
                    <Icon
                        icon="mdi:heart-outline"
                        class="mr-2 text-lg"
                    />
                    <span>Favoritos</span>
                </Button>

                <!-- Usuário -->
                <HeaderUserMenu mode="mobile" />
            </div>
        </div>
    </div>
</template>