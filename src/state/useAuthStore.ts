import { create } from 'zustand';
import parseJwt from '@/src/utils/jwtParse';
import type { VerificationContext } from '@/src/features/auth/verification';

type AuthState = {
  access_token: string | null;
  access_token_expireAt: Date | null;
  userId: string | null;
  isRestoring: boolean;
  verification: VerificationContext | null;
  setToken: (t: string | null) => void;
  setUserId: (id: string | null) => void;
  setAccessTokenExpireAt: (expireAt: Date | null) => void;
  applyAccessToken: (token: string | null) => void;
  getAccessTokenExpireAt: () => Date | null;
  onSignOut: () => void;
  getToken: () => string | null;
  getUserId: () => string | null;
  setRestoring: (v: boolean) => void;
  setVerification: (verification: VerificationContext | null) => void;
  clearVerification: () => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  access_token: null,
  access_token_expireAt: null,
  userId: null,
  isRestoring: true,
  verification: null,
  setToken: (t) => set({ access_token: t }),
  setUserId: (id) => set({ userId: id }),
  setAccessTokenExpireAt: (expireAt: Date | null) =>
    set({ access_token_expireAt: expireAt }),
  applyAccessToken: (token) => {
    if (!token) {
      set({ access_token: null, access_token_expireAt: null, userId: null });
      return;
    }

    const payload = parseJwt(token);
    set({
      access_token: token,
      userId:
        typeof payload.userId === 'string'
          ? payload.userId
          : typeof payload.uid === 'string'
            ? payload.uid
            : typeof payload.sub === 'string'
              ? payload.sub
              : null,
      access_token_expireAt:
        typeof payload.exp === 'number' ? new Date(payload.exp * 1000) : null,
    });
  },
  getAccessTokenExpireAt: () => get().access_token_expireAt,
  onSignOut: () =>
    set({
      access_token: null,
      userId: null,
      access_token_expireAt: null,
      verification: null,
    }),
  getToken: () => get().access_token,
  getUserId: () => get().userId,
  setRestoring: (v) => set({ isRestoring: v }),
  setVerification: (verification) => set({ verification }),
  clearVerification: () => set({ verification: null }),
}));
