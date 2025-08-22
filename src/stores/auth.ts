import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = { id: string; email: string; name?: string; };

type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    hydrated: boolean;

    setSession: ( p: { user: User; accessToken: string; refreshToken: string; } ) => void;
    clearSession: () => void;
    refreshTokens: () => Promise<string>;  // returns new access token
    bootstrap: () => Promise<void>;
};

export const useAuth = create<AuthState>()(
    persist(
        ( set, get ) => ( {
            user: null,
            accessToken: null,
            refreshToken: null,
            hydrated: false,

            setSession: ( { user, accessToken, refreshToken } ) =>
                set( { user, accessToken, refreshToken } ),

            clearSession: () => set( { user: null, accessToken: null, refreshToken: null } ),

            // Use fetch here to avoid circular dependency with api.ts interceptors
            refreshTokens: async () =>
            {
                const rt = get().refreshToken;
                if ( !rt ) throw new Error( 'No refresh token' );
                const res = await fetch( 'https://teamchallengemarketplacebackend-abxd.onrender.com/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( { refreshToken: rt } ),
                } );
                if ( !res.ok ) throw new Error( 'Refresh failed' );
                const data = await res.json() as { accessToken: string; refreshToken?: string; user?: User; };
                set( {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken ?? rt,
                    user: data.user ?? get().user,
                } );
                return data.accessToken;
            },

            bootstrap: async () =>
            {
                try {
                    if ( get().refreshToken ) await get().refreshTokens();
                } catch {
                    // keep persisted but unauthenticated if refresh fails
                } finally {
                    set( { hydrated: true } );
                }
            },
        } ),
        {
            name: 'auth',
            storage: createJSONStorage( () => AsyncStorage ),
            partialize: ( s ) => ( {
                user: s.user,
                accessToken: s.accessToken,
                refreshToken: s.refreshToken,
            } ),
            onRehydrateStorage: () => ( state ) => state && state.bootstrap(),
        }
    )
);

// static accessor usable outside React (axios interceptors)
export const authStore = { getState: useAuth.getState };