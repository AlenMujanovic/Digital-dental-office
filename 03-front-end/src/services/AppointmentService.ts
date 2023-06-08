import { SessionService } from '.';
import { IAppointment } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const appointments = async (date: string): Promise<{ message: string; results: IAppointment }> => {
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

export const AppointmentService = {
  appointments,
};
