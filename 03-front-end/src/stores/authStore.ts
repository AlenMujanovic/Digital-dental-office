import { atom } from 'recoil';
import { IUser } from '../types';

export const authStore = atom<IUser | null>({
  key: 'AUTH_STORE',
  default: null,
});
