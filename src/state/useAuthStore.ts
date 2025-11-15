import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
    token: string | null;
    userId: string | null;
    isRestoring: boolean;
    setToken: ( t: string | null ) => void;
    setUserId: ( id: string | null ) => void;
    signOut: () => void;
    getToken: () => string | null;
    getUserId: () => string | null;
    setRestoring: ( v: boolean ) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        ( set, get ) => ( {
            token: null,
            userId: null,
            isRestoring: true,
            setToken: ( t ) => set( { token: t } ),
            setUserId: ( id ) => set( { userId: id } ),
            signOut: () => set( { token: null, userId: null } ),
            getToken: () => get().token,
            getUserId: () => get().userId,
            setRestoring: ( v ) => set( { isRestoring: v } ),
        } ),
        {
            name: "auth-store",
            storage: createJSONStorage( () => AsyncStorage ),
            partialize: ( s ) => ( { token: s.token, userId: s.userId } ),
            onRehydrateStorage: () => ( state ) =>
            {
                state?.setRestoring( false );
            },
        }
    )
);