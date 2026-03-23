import type { Category } from "../models/category.model";
import api from "./api";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get(`/products/categories`);
  return data;
}

export async function getCategoryList() {
  const { data } = await api.get(`/products/category-list`);
  return data;
}
