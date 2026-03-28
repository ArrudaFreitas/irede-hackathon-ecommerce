<script setup lang="ts">
import { computed, ref } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Textarea from "primevue/textarea";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";

type PaymentMethod = "pix" | "card" | "boleto";

const cart = useCartStore();
const auth = useAuthStore();
const toast = useToast();

const showCheckout = ref(false);
const isSubmitting = ref(false);
const validationError = ref("");
const form = ref({
  customerName: "",
  email: "",
  address: "",
  paymentMethod: "pix" as PaymentMethod,
});

const paymentOptions: Array<{
  value: PaymentMethod;
  label: string;
  description: string;
}> = [
  {
    value: "pix",
    label: "Pix",
    description: "Aprovação imediata com confirmação instantânea.",
  },
  {
    value: "card",
    label: "Cartão de crédito",
    description: "Pagamento em até 3x sem juros.",
  },
  {
    value: "boleto",
    label: "Boleto",
    description: "Compensação em até 2 dias úteis.",
  },
];

const selectedPaymentLabel = computed(
  () =>
    paymentOptions.find((option) => option.value === form.value.paymentMethod)
      ?.label ?? "Pix",
);

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function resetForm() {
  form.value = {
    customerName: auth.fullName || "",
    email: auth.user?.email || "",
    address: "",
    paymentMethod: "pix",
  };
}

function openCheckout() {
  if (cart.items.length === 0) return;
  resetForm();
  validationError.value = "";
  showCheckout.value = true;
}

function closeCheckout() {
  if (isSubmitting.value) return;
  showCheckout.value = false;
  validationError.value = "";
}

function validateForm() {
  if (!form.value.customerName.trim()) {
    validationError.value = "Informe o nome para finalizar a compra.";
    return false;
  }

  if (!form.value.email.trim() || !form.value.email.includes("@")) {
    validationError.value =
      "Informe um e-mail válido para receber a confirmação.";
    return false;
  }

  if (!form.value.address.trim()) {
    validationError.value = "Informe um endereço de entrega.";
    return false;
  }

  validationError.value = "";
  return true;
}

async function handleCheckout() {
  if (!validateForm()) return;

  isSubmitting.value = true;

  await new Promise((resolve) => window.setTimeout(resolve, 900));

  const orderId = `PED-${Date.now().toString().slice(-6)}`;

  cart.clearCart();
  isSubmitting.value = false;
  showCheckout.value = false;
  resetForm();

  toast.add({
    severity: "success",
    summary: "Compra confirmada",
    detail: `${selectedPaymentLabel.value} aprovado para o pedido ${orderId}.`,
    life: 4000,
  });
}
</script>

<template>
  <div
    class="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 sticky top-4"
  >
    <h2 class="text-lg font-semibold text-gray-800">Resumo da compra</h2>

    <Divider class="!my-0" />

    <div class="flex flex-col gap-2 text-sm text-gray-700">
      <div class="flex justify-between">
        <span> Produtos ({{ cart.totalItems }}) </span>
        <div class="flex items-center gap-2">
          <span class="line-through text-gray-400">
            {{ formatCurrency(cart.subtotal) }}
          </span>
          <span class="font-medium text-gray-800">
            {{ formatCurrency(cart.total) }}
          </span>
        </div>
      </div>

      <div class="flex justify-between text-green-600 font-medium">
        <span>Desconto</span>
        <span>- {{ formatCurrency(cart.totalDiscount) }}</span>
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
        {{ formatCurrency(cart.total) }}
      </span>
    </div>

    <Button
      label="Finalizar compra"
      class="w-full !font-semibold"
      size="large"
      @click="openCheckout"
    />

    <Button
      label="Limpar carrinho"
      severity="danger"
      text
      class="w-full !text-sm"
      @click="cart.clearCart()"
    />
  </div>

  <Dialog
    :visible="showCheckout"
    modal
    header="Checkout de Compra"
    :style="{ width: 'min(92vw, 38rem)' }"
    :draggable="false"
    :closable="!isSubmitting"
    :dismissableMask="!isSubmitting"
    @update:visible="closeCheckout"
  >
    <div class="flex flex-col gap-5 pt-2">
      <Message v-if="validationError" severity="warn" :closable="false">
        {{ validationError }}
      </Message>

      <div class="grid gap-3 sm:grid-cols-2">
        <div class="flex flex-col gap-1 sm:col-span-2">
          <label for="checkout-name" class="text-sm font-medium text-gray-700">
            Nome completo
          </label>
          <InputText
            id="checkout-name"
            v-model="form.customerName"
            readonly
            :disabled="isSubmitting"
          />
        </div>

        <div class="flex flex-col gap-1 sm:col-span-2">
          <label for="checkout-email" class="text-sm font-medium text-gray-700">
            E-mail
          </label>
          <InputText
            id="checkout-email"
            v-model="form.email"
            type="email"
            readonly
            :disabled="isSubmitting"
          />
        </div>

        <div class="flex flex-col gap-1 sm:col-span-2">
          <label
            for="checkout-address"
            class="text-sm font-medium text-gray-700"
          >
            Endereço de entrega
          </label>
          <Textarea
            id="checkout-address"
            v-model="form.address"
            autoResize
            rows="3"
            placeholder="Rua, número, bairro e referência."
            :disabled="isSubmitting"
          />
          <small class="text-gray-500">
            Nome e e-mail foram preenchidos com os dados da sua conta.
          </small>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-sm font-medium text-gray-700"
          >Forma de pagamento</span
        >
        <div class="grid gap-2">
          <label
            v-for="option in paymentOptions"
            :key="option.value"
            class="border rounded-xl px-4 py-3 transition-colors cursor-pointer"
            :class="
              form.paymentMethod === option.value
                ? 'border-slate-800 bg-slate-50'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div class="flex items-start gap-3">
              <input
                v-model="form.paymentMethod"
                :value="option.value"
                type="radio"
                name="payment-method"
                class="mt-1"
                :disabled="isSubmitting"
              />
              <div>
                <p class="font-medium text-gray-900">{{ option.label }}</p>
                <p class="text-sm text-gray-500">{{ option.description }}</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div
        class="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col gap-2"
      >
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>Itens</span>
          <span>{{ cart.totalItems }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>Pagamento</span>
          <span>{{ selectedPaymentLabel }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>Frete</span>
          <span class="text-green-600 font-medium">Grátis</span>
        </div>
        <Divider class="!my-1" />
        <div
          class="flex items-center justify-between text-base font-semibold text-gray-900"
        >
          <span>Total</span>
          <span>{{ formatCurrency(cart.total) }}</span>
        </div>
      </div>

      <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <Button
          label="Cancelar"
          severity="secondary"
          text
          :disabled="isSubmitting"
          @click="closeCheckout"
        />
        <Button
          label="Confirmar compra"
          :loading="isSubmitting"
          @click="handleCheckout"
        />
      </div>
    </div>
  </Dialog>
</template>
