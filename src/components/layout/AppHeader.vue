<script setup lang="ts">
import { ref } from "vue";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Popover from "primevue/popover";
import Avatar from "primevue/avatar";
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../../stores/auth.store";
import LoginModal from "../auth/LoginModal.vue";
import { getCategories } from "@/services/category.service";
import { onMounted } from "vue";
import type { Category } from "@/models/category.model";
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore();

const menuAberto = ref(false);
const contaAberta = ref(false); // mobile: expande sub-itens de conta
const showLogin = ref(false);
const popover = ref(); // ref para o Popover do desktop
const categorias = ref<Category[]>([]);
const searchQuery = ref('')
const categoriasAbertas = ref(false)

function search() {
    if (!searchQuery.value.trim()) return
    router.push({ name: 'products', query: { q: searchQuery.value } })
}

function abrirPopover(event: Event) {
    popover.value.toggle(event)
}

function sair() {
    auth.logout()
    popover.value?.hide()
    menuAberto.value = false
}

const scrollRef = ref<HTMLElement | null>(null)

function scrollLeft() {
    scrollRef.value?.scrollBy({ left: -300, behavior: 'smooth' })
}

function scrollRight() {
    scrollRef.value?.scrollBy({ left: 300, behavior: 'smooth' })
}

onMounted(async () => {
    categorias.value = await getCategories();
});
</script>

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
                    <InputText v-model="searchQuery" placeholder="Buscar produtos..." class="w-full"
                        @keyup.enter="search" />
                </IconField>
            </div>

            <!-- Ações desktop -->
            <div class="hidden md:flex items-center gap-2 shrink-0">

                <!-- Usuário deslogado -->
                <div v-if="!auth.isAuthenticated" class="flex items-center gap-1 cursor-pointer"
                    @click="showLogin = true">
                    <Icon icon="mdi:account-outline" class="text-2xl" />
                    <span class="text-sm">Entrar</span>
                </div>

                <!-- Usuário logado -->
                <div v-else class="flex items-center gap-1 cursor-pointer" @click="abrirPopover">
                    <Avatar :image="auth.user!.image" shape="circle" size="small" />
                    <span class="text-sm max-w-24 truncate">{{ auth.fullName }}</span>
                    <Icon icon="mdi:chevron-down" class="text-base opacity-60" />
                </div>

                <!-- Popover desktop -->
                <Popover ref="popover">
                    <div class="flex flex-col gap-1 min-w-36 py-1">
                        <Button label="Detalhes" severity="secondary" text class="justify-start">
                            <template #icon>
                                <Icon icon="mdi:account-circle-outline" class="mr-2" />
                            </template>
                        </Button>
                        <Divider class="my-1" />
                        <Button label="Sair" severity="danger" text class="justify-start" @click="sair">
                            <template #icon>
                                <Icon icon="mdi:logout" class="mr-2" />
                            </template>
                        </Button>
                    </div>
                </Popover>

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

        <!-- Categorias desktop -->
        <div class="hidden md:flex items-center border-t px-2 py-1 gap-2">

            <Button icon="pi pi-chevron-left" text rounded @click="scrollLeft" />

            <nav ref="scrollRef"
                class="flex gap-1 overflow-x-hidden scroll-smooth whitespace-nowrap flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Button v-for="cat in categorias" :key="cat.slug" :label="cat.name" severity="secondary" text
                    size="small" class="shrink-0"
                    @click="$router.push({ name: 'product-by-category', params: { slug: cat.slug } })" />
            </nav>

            <Button icon="pi pi-chevron-right" text rounded @click="scrollRight" />

        </div>

        <!-- Menu sanduíche mobile -->
        <div v-if="menuAberto" class="md:hidden border-t">
            <div class="flex flex-col">

                <!-- Dropdown de Categorias -->
                <Button label="Categorias" severity="secondary" text class="justify-center w-full"
                    @click="categoriasAbertas = !categoriasAbertas">
                    <template #icon>
                        <Icon icon="mdi:shape-outline" class="mr-2" />
                    </template>
                    <template #default>
                        <span class="flex-1 text-left">Categorias</span>
                        <Icon :icon="categoriasAbertas ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                            class="ml-auto opacity-60" />
                    </template>
                </Button>

                <!-- Lista com scroll -->
                <div v-if="categoriasAbertas" class="max-h-48 overflow-y-auto flex flex-col bg-surface-50">
                    <Button v-for="cat in categorias" :key="cat.slug" :label="cat.name" severity="secondary" text
                        class="justify-start pl-8" @click="
                            $router.push({ name: 'product-by-category', params: { slug: cat.slug } });
                        menuAberto = false;
                        " />
                </div>

                <Divider />

                <Button label="Favoritos" severity="secondary" text class="justify-start">
                    <template #icon>
                        <Icon icon="mdi:heart-outline" class="mr-2" />
                    </template>
                </Button>

                <!-- Minha conta mobile -->
                <Button :label="auth.isAuthenticated ? auth.fullName : 'Minha conta'" severity="secondary" text
                    class="justify-start"
                    @click="auth.isAuthenticated ? (contaAberta = !contaAberta) : (showLogin = true)">
                    <template #icon>
                        <Avatar v-if="auth.isAuthenticated" :image="auth.user!.image" shape="circle" size="small"
                            class="mr-2" />
                        <Icon v-else icon="mdi:account-outline" class="mr-2" />
                    </template>
                </Button>

                <!-- Sub-itens mobile (expande quando logado) -->
                <template v-if="auth.isAuthenticated && contaAberta">
                    <Button label="Detalhes" severity="secondary" text class="justify-start pl-8">
                        <template #icon>
                            <Icon icon="mdi:account-circle-outline" class="mr-2" />
                        </template>
                    </Button>
                    <Button label="Sair" severity="danger" text class="justify-start pl-8" @click="sair">
                        <template #icon>
                            <Icon icon="mdi:logout" class="mr-2" />
                        </template>
                    </Button>
                </template>

            </div>
        </div>

        <!-- Modal de login (compartilhado desktop + mobile) -->
        <LoginModal v-model:visible="showLogin" />
    </header>
</template>