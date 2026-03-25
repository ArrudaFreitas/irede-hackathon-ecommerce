<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import LoginModal from './components/auth/LoginModal.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <AppHeader />
        <main class="flex-1">
            <RouterView />
        </main>
        <AppFooter />
    </div>

    <LoginModal />
</template>