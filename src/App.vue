<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import LoginModal from './components/auth/LoginModal.vue'
import { useAuthStore } from './stores/auth.store'

const auth = useAuthStore()
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