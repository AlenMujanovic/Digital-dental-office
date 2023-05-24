import { ISignIn } from '../pages/SignIn';
import { IUser } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const signIn = async (data: ISignIn): Promise<{ results: IUser; token: string }> => {
  try {
    const { email, password } = data;
    const response = await fetch(`${API_URL}/user/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: UserService.js ~ signIn ~ error', error);
    throw error;
  }
};

export const UserService = {
  signIn,
};