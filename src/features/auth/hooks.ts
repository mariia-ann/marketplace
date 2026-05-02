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
import {
  buildLoginVerificationContext,
  buildSignupVerificationContext,
  hasPendingVerification,
} from '@/src/features/auth/verification';

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
    queryFn: async ({ signal }) => {
      // console.warn('>>> queryFn in useMe is running with userId:', userId);
      return getUserById(userId!, signal);
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
  const signOut = useAuthStore((s) => s.onSignOut);

  return useMutation({
    mutationFn: async (dto: LoginDto) => loginApi(dto),
    onSuccess: async (data, dto) => {
      const auth = useAuthStore.getState();
      auth.applyAccessToken(data.accessToken);

      const verification = await buildLoginVerificationContext(
        data,
        dto,
        auth.userId,
      );

      if (hasPendingVerification(verification)) {
        auth.setVerification(verification);
        qc.removeQueries({ queryKey: ['me'] });
        router.replace('/auth/signup-otp');
        return;
      }

      auth.clearVerification();
      qc.invalidateQueries({ queryKey: ['me'] });
      router.replace('/(tabs)');
    },
    onError: (e) => {
      console.warn(
        'Login failed: ',
        e instanceof Error ? e.message : String(e),
      );
      // Ensure any stale auth is cleared so guards treat the user as a guest
      const token = useAuthStore.getState().access_token;
      if (token) signOut();
      qc.removeQueries({ queryKey: ['me'] });
    },
  });
}

/* This hook is used to perform sign up of user. Signup does not return a token; 
after success we log the user in to obtain it. */
export function useSignup() {
  const qc = useQueryClient();
  const signOut = useAuthStore((s) => s.onSignOut);

  return useMutation({
    mutationFn: async (dto: SignupDto) => {
      const signupRes = await signupApi(dto);
      return signupRes;
    },

    onSuccess: (signupRes, dto) => {
      console.warn('signupRes', signupRes);
      useAuthStore.getState().setVerification(
        buildSignupVerificationContext({
          email: dto.email,
          phone: dto.phone,
        }),
      );
      qc.setQueryData(['signupDto'], dto);
    },
    onError: () => {
      const token = useAuthStore.getState().access_token;
      if (token) signOut();
      qc.removeQueries({ queryKey: ['me'] });
    },
  });
}

/* this hook is used to perform logout. it calls logout(from auth/api.ts) as logoutApi 
and on success clears the token and userId from the auth store */
export function useLogout() {
  const qc = useQueryClient();
  const signOut = useAuthStore((s) => s.onSignOut);

  return useMutation({
    mutationFn: async () => logoutApi(),
    onSuccess: () => {
      signOut();
      qc.clear();
      router.replace('/(main)');
    },
    onError: (e) => {
      signOut();
      qc.clear();
      router.replace('/(main)');
      console.log('Logout failed:', e instanceof Error ? e.message : String(e));
    },
  });
}
