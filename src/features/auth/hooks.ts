// src/features/auth/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/src/state/useAuthStore';
import {
  getUserById,
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  type SignupDto,
  LoginDto,
} from '@/src/features/auth/api';
import { router } from 'expo-router';

// Decode JWT payload to pull user id. Keep scope local to this module.
const parseJwt = (t: string) => {
  try {
    const b = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const j = decodeURIComponent(
      atob(b)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(j);
  } catch {
    return {};
  }
};

// TODO: /by Demidas/ Move this hook to user hooks once we'll make this feature
/* this hook is used to fetch the current user's data
if it was already fecthed it should not make an api call and just return cached data */
export function useMe() {
  const userId = useAuthStore((s) => s.userId);
  // const { userId } = useAuthStore( s => ( { userId: s.userId } ) );
  // This creates a NEW object { userId: ... } on EVERY render
  // which triggers React Query to think dependencies changed it was the cause of infinite loops.

  return useQuery({
    queryKey: ['me', userId],
    queryFn: async () => {
      // console.warn( ">>> queryFn in useMe is running with userId:", userId );
      return getUserById(userId!);
    },
    enabled: !!userId,
    staleTime: 60_000,
    refetchOnMount: false,
  });
}
/* this hook is used to perform login. it calls login(from auth/api.ts) as loginApi
and on success sets the token and userId in the auth store */
export function useLogin() {
  const qc = useQueryClient();
  const setToken = useAuthStore((s) => s.setToken);
  const setUserId = useAuthStore((s) => s.setUserId);
  const signOut = useAuthStore((s) => s.signOut);

  return useMutation({
    mutationFn: async (dto: LoginDto) => loginApi(dto),
    onSuccess: ({ access_token }) => {
      setToken(access_token);
      const p = parseJwt(access_token);
      const uid = p?.userId ?? p?.uid ?? p?.sub ?? null;
      setUserId(uid);
      qc.invalidateQueries({ queryKey: ['me'] });
    },
    onError: () => {
      console.warn('Login failed');
      // Ensure any stale auth is cleared so guards treat the user as a guest
      const token = useAuthStore.getState().token;
      if (token) signOut();
      qc.removeQueries({ queryKey: ['me'] });
    },
  });
}

/* This hook is used to perform sign up of user. Signup does not return a token; 
after success we log the user in to obtain it. */
export function useSignup() {
  const qc = useQueryClient();
  const signOut = useAuthStore((s) => s.signOut);

  return useMutation({
    mutationFn: async (dto: SignupDto) => {
      const signupRes = await signupApi(dto);
      return signupRes;
    },

    onSuccess: (signupRes, dto) => {
      console.warn('signupRes', signupRes);
      console.warn(dto);
      qc.setQueryData(['signupDto'], dto);
    },
    onError: () => {
      const token = useAuthStore.getState().token;
      if (token) signOut();
      qc.removeQueries({ queryKey: ['me'] });
    },
  });
}

/* this hook is used to perform logout. it calls logout(from auth/api.ts) as logoutApi 
and on success clears the token and userId from the auth store */
export function useLogout() {
  const qc = useQueryClient();
  const signOut = useAuthStore((s) => s.signOut);

  return useMutation({
    mutationFn: async () => logoutApi(),
    onError: (e) => {
      console.log('Logout failed:', e instanceof Error ? e.message : String(e));
    },
    onSettled: () => {
      // Always clear local auth so an expired token can't trap the user.
      console.warn('Settling logout');
      signOut();
      qc.removeQueries({ queryKey: ['me'] });
      qc.clear();
      router.replace('/(main)');
    },
  });
}
