import { ref } from "vue";
import type { Product } from "../models/product.model";
import { searchProduct } from "../services/product.service";
import {
  getAllProducts,
  getProductsByCategory,
} from "../services/product.service";

const ITEMS_PER_PAGE = 20;

export function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const total = ref(0);
  const currentPage = ref(0);

  async function fetchProducts(
    skip: number = 0,
    category?: string,
    query?: string,
  ) {
    loading.value = true;
    error.value = null;
    try {
      const response = query
        ? await searchProduct(query)
        : category
          ? await getProductsByCategory(category)
          : await getAllProducts(ITEMS_PER_PAGE, skip);

      products.value = response.products;
      total.value = response.total;
    } catch (e) {
      error.value = "Não foi possível carregar os produtos. Tente novamente.";
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  function onPageChange(event: { first: number; rows: number }) {
    currentPage.value = event.first;
    fetchProducts(event.first);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return {
    products,
    loading,
    error,
    total,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    fetchProducts,
    onPageChange,
  };
}
