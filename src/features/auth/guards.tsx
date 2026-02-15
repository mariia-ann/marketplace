// src/features/auth/guards.tsx
import { Redirect, Slot } from 'expo-router';
import type { Href } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '@/src/state/useAuthStore';
import { useMe } from '@/src/features/auth/hooks';
import { refreshApi } from '@/src/lib/api';
import parseJwt from '@/src/utils/jwtParse';

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
    console.warn(
      '>>> bootstrapAuth got response from refresh endpoint: ',
      data,
    );

    const token = data?.access_token;
    s.setToken(token);

    const p = parseJwt(token);
    s.setUserId(p?.userId ?? p?.uid ?? p?.sub ?? null);
    s.setAccessTokenExpireAt(p?.exp ? new Date(p.exp * 1000) : null);
    console.warn(
      'inside bootstrapAuth >>> Token: ',
      useAuthStore.getState().access_token,
      '\nLine >>> UserId: ',
      useAuthStore.getState().userId,
    );
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
  const { data: me, isLoading } = useMe();
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
  if (token) return <Redirect href={to} />;

  return children ? <>{children}</> : <Slot />;
}
