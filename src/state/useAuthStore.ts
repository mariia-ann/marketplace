import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthUser = {
    id: string;
    displayName: string;
    email: string;
    isSeller: boolean;
    isPhoneValidated: boolean;
    isEmailValidated: boolean;
};

type AuthState = {
    token: string | null;
    user: AuthUser | null;
    setToken: ( t: string | null ) => void;
    setUser: ( u: AuthUser | null ) => void;
    signOut: () => void;
    // tiny helper getter so hooks can read token without importing store instance
    getToken: () => string | null;
    getUser: () => AuthUser | null;
};

export const useAuthStore = create<AuthState>()(
    persist(
        ( set, get ) => ( {
            token: null,
            user: null,
            setToken: ( t ) => set( { token: t } ),
            setUser: ( u ) => set( { user: u } ),
            signOut: () => set( { token: null, user: null } ),
            getToken: () => get().token,
            getUser: () => get().user,
        } ),
        {
            name: "auth-store",
            storage: createJSONStorage( () => AsyncStorage ),
            partialize: ( s ) => ( { token: s.token, user: s.user } ),
        }
    )
);