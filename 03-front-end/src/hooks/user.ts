import { useMutation } from '@tanstack/react-query';
import { UserService } from '../services';
import { ISignIn } from '../pages/SignIn';
import { IUser } from '../types';
import { ISignUp } from '../pages/SignUp';

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
