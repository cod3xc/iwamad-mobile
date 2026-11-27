export type TokenPayload = {
  user_id: string;
  email?: string;
  iat: number;
  exp: number;
};

export function decodeTokenPayload(token: string): TokenPayload {
  const part = token.split('.')[1];
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return JSON.parse(atob(padded));
}
