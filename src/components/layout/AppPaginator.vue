<script setup lang="ts">
import Paginator from "primevue/paginator";

defineProps<{
    total: number;
    rows: number;
    first: number;
}>();

const emit = defineEmits<{
    (e: "page-change", event: { first: number; rows: number }): void;
}>();
</script>

<template>
    <div v-if="total > rows" class="paginator-wrapper">
        <Paginator :rows="rows" :totalRecords="total" :first="first" :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        }" @page="emit('page-change', $event)" />
    </div>
</template>

<style scoped>
.paginator-wrapper {
    margin-top: 48px;
    display: flex;
    justify-content: center;
}
</style>