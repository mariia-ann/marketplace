import { api, withAuth } from "@/src/lib/api";
import { useAuthStore } from "../../state/useAuthStore";

export type LoginDto = {
    email: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
};

export async function login ( dto: LoginDto ): Promise<LoginResponse>
{
    const { data } = await api.post( "auth/login", dto );
    console.log( "login response data:", data );
    return data; // LoginResponse { access_token: string }
}

export async function getUserById ( id: string )
{
    const token = useAuthStore.getState().getToken();
    console.log( 'token from store in api ' + token );

    const { data } = await withAuth( token ?? undefined ).get( `users/${id}` );
    return data; // { id, firstName, email, phone, isPhoneValidated, ... }
}