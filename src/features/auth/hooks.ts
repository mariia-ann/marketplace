import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, login, LoginDto, LoginResponse } from "@/src/features/auth/api";
import { AuthUser, useAuthStore } from "@/src/state/useAuthStore";
import parseJwt from "@/src/utils/jwtParse";

export function useLogin ()
{
    const setToken = useAuthStore( ( s ) => s.setToken );
    const setUser = useAuthStore( ( s ) => s.setUser );
    const qc = useQueryClient();

    return useMutation( {
        mutationFn: ( dto: LoginDto ) => login( dto ),
        onSuccess: async ( data: LoginResponse ) =>
        {
            // Save token:
            setToken( data.access_token );
            // Decode JWT to get user ID:
            const { userId } = parseJwt( data.access_token );
            console.log( "Decoded user ID:", userId );
            // Get user info and save to store:
            const me = await qc.fetchQuery( {
                queryKey: ["me"],
                queryFn: () => getUserById( userId ),
            } );

            // Map backend user → store user and save
            const mapped: AuthUser = {
                id: me.id,
                displayName: me.firstName ?? me.email?.split( "@" )[0] ?? "User",
                email: me.email,
                isSeller: me.isSeller,
                isPhoneValidated: me.isPhoneValidated,
                isEmailValidated: me.isEmailValidated ?? false,
            };
            setUser( { ...mapped } );
        },
    } );
}