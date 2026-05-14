function readApiBaseUrl() {
  const rawUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (!rawUrl) {
    throw new Error('Missing EXPO_PUBLIC_API_URL');
  }

  const url = new URL(rawUrl);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('EXPO_PUBLIC_API_URL must use HTTP or HTTPS');
  }

  if (!url.pathname.endsWith('/')) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}

export const env = {
  apiBaseUrl: readApiBaseUrl(),
};
