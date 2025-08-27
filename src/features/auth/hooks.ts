import { api } from '@/src/lib/api';
import { useAuth } from '@/src/stores/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Credentials = { email: string; password: string; };

export function useRegister ()
{
    const setSession = useAuth( s => s.setSession );
    return useMutation( {
        mutationFn: async ( input: Credentials ) =>
        {
            const { data } = await api.post( '/auth/register', input );
            // expect: { user, accessToken, refreshToken }
            return data as { user: any; accessToken: string; refreshToken: string; };
        },
        onSuccess: ( data ) => setSession( {
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        } ),
    } );
}

export function useLogin ()
{
    const setSession = useAuth( s => s.setSession );
    return useMutation( {
        mutationFn: async ( input: Credentials ) =>
        {
            const { data } = await api.post( '/auth/login', input );
            // expect: { user, accessToken, refreshToken }
            return data as { user: any; accessToken: string; refreshToken: string; };
        },
        onSuccess: ( data ) => setSession( {
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        } ),
    } );
}

export function useLogout ()
{
    const qc = useQueryClient();
    const clearSession = useAuth( s => s.clearSession );
    return useMutation( {
        mutationFn: async () => { try { await api.post( '/auth/logout' ); } catch { } },
        onSettled: () => { clearSession(); qc.clear(); },
    } );
}