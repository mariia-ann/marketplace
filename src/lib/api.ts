import axios, {
  AxiosError,
  CanceledError,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '@/src/state/useAuthStore';
import { router } from 'expo-router';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
    requireAuth?: boolean;
  }
}

// Use localApiUrl if you are running the backend project locally, otherwise use remoteApiUrl for testing with the deployed backend.
// const localApiUrl = 'http://localhost:3000/';
const remoteApiUrl = 'http://34.227.53.16:3000/';

export const api = axios.create({
  baseURL: remoteApiUrl,
  timeout: 15_000,
});

// separate instance without interceptors for token refresh to avoid infinite loop
export const refreshApi = axios.create({
  baseURL: remoteApiUrl,
  timeout: 15_000,
  withCredentials: true,
});

// access token life span left before we attempt refresh.
export const TOKEN_REFRESH_THRESHOLD = 60_000; // 1 minute

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().access_token;
  const expireAtMs = useAuthStore.getState().access_token_expireAt
    ? new Date(useAuthStore.getState().access_token_expireAt as Date).getTime()
    : null;
  // Check if token is expiring soon and proactively refresh it before making the API call
  const expiringSoon =
    !!expireAtMs && Date.now() >= expireAtMs - TOKEN_REFRESH_THRESHOLD;
  console.warn(
    'Token expiring soon:',
    expiringSoon,
    ' expireAtMs:',
    expireAtMs,
    ' now:',
    Date.now(),
  );

  if (token && expiringSoon) {
    console.warn('access token will expire soon, refreshing it');
    await refreshAccessTokenOnce(); // single-flight function you already have
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
  // 1) Hard opt-out (e.g., login/register)
  if (config.skipAuth) return config;

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
  // TODO /by Demidas/ Delete before deploy below is for log purpose only
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
      console.warn(
        'Access token was expired, refreshed and set to: ',
        newToken,
      );
      original._retry = true;
      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch {
      useAuthStore.getState().onSignOut();
      router.replace('/auth/login');
      return Promise.reject(error);
    }
  },
);

// This function ensures that only one refresh request is in-flight at a time, and that all callers receive the new token when it's ready.
let refreshPromise: Promise<string> | null = null;

function refreshAccessTokenOnce(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshApi
      .post('auth/refresh', null)
      .then((res) => {
        const token = res.data.access_token;
        useAuthStore.getState().setToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}
