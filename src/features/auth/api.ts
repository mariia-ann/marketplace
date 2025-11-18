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
    return data; // LoginResponse { access_token: string }
}

export async function getUserById ( id: string )
{   
    console.warn( 'inside api.ts from getUserById', id );
    const { data } = await api.get( `users/${id}`, { requireAuth: true } );
    return data;
}

export async function logout ()
{
    const { data } = await api.post( "auth/logout", {}, { requireAuth: true } );
    return data;
}