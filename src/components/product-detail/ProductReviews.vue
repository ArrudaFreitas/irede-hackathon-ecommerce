<script setup lang="ts">
import type { Review } from "@/models/product.model";

const props = defineProps<{
  reviews: Review[];
}>();

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Divider />
    <h2 class="text-lg font-semibold">Avaliações dos clientes</h2>

    <div class="flex flex-col gap-4">
      <Card v-for="review in reviews" :key="review.reviewerEmail">
        <template #content>
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Avatar
                  :label="review.reviewerName.charAt(0)"
                  shape="circle"
                  class="bg-primary-100 text-primary-700"
                />
                <span class="font-medium">{{ review.reviewerName }}</span>
              </div>
              <span class="text-sm text-gray-400">{{
                formatDate(review.date)
              }}</span>
            </div>

            <Rating :modelValue="review.rating" readonly :cancel="false" />

            <p class="text-gray-600 text-sm leading-relaxed">
              {{ review.comment }}
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
