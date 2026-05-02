type JwtPayload = {
  userId?: string;
  uid?: string;
  sub?: string;
  exp?: number;
  identityWay?: string;
  [key: string]: unknown;
};

export default function parseJwt(token?: string | null): JwtPayload {
  if (!token) return {};

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return {};

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}
