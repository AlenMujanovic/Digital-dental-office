import { useMutation } from '@tanstack/react-query';
import { UserService } from '../services';
import { ISignIn } from '../pages/SignIn';
import { IUser } from '../types';

export const useSignIn = () => {
  return useMutation<{ results: IUser; token: string }, Error, ISignIn>(async (data: ISignIn) => {
    return await UserService.signIn(data);
  });
};
