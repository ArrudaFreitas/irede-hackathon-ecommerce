import type { Product, ProductsResponse } from "../models/product.model.ts";
import api from "./api";

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function getAllProducts(limit: number = 30, skip: number = 0): Promise<ProductsResponse> {
  const { data } = await api.get(`/products`, { params: { limit, skip } });
  return data;
}

export async function searchProduct(query: string): Promise<ProductsResponse> {
  const { data } = await api.get(`/products/search`, { params: { q: query } });
  return data;
}

export async function getProductsSortedBy(
  sortBy: string,
  order: "asc" | "desc" = "asc",
): Promise<ProductsResponse> {
  const { data } = await api.get(`/products`, {
    params: { sortBy, order },
  });
  return data;
}

export async function getProductsByCategory(
  categoryName: string,
): Promise<ProductsResponse> {
  const { data } = await api.get(`/products/category/${categoryName}`);
  return data;
}
