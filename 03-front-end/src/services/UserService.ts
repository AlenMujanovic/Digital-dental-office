import { IUser, ISignIn, ISignUp, IEditUserProfile, IChangeUserPassword } from '../types';
import { SessionService } from './SessionService';

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

const signUp = async (data: ISignUp): Promise<{ message: string }> => {
  try {
    const { name, email, password, phone, gender, address } = data;
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        gender,
        address,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: UserService.js ~ signUp ~ error', error);
    throw error;
  }
};

const getUserProfile = async (): Promise<{ message: string; results: IUser }> => {
  try {
    const response = await fetch(`${API_URL}/user/logged-user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SessionService.getSessionFromStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: UserService.ts ~ getUserProfile ~ error:', error);
    throw error;
  }
};

const editProfile = async (data: IEditUserProfile): Promise<{ message: string; results: IUser }> => {
  try {
    const { name, email, phone, address } = data;
    const response = await fetch(`${API_URL}/user/edit-profile`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SessionService.getSessionFromStorage()}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: UserService.ts:115 ~ editProfile ~ error:', error);
    throw error;
  }
};

const changePassword = async (data: IChangeUserPassword): Promise<{ message: string }> => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = data;
    const response = await fetch(`${API_URL}/user/change-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SessionService.getSessionFromStorage()}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmNewPassword,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: UserService.ts:144 ~ error:', error);
    throw error;
  }
};

const getPatients = async (): Promise<{ message: string; results: IUser }> => {
  try {
    const response = await fetch(`${API_URL}/user/patient`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SessionService.getSessionFromStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: UserService.ts ~ getPatients ~ error:', error);
    throw error;
  }
};

export const UserService = {
  signIn,
  signUp,
  getUserProfile,
  getPatients,
  editProfile,
  changePassword,
};
