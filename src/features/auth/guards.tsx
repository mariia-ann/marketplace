// src/features/auth/guards.tsx
import { Redirect, Slot } from 'expo-router';
import type { Href } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '@/src/state/useAuthStore';
import { useMe } from '@/src/features/auth/hooks';
import { refreshApi } from '@/assets/lib/api';
import {
  clearRefreshToken,
  getRefreshToken,
  saveRefreshToken,
} from './secureTokens';

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

/** Restores active or pending sessions from secure storage and the latest backend state. */
export async function bootstrapAuth() {
  const s = useAuthStore.getState();
  s.setRestoring(true);
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      s.onSignOut();
      return;
    }
    const { data } = await refreshApi.post('auth/refresh', { refreshToken });
    s.applyAccessToken(data?.accessToken ?? null);
    if (typeof data?.refreshToken === 'string')
      await saveRefreshToken(data.refreshToken);
    const state = data?.registrationState;
    s.setRegistrationState(state ?? null);
    if (state?.accountStatus === 'EXPIRED') await clearRefreshToken();
    if (state?.accountStatus === 'PENDING_VERIFICATION') {
      s.setVerification({
        email: state.contactHints.email,
        phone: state.contactHints.phone,
        isEmailValidated: state.contacts.email === 'VERIFIED',
        isPhoneValidated: state.contacts.phone === 'VERIFIED',
        source: 'signup',
      });
    } else {
      s.clearVerification();
    }
  } catch {
    await clearRefreshToken();
    s.onSignOut();
  } finally {
    s.setRestoring(false);
  }
}

/** Allow only authenticated users; otherwise redirect to login */
export function RequireAuth({ to = '/auth/login', children }: GuardProps) {
  const token = useAuthStore((s) => s.access_token);
  const registrationState = useAuthStore((s) => s.registrationState);
  // if (token) console.warn('>>> RequireAuth: token is present, allowing access');
  if (!token) return <Redirect href={to} />;
  if (registrationState?.accountStatus === 'PENDING_VERIFICATION') {
    return <Redirect href='/auth/signup-otp' />;
  }

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
  const registrationState = useAuthStore((s) => s.registrationState);
  if (token && registrationState?.accountStatus === 'PENDING_VERIFICATION') {
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
  const registrationState = useAuthStore((s) => s.registrationState);
  if (token && registrationState?.accountStatus !== 'PENDING_VERIFICATION') {
    return <Redirect href={to} />;
  }

  return children ? <>{children}</> : <Slot />;
}
