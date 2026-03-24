// composables/useProduct.ts
import { ref } from "vue";
import type { Product } from "@/models/product.model";
import { getProductById } from "@/services/product.service";

export function useProduct() {
  const product = ref<Product | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProduct(id: number) {
    loading.value = true;
    error.value = null;
    try {
      product.value = await getProductById(id);
    } catch (e) {
      error.value = "Não foi possível carregar o produto.";
    } finally {
      loading.value = false;
    }
  }

  return { product, loading, error, fetchProduct };
}
