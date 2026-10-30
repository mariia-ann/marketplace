import axios, {
  AxiosError,
  CanceledError,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '@/src/state/useAuthStore';
import { router } from 'expo-router';
import { env } from '@/src/config/env';
import {
  clearRefreshToken,
  getRefreshToken,
  saveRefreshToken,
} from '@/src/features/auth/secureTokens';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
    requireAuth?: boolean;
  }
}

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
});

// separate instance without interceptors for token refresh to avoid infinite loop
export const refreshApi = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
});

// access token life span left before we attempt refresh.
export const TOKEN_REFRESH_THRESHOLD = 60_000; // 1 minute

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  // Public form checks and signup must not depend on refreshing an older session.
  if (config.skipAuth) return config;
  let token = useAuthStore.getState().access_token;
  const expireAtMs = useAuthStore.getState().access_token_expireAt
    ? new Date(useAuthStore.getState().access_token_expireAt as Date).getTime()
    : null;
  // Check if token is expiring soon and proactively refresh it before making the API call
  const expiringSoon =
    !!expireAtMs && Date.now() >= expireAtMs - TOKEN_REFRESH_THRESHOLD;
  if (token && expiringSoon) {
    await refreshAccessTokenOnce(); // single-flight function you already have
    token = useAuthStore.getState().access_token;
  }

  if (__DEV__) {
    console.warn(
      `[${config.method?.toUpperCase()}] ${config.baseURL}${config.url} ` +
        (config.skipAuth
          ? '(skipAuth)'
          : config.requireAuth
            ? '(requireAuth)'
            : token
              ? '(with token)'
              : '(guest)'),
    );
  }
  // 2) Optional auth: attach if we have it
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.requireAuth) {
    // 3) Hard opt-in: this call MUST have auth → abort early
    const err = new CanceledError('AUTH_REQUIRED');
    // You can also throw a custom error object if you prefer
    throw err;
  }
  return config;
});

// RESPONSE INTERCEPTOR (optional QoL)
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = (error.config || {}) as InternalAxiosRequestConfig & {
      _retry?: boolean;
      skipAuth?: boolean;
    };

    const is401 = error.response?.status === 401;
    const isRefreshCall = original.url?.includes('auth/refresh');

    if (!is401 || original._retry || original.skipAuth || isRefreshCall) {
      return Promise.reject(error);
    }

    try {
      const newToken = await refreshAccessTokenOnce();
      original._retry = true;
      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch {
      await clearRefreshToken();
      useAuthStore.getState().onSignOut();
      router.replace('/auth/login');
      return Promise.reject(error);
    }
  },
);

// Share one refresh request so concurrent API calls cannot reuse a rotated refresh token.
let refreshPromise: Promise<string> | null = null;

/** Exchanges JSON tokens and saves the replacement refresh token in device secure storage. */
function refreshAccessTokenOnce(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = getRefreshToken()
      .then((refreshToken) => {
        if (!refreshToken) throw new Error('No refresh token is stored');
        return refreshApi.post('auth/refresh', { refreshToken });
      })
      .then(async (res) => {
        const token = res.data.accessToken;
        useAuthStore.getState().applyAccessToken(token);
        if (res.data.registrationState) {
          useAuthStore
            .getState()
            .setRegistrationState(res.data.registrationState);
          if (res.data.registrationState.accountStatus === 'EXPIRED')
            await clearRefreshToken();
        }
        if (typeof res.data.refreshToken === 'string')
          await saveRefreshToken(res.data.refreshToken);
        if (res.data.registrationState?.accountStatus === 'EXPIRED') {
          throw new Error('Registration session expired');
        }
        return token;
      })
      .catch(async (error) => {
        const registrationExpired =
          useAuthStore.getState().registrationState?.accountStatus ===
          'EXPIRED';
        await clearRefreshToken();
        useAuthStore.getState().onSignOut();
        if (registrationExpired) {
          useAuthStore.getState().setRegistrationState({
            accountStatus: 'EXPIRED',
            accountType: 'buyer',
            contacts: { email: 'MISSING', phone: 'MISSING' },
            contactHints: { email: null, phone: null },
            requiredContactChannels: [],
            removedContactChannels: [],
            nextAction: 'ADD_CONTACT',
            expiresAt: null,
          });
        }
        router.replace(registrationExpired ? '/auth/signup' : '/auth/login');
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}
