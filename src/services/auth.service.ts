import api from './api'
import type { LoginCredentials, AuthResponse } from '../models/user.model'

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', credentials)
  return data
}

// DummyAPI não tem endpoint de logout — limpamos só o estado local em ./stores/auth.store.ts