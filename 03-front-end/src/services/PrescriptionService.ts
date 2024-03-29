import { SessionService } from '.';
import { IPrescription } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const getPrescriptions = async (userId?: string): Promise<{ message: string; results: IPrescription }> => {
  try {
    const url = `${API_URL}/prescription${userId ? `?user=${userId}` : ''}`;
    const response = await fetch(url, {
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

const createPrescription = async (data: IPrescription): Promise<{ message: string; results: IPrescription }> => {
  try {
    const { user, description } = data;
    const response = await fetch(`${API_URL}/prescription`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SessionService.getSessionFromStorage()}`,
      },
      body: JSON.stringify({
        user,
        description,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: PrescriptionService.ts ~ createPrescription ~ error:', error);
    throw error;
  }
};

export const PrescriptionService = {
  getPrescriptions,
  createPrescription,
};
