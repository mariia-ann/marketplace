// src/features/auth/queries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/src/state/useAuthStore";
import { getUserById } from "@/src/features/auth/api";
import { api } from "@/src/lib/api";



export function useMe ()
{
    const { userId } = useAuthStore( s => ( { userId: s.userId } ) );
    return useQuery( {
        queryKey: ["me", userId],
        queryFn: () => getUserById( userId! ),
        enabled: !!userId,
        staleTime: 60_000,
        refetchOnMount: "always",
    } );
}

export function useLogin ()
{
    const qc = useQueryClient();
    const setToken = useAuthStore( s => s.setToken );
    const setUserId = useAuthStore( s => s.setUserId );

    const parseJwt = ( t: string ) =>
    {
        try {
            const b = t.split( "." )[1].replace( /-/g, "+" ).replace( /_/g, "/" );
            const j = decodeURIComponent( atob( b ).split( "" ).map( c => "%" + ( "00" + c.charCodeAt( 0 ).toString( 16 ) ).slice( -2 ) ).join( "" ) );
            return JSON.parse( j );
        } catch { return {}; }
    };

    return useMutation( {
        mutationFn: async ( dto: { email: string; password: string; } ) =>
        {
            const { data } = await api.post( "auth/login", dto, { skipAuth: true } );
            return data as { access_token: string; };
        },
        onSuccess: ( { access_token } ) =>
        {
            setToken( access_token );
            const p = parseJwt( access_token );
            const uid = p?.userId ?? p?.uid ?? p?.sub ?? null;
            setUserId( uid );
            qc.invalidateQueries( { queryKey: ["me"] } );
        },
    } );
}

export function useLogout ()
{
    const qc = useQueryClient();
    const signOut = useAuthStore( s => s.signOut );
    return () =>
    {
        signOut();
        qc.removeQueries( { queryKey: ["me"] } );
        qc.clear();
    };
}