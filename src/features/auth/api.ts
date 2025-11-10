import { api } from "@/src/lib/api";

export type LoginDto = {
    email: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
};

export async function login ( dto: LoginDto ): Promise<LoginResponse>
{
    const { data } = await api.post( "auth/login", dto, { skipAuth: true } );
    console.log( "login response data:", data );
    return data; // LoginResponse { access_token: string }
}

export async function getUserById ( id: string )
{
    const { data } = await api.get( `users/${id}`, { requireAuth: true } );
    return data;
}