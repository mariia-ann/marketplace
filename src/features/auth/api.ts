// features/auth/api.ts — pure API helpers (no React here)
import { api } from "@/src/lib/api";

export type Credentials = { name: string; email: string; phone: string; password: string; };
export type AuthResponse = { user: any; accessToken: string; refreshToken: string; };
export type RegisterInput = Credentials & { role?: "buyer" | "seller"; };
export type RegisterResponse = { message?: string; user?: any; }; // whatever your API returns on register

export async function register ( input: RegisterInput ): Promise<RegisterResponse>
{
    const { confirmPassword, ...payload } = input as any; // ensure you don't send confirmPassword
    const { data } = await api.post<RegisterResponse>( "/auth/register", payload );
    return data;
}

export async function login ( input: Credentials ): Promise<AuthResponse>
{
    const { data } = await api.post<AuthResponse>( "/auth/login", input );
    return data;
}