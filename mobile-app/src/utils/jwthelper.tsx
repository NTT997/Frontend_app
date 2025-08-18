// utils/jwtToken.ts
import { jwtDecode } from 'jwt-decode';// your existing AsyncStorage helpers
import { getLocalData, setLocalData, removeLocalData } from './helper';
import Constant from './constant';
const TOKEN_KEY = Constant.AUTH_TOKEN;


export interface minimumProfile {
  email: string;
  permissions: string[];
}

export interface Authority {
  authority: string;
}

export interface JwtPayload {
  sub: string;                  // user email / id
  aud: string;                  // audience
  permission: Authority[];      // array of roles/permissions
  exp: number;                  // expiration timestamp (seconds)
  iat?: number;                 // issued at timestamp
}

/**
 * Get JWT token from AsyncStorage
 */
export const getToken = async (): Promise<string | null> => {
  return await getLocalData(TOKEN_KEY);
};

/**
 * Decode JWT token to get payload
 */
export const decodeToken = async (): Promise<JwtPayload | null> => {
  const token = await getToken();
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = async (): Promise<boolean> => {
  const payload = await decodeToken();
  if (!payload) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
};

/**
 * Get user profile from token payload
 */
export const getUserProfileFromToken = async (): Promise<minimumProfile | null> => {
  const payload = await decodeToken();
  if (!payload) return null;

  const expired = await isTokenExpired();
  if (expired) return null;

  // Keep permissions as string array
  const permissions = payload.permission?.map(p => p.authority) || [];

  return {
    email: payload.sub,
    permissions,
  };
};
