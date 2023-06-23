import { useMutation } from '@tanstack/react-query';
import { IContactUs } from '../types';
import { ContactUsService } from '../services/ContactUsService';

export const useContact = () => {
  return useMutation<{ message: string }, Error, IContactUs>(async (data: IContactUs) => {
    return await ContactUsService.contactUs(data);
  });
};
