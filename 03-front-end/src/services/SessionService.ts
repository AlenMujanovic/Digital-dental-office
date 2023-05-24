import jwt_decode, { JwtPayload } from 'jwt-decode';
import { IUser } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const getSessionFromStorage = () => {
  try {
    const session = localStorage.getItem('DentalOfficeUserSession');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.log('🚀 ~ file: SessionService.ts ~ getSessionFromStorage ~ error:', error);
  }
};

const saveSession = (user: IUser, token: string) => {
  try {
    if (user) {
      localStorage.setItem('DentalOfficeUser', JSON.stringify(user));
    }

    if (token) {
      localStorage.setItem('DentalOfficeUserSession', JSON.stringify(token));
    }
  } catch (error) {
    console.log('🚀 ~ file: SessionService.ts ~ saveSession ~ error:', error);
  }
};

const getProfileFromStorage = () => {
  try {
    const user = localStorage.getItem('DentalOfficeUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log('🚀 ~ file: SessionService.ts ~ getProfile ~ error:', error);
  }
};

const clearSession = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log('🚀 ~ file: SessionService.ts ~ clearSession ~ error:', error);
  }
};

/**
 * Check if current user session is valid
 * @returns {Promise<boolean>}
 */
const isSessionValid = () => {
  try {
    const token = getSessionFromStorage();

    if (token) {
      const decodedJWT: JwtPayload = jwt_decode(token);
      const expirationEpoh = decodedJWT.exp;
      const currentEpoh = new Date().getTime() / 1000;

      if (expirationEpoh && currentEpoh > expirationEpoh) {
        clearSession();
        return false;
      } else {
        return true;
      }
    }
  } catch (error) {
    console.log('🚀 ~ file: SessionService.ts: ~ isSessionValid ~ error:', error);
    return false;
  }
};

/**
 * Refresh auth token
 * @returns
 */
const refreshAuthToken = async () => {
  try {
    const token = await getSessionFromStorage();
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token,
      }),
    });
    return await response.json();
  } catch (error) {
    console.log('🚀 ~ file: SessionService.js ~ refreshAuthToken ~ error', error);
  }
};

export const SessionService = {
  getSessionFromStorage,
  getProfileFromStorage,
  saveSession,
  clearSession,
  isSessionValid,
  refreshAuthToken,
};
