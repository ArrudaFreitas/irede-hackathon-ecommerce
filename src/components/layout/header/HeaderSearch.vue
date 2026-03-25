<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";

import { Icon } from "@iconify/vue";

const props = defineProps<{
    placeholder?: string;
    size?: "small" | "large" | undefined;
}>();

const router = useRouter();
const searchQuery = ref("");

function search() {
    const q = searchQuery.value.trim();
    if (!q) return;

    router.push({
        name: "products",
        query: { q }
    });
}
</script>

<template>
    <IconField class="w-full">
        <InputIcon>
            <Icon icon="mdi:magnify" />
        </InputIcon>

        <InputText v-model="searchQuery" :placeholder="placeholder || 'Buscar produtos...'" class="w-full" :size="size"
            @keyup.enter="search" />
    </IconField>
</template>