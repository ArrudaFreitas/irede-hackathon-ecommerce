import { ref } from "vue";
import { getCategories } from "@/services/category.service";
import type { Category } from "@/models/category.model";

const categories = ref<Category[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
let loaded = false;

export function useCategories() {
    async function fetchCategories() {
        if (loaded) return;

        loading.value = true;
        error.value = null;

        try {
            categories.value = await getCategories();
            loaded = true;
        } catch (e) {
            error.value = "Erro ao carregar categorias";
        } finally {
            loading.value = false;
        }
    }

    return {
        categories,
        loading,
        error,
        fetchCategories,
    };
}