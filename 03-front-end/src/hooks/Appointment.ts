import { useQuery } from '@tanstack/react-query';
import { IAppointment } from '../types';
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
