import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IAppointment, IAppointmentRequest } from '../types';
import { AppointmentService } from '../services';

export const useAppointments = (date: string) => {
  return useQuery<unknown, Error, { results: IAppointment[]; message: string }>(
    ['appointments', date],
    async () => {
      return await AppointmentService.appointments(date);
    },
    {
      enabled: !!date,
    }
  );
};

export const useUpdateAppointment = () => {
  return useMutation<{ message: string; results: IAppointment }, Error, IAppointmentRequest>(async (data: IAppointmentRequest) => {
    return await AppointmentService.updateAppointment(data);
  });
};
