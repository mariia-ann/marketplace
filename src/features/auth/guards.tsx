// src/features/auth/guards.tsx
import { Redirect, Slot } from 'expo-router';
import type { Href } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '@/src/state/useAuthStore';
import { useMe } from '@/src/features/auth/hooks';
import { getUserById } from '@/src/features/auth/api';
import { refreshApi } from '@/assets/lib/api';
import {
  buildUserVerificationContext,
  hasPendingVerification,
} from '@/src/features/auth/verification';

function BlockingSplash() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}

export function RestoreGate({ children }: { children?: React.ReactNode }) {
  const isRestoring = useAuthStore((s) => s.isRestoring);
  if (isRestoring) return <BlockingSplash />;
  return <>{children}</>;
}

type GuardProps = {
  to?: Href;
  children?: React.ReactNode;
};

export async function bootstrapAuth() {
  console.warn('bootstrapAuth started');
  const s = useAuthStore.getState();
  s.setRestoring(true);
  try {
    const { data } = await refreshApi.post('auth/refresh', null); // cookie-based
    s.applyAccessToken(data?.accessToken ?? null);
    if (s.userId) {
      const me = await getUserById(s.userId);
      const verification = buildUserVerificationContext(me, 'login');
      if (hasPendingVerification(verification)) {
        s.setVerification(verification);
      } else {
        s.clearVerification();
      }
    }
  } catch (e) {
    console.warn('bootstrapAuth failed:', e);
    s.onSignOut();
  } finally {
    s.setRestoring(false);
  }
}

/** Allow only authenticated users; otherwise redirect to login */
export function RequireAuth({ to = '/auth/login', children }: GuardProps) {
  const token = useAuthStore((s) => s.access_token);
  // if (token) console.warn('>>> RequireAuth: token is present, allowing access');
  if (!token) return <Redirect href={to} />;

  // If used as a layout, render nested routes via Slot; if wrapped, render children.
  return children ? <>{children}</> : <Slot />;
}

/** Alow only users with Seller role, otherwise redirect to a page for profile upgrade. */
export function RequireSeller({
  to = '/(tabs)/profile',
  children,
}: GuardProps) {
  const token = useAuthStore((s) => s.access_token);
  const {
    data: me,
    // isLoading
  } = useMe();
  const isSeller = !!me?.isSeller;
  if (isSeller)
    console.warn('>>> RequireSeller: user is a seller, allowing access');
  if (!token || !isSeller) return <Redirect href={to} />;

  // If used as a layout, render nested routes via Slot; if wrapped, render children.
  return children ? <>{children}</> : <Slot />;
}

/** Allow only guests; otherwise redirect to tabs/home */
export function RequireGuest({ to = '/(tabs)', children }: GuardProps) {
  const token = useAuthStore((s) => s.access_token);
  const verification = useAuthStore((s) => s.verification);
  if (token && hasPendingVerification(verification)) {
    return <Redirect href='/auth/signup-otp' />;
  }
  if (token) return <Redirect href={to} />;

  return children ? <>{children}</> : <Slot />;
}

export function RequireVerificationAccess({
  to = '/(tabs)',
  children,
}: GuardProps) {
  const token = useAuthStore((s) => s.access_token);
  const verification = useAuthStore((s) => s.verification);
  if (token && !hasPendingVerification(verification)) {
    return <Redirect href={to} />;
  }

  return children ? <>{children}</> : <Slot />;
}
