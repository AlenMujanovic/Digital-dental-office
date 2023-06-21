import { SessionService } from '.';
import { IPrescription } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const getPrescriptions = async (): Promise<{ message: string; results: IPrescription }> => {
  try {
    const response = await fetch(`${API_URL}/prescription?${new URLSearchParams()}`, {
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
    console.log('🚀 ~ file: PrescriptionService.ts ~ getPrescriptions ~ error:', error);
    throw error;
  }
};

export const PrescriptionService = {
  getPrescriptions,
};
