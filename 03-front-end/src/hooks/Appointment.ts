import { useMutation, useQuery } from '@tanstack/react-query';
import { IAppointment, IAppointmentRequest } from '../types';
import { AppointmentService } from '../services';

export const useAppointmentsByDate = (date: string) => {
  return useQuery<unknown, Error, { results: IAppointment[]; message: string }>(
    ['appointments', date],
    async () => {
      return await AppointmentService.appointmentsByDate(date);
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

export const useAppointmentsForUser = (date: string) => {
  return useQuery<unknown, Error, { results: IAppointment[]; message: string }>(
    ['appointmentsForUser', date],
    async () => {
      return await AppointmentService.appointmentsForUser(date);
    },
    {
      enabled: !!date,
    }
  );
};

export const useAppointmentsByRole = (date: string) => {
  return useQuery<unknown, Error, { results: IAppointment[]; message: string }>(
    ['appointmentsByRole', date],
    async () => {
      return await AppointmentService.appointmentsByRole(date);
    },
    {
      enabled: !!date,
    }
  );
};

export const useUpdateAppointmentStatus = () => {
  return useMutation<{ message: string; results: IAppointment }, Error, IAppointmentRequest>(async (data: IAppointmentRequest) => {
    return await AppointmentService.updateAppointmentStatus(data);
  });
};

export const useAppointmentsForLast6Months = () => {
  return useQuery<unknown, Error, { results: IAppointment[]; message: string }>(['appointmentsRecent'], async () => {
    return await AppointmentService.appointmentsForLast6Months();
  });
};

export const useUpcomingAppointments = () => {
  return useQuery<unknown, Error, { results: IAppointment[]; message: string }>(['upcomingAppointments'], async () => {
    return await AppointmentService.upcomingAppointments();
  });
};
