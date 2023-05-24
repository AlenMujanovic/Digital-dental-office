import { useMutation } from '@tanstack/react-query';
import { UserService } from '../services';
import { ISignIn } from '../pages/SignIn';

export const useSignIn = () => {
  return useMutation((data: ISignIn) => {
    return UserService.signIn(data);
  });
};
