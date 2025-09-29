import { useAuth } from "@/src/stores/auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { AuthResponse, Credentials, login, register, RegisterInput } from "./api";

const useSetSession = () =>
{
    const setSession = useAuth( ( s ) => s.setSession );
    return ( data: AuthResponse ) =>
        setSession( {
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        } );
};

export function useLogin ()
{
    const setSession = useSetSession();
    return useMutation<AuthResponse, AxiosError, Credentials>( {
        mutationKey: ["auth", "login"],
        mutationFn: login,
        onSuccess: setSession,
    } );
}

export function useRegisterAndLogin ()
{
    const setSession = useSetSession();
    return useMutation<AuthResponse, AxiosError, RegisterInput>( {
        mutationKey: ["auth", "register-and-login"],
        mutationFn: async ( input ) =>
        {
            await register( input );
            return await login( { name: input.name, email: input.email, phone: input.phone, password: input.password } );
        },
        onSuccess: setSession,
        // retry only network errors if you want:
        retry: ( count, err ) => ( !err.response ? count < 2 : false ),
    } );
}