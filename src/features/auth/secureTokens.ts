import * as SecureStore from 'expo-secure-store';

/** Stable device key; passwords, OTPs, and access tokens are never stored here. */
const REFRESH_TOKEN_KEY = 'marketplace.refreshToken';

/** Persists the latest refresh token after session creation or token rotation. */
export async function saveRefreshToken(token: string) {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

/** Reads the session credential used to restore the app after restart. */
export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

/** Removes the device credential on logout or an invalid/expired session. */
export async function clearRefreshToken() {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
