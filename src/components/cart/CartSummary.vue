<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store'

const cart = useCartStore()
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 sticky top-4">
    <h2 class="text-lg font-semibold text-gray-800">Resumo da compra</h2>

    <Divider class="!my-0" />

    <div class="flex flex-col gap-2 text-sm text-gray-700">
      <div class="flex justify-between">
        <span>
          Produtos ({{ cart.totalItems }})
        </span>
        <div class="flex items-center gap-2">
          <span class="line-through text-gray-400">
            R$ {{ cart.subtotal.toFixed(2) }}
          </span>
          <span class="font-medium text-gray-800">
            R$ {{ cart.total.toFixed(2) }}
          </span>
        </div>
      </div>

      <div class="flex justify-between text-green-600 font-medium">
        <span>Desconto</span>
        <span>- R$ {{ cart.totalDiscount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <span>Frete</span>
        <span class="text-green-600 font-medium">Grátis</span>
      </div>
    </div>

    <Divider class="!my-0" />

    <div class="flex justify-between items-center">
      <span class="text-base font-semibold text-gray-900">Total</span>
      <span class="text-xl font-bold text-gray-900">
        R$ {{ cart.total.toFixed(2) }}
      </span>
    </div>

    <Button
      label="Continuar a compra"
      class="w-full !font-semibold"
      size="large"
      @click=""
    />

    <Button
      label="Limpar carrinho"
      severity="danger"
      text
      class="w-full !text-sm"
      @click="cart.clearCart()"
    />
  </div>
</template>