import { SessionService } from '.';
import { IAppointment, IAppointmentRequest } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const appointmentsByDate = async (date: string): Promise<{ message: string; results: IAppointment }> => {
  try {
    const response = await fetch(`${API_URL}/appointment?${new URLSearchParams({ date })}`, {
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
    console.log('🚀 ~ file: AppointmentService.ts ~ appointments ~ error:', error);
    throw error;
  }
};

const updateAppointment = async (data: IAppointmentRequest): Promise<{ message: string; results: IAppointment }> => {
  try {
    const { type, status, _id } = data;

    const response = await fetch(`${API_URL}/appointment/${_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SessionService.getSessionFromStorage()}`,
      },
      body: JSON.stringify({
        type,
        status,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: AppointmentService.ts ~ appointments ~ error:', error);
    throw error;
  }
};

const appointmentsForUser = async (date: string): Promise<{ message: string; results: IAppointment }> => {
  try {
    const response = await fetch(`${API_URL}/appointment/user?${new URLSearchParams({ date })}`, {
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
    console.log('🚀 ~ file: AppointmentService.ts ~ appointments ~ error:', error);
    throw error;
  }
};

const appointmentsByRole = async (date: string): Promise<{ message: string; results: IAppointment }> => {
  try {
    const response = await fetch(`${API_URL}/appointment/user/role?${new URLSearchParams({ date })}`, {
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
    console.log('🚀 ~ file: AppointmentService.ts ~ appointments ~ error:', error);
    throw error;
  }
};

const updateAppointmentStatus = async (data: IAppointmentRequest): Promise<{ message: string; results: IAppointment }> => {
  try {
    const { status, _id } = data;

    const response = await fetch(`${API_URL}/appointment/status/${_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SessionService.getSessionFromStorage()}`,
      },
      body: JSON.stringify({
        status,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: AppointmentService.ts ~ appointments ~ error:', error);
    throw error;
  }
};

const appointmentsForLast6Months = async (): Promise<{ message: string; results: IAppointment }> => {
  try {
    const response = await fetch(`${API_URL}/appointment/recent`, {
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
    console.log('🚀 ~ file: AppointmentService.ts:156 ~ appointmentsForLast6Months ~ error:', error);
    throw error;
  }
};

const upcomingAppointments = async (): Promise<{ message: string; results: IAppointment }> => {
  try {
    const response = await fetch(`${API_URL}/appointment/upcoming`, {
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
    console.log('🚀 ~ file: AppointmentService.ts:181 ~ upcomingAppointments ~ error:', error);

    throw error;
  }
};
export const AppointmentService = {
  appointmentsByDate,
  updateAppointment,
  appointmentsForUser,
  appointmentsByRole,
  updateAppointmentStatus,
  appointmentsForLast6Months,
  upcomingAppointments,
};
