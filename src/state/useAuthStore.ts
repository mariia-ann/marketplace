import { create } from 'zustand';

type AuthState = {
  access_token: string | null;
  access_token_expireAt: Date | null;
  userId: string | null;
  isRestoring: boolean;
  setToken: (t: string | null) => void;
  setUserId: (id: string | null) => void;
  setAccessTokenExpireAt: (expireAt: Date | null) => void;
  getAccessTokenExpireAt: () => Date | null;
  onSignOut: () => void;
  getToken: () => string | null;
  getUserId: () => string | null;
  setRestoring: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  access_token: null,
  access_token_expireAt: null,
  userId: null,
  isRestoring: true,
  setToken: (t) => set({ access_token: t }),
  setUserId: (id) => set({ userId: id }),
  setAccessTokenExpireAt: (expireAt: Date | null) =>
    set({ access_token_expireAt: expireAt }),
  getAccessTokenExpireAt: () => get().access_token_expireAt,
  onSignOut: () =>
    set({ access_token: null, userId: null, access_token_expireAt: null }),
  getToken: () => get().access_token,
  getUserId: () => get().userId,
  setRestoring: (v) => set({ isRestoring: v }),
}));
