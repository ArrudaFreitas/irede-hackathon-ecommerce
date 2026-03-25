<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Popover from "primevue/popover";
import Avatar from "primevue/avatar";
import { Icon } from "@iconify/vue";

import { useAuthStore } from "@/stores/auth.store";

const props = defineProps<{
    mode?: "desktop" | "mobile";
}>();

const auth = useAuthStore();

const isAccountOpen = ref(false);
const popoverRef = ref();

function togglePopover(event: Event) {
    popoverRef.value?.toggle(event);
}

function logout() {
    auth.logout();
    popoverRef.value?.hide();
}
</script>

<template>
    <!-- DESKTOP -->
    <template v-if="mode !== 'mobile'">
        <!-- Deslogado -->
        <div v-if="!auth.isAuthenticated" class="flex items-center gap-1 cursor-pointer" @click="auth.openLoginModal()">
            <Icon icon="mdi:account-outline" class="text-2xl" />
            <span class="text-sm">Entrar</span>
        </div>

        <!-- Logado -->
        <div v-else class="flex items-center gap-1 cursor-pointer" @click="togglePopover">
            <Avatar :image="auth.user!.image" shape="circle" size="small" />
            <span class="text-sm max-w-24 truncate">
                {{ auth.fullName }}
            </span>
            <Icon icon="mdi:chevron-down" class="text-base opacity-60" />
        </div>

        <!-- Popover -->
        <Popover ref="popoverRef">
            <div class="flex flex-col gap-1 min-w-36 py-1">
                <Button label="Detalhes" severity="secondary" text class="justify-start">
                    <template #icon>
                        <Icon icon="mdi:account-circle-outline" class="mr-2" />
                    </template>
                </Button>

                <Divider class="my-1" />

                <Button label="Sair" severity="danger" text class="justify-start" @click="logout">
                    <template #icon>
                        <Icon icon="mdi:logout" class="mr-2" />
                    </template>
                </Button>
            </div>
        </Popover>
    </template>

    <!-- MOBILE -->
    <template v-else>
        <Button :label="auth.isAuthenticated ? auth.fullName : 'Minha conta'" severity="secondary" text
            class="justify-start" @click="
                auth.isAuthenticated
                    ? (isAccountOpen = !isAccountOpen)
                    : auth.openLoginModal()
                ">
            <template #icon>
                <Avatar v-if="auth.isAuthenticated" :image="auth.user!.image" shape="circle" size="small"
                    class="mr-2" />
                <Icon v-else icon="mdi:account-outline" class="mr-2" />
            </template>
        </Button>

        <!-- Submenu -->
        <template v-if="auth.isAuthenticated && isAccountOpen">
            <Button label="Detalhes" severity="secondary" text class="justify-start pl-8">
                <template #icon>
                    <Icon icon="mdi:account-circle-outline" class="mr-2" />
                </template>
            </Button>

            <Button label="Sair" severity="danger" text class="justify-start pl-8" @click="logout">
                <template #icon>
                    <Icon icon="mdi:logout" class="mr-2" />
                </template>
            </Button>
        </template>
    </template>
</template>