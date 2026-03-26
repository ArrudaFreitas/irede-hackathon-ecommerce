import api from './api'
import type { Cart, CartsResponse } from '../models/cart.model'

export async function getCartsByUser(userId: number): Promise<CartsResponse> {
    const { data } = await api.get(`/carts/user/${userId}`)
    return data
}

export async function getCartById(cartId: number): Promise<Cart> {
    const { data } = await api.get(`/carts/${cartId}`)
    return data
}

export async function createCart(userId: number, products: { id: number; quantity: number }[]): Promise<Cart> {
    const { data } = await api.post('/carts/add', { userId, products })
    return data
}

export async function updateCart(cartId: number, products: { id: number; quantity: number }[]): Promise<Cart> {
    const { data } = await api.put(`/carts/${cartId}`, {
        merge: true,
        products,
    })
    return data
}