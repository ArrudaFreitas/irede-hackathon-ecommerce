<script setup lang="ts">
import HeaderDesktop from "@/components/layout/header/HeaderDesktop.vue";
import HeaderMobile from "@/components/layout/header/HeaderMobile.vue";
</script>

<template>
    <header class="border-b">
        <div class="hidden md:block">
            <HeaderDesktop />
        </div>

        <div class="md:hidden">
            <HeaderMobile />
        </div>
    </header>
</template>