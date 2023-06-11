import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '../services';
import { IUser, ISignIn, ISignUp } from '../types';

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
