import { IContactUs } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const contactUs = async (data: IContactUs): Promise<{ message: string }> => {
  try {
    const { name, email, description } = data;
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        description,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.log('🚀 ~ file: ContactUsService.ts:31 ~ contactUs ~ error:', error);
    throw error;
  }
};

export const ContactUsService = {
  contactUs,
};
