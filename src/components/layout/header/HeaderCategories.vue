<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

import { useCategories } from "@/composables/useCategories";

const props = defineProps<{
    mode?: "desktop" | "mobile";
    onNavigate?: () => void;
}>();

const router = useRouter();
const { categories, fetchCategories } = useCategories();

const scrollRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

onMounted(fetchCategories);

function goToCategory(slug: string) {
    router.push({
        name: "product-by-category",
        params: { slug },
    });

    props.onNavigate?.();
}

function scrollLeft() {
    scrollRef.value?.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
    scrollRef.value?.scrollBy({ left: 300, behavior: "smooth" });
}
</script>

<template>
    <!-- DESKTOP -->
    <template v-if="mode !== 'mobile'">
        <div class="flex items-center border-t px-2 py-1 gap-2">
            <Button icon="pi pi-chevron-left" text rounded @click="scrollLeft" />

            <nav ref="scrollRef" class="flex gap-1 overflow-x-hidden whitespace-nowrap flex-1">
                <Button v-for="cat in categories" :key="cat.slug" :label="cat.name" severity="secondary" text
                    size="small" class="shrink-0" @click="goToCategory(cat.slug)" />
            </nav>

            <Button icon="pi pi-chevron-right" text rounded @click="scrollRight" />
        </div>
    </template>

    <!-- MOBILE -->
    <template v-else>
        <Button label="Categorias" severity="secondary" text class="justify-center w-full" @click="isOpen = !isOpen">
            <template #icon>
                <Icon icon="mdi:shape-outline" class="mr-2" />
            </template>

            <template #default>
                <span class="flex-1 text-left">Categorias</span>
                <Icon :icon="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="ml-auto opacity-60" />
            </template>
        </Button>

        <div v-if="isOpen" class="max-h-48 overflow-y-auto flex flex-col bg-surface-50">
            <Button v-for="cat in categories" :key="cat.slug" :label="cat.name" severity="secondary" text
                class="justify-start pl-8" @click="goToCategory(cat.slug)" />
        </div>
    </template>
</template>