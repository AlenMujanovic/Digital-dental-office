import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '../services';
import { IUser, ISignIn, ISignUp, IEditUserProfile, IChangeUserPassword } from '../types';

export const useSignIn = () => {
  return useMutation<{ results: IUser; token: string }, Error, ISignIn>(async (data: ISignIn) => {
    return await UserService.signIn(data);
  });
};

export const useSignUp = () => {
  return useMutation<{ message: string }, Error, ISignUp>(async (data: ISignUp) => {
    return await UserService.signUp(data);
  });
};

export const useUserProfile = () => {
  return useQuery<unknown, Error, { results: IUser; message: string }>(['user', 'profile'], async () => {
    return await UserService.getUserProfile();
  });
};

export const useUserPatients = (userRole?: string) => {
  return useQuery<unknown, Error, { results: IUser[]; message: string }>(
    ['user', 'patient'],
    async () => {
      return await UserService.getPatients();
    },
    {
      enabled: userRole === 'Doctor',
    }
  );
};

export const useEditUserProfile = () => {
  return useMutation<{ results: IUser; message: string }, Error, IEditUserProfile>(async (data: IEditUserProfile) => {
    return await UserService.editProfile(data);
  });
};

export const useChangeUserPassword = () => {
  return useMutation<{ message: string }, Error, IChangeUserPassword>(async (data: IChangeUserPassword) => {
    return await UserService.changePassword(data);
  });
};
