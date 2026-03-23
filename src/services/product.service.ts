import type { Product, ProductsResponse } from "../models/product.model.ts";
import api from "./api";

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function getAllProducts(): Promise<ProductsResponse> {
  const { data } = await api.get(`/products`);
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
  const { data } = await api.get(`\products`, {
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
