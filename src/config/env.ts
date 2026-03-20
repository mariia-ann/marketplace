function readApiBaseUrl() {
  const rawUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (!rawUrl) {
    throw new Error('Missing EXPO_PUBLIC_API_URL');
  }

  const url = new URL(rawUrl);

  const isLocalHost =
    url.hostname === 'localhost' ||
    url.hostname.endsWith('.local') ||
    /^127\./.test(url.hostname) ||
    /^10\./.test(url.hostname) ||
    /^192\.168\./.test(url.hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(url.hostname);

  if (url.protocol !== 'https:' && !(__DEV__ && isLocalHost)) {
    throw new Error(
      'EXPO_PUBLIC_API_URL must use HTTPS outside local development',
    );
  }

  if (!url.pathname.endsWith('/')) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}

export const env = {
  apiBaseUrl: readApiBaseUrl(),
};
