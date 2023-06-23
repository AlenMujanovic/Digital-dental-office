import { useMutation, useQuery } from '@tanstack/react-query';
import { PrescriptionService } from '../services/PrescriptionService';
import { IPrescription } from '../types';

// export const usePrescriptions = (userId?: string) => {
//   return useQuery<unknown, Error, { results: IPrescription[]; message: string }>(['prescriptions', userId], async () => {
//     return await PrescriptionService.getPrescriptions(userId);
//   });
// };

export const usePrescriptions = (userId?: string, userRole?: string) => {
  return useQuery<unknown, Error, { results: IPrescription[]; message: string }>(
    ['prescriptions', userId],
    async () => {
      if (userRole === 'Doctor' && userId) {
        return await PrescriptionService.getPrescriptions(userId);
      } else if (userRole === 'Patient') {
        return await PrescriptionService.getPrescriptions();
      } else {
        // Return empty data if the conditions are not met
        return { results: [], message: '' };
      }
    },
    {
      enabled: userRole === 'Doctor' || userRole === 'Patient',
    }
  );
};

export const useCreatePrescription = () => {
  return useMutation<{ message: string }, Error, IPrescription>(async (data: IPrescription) => {
    return await PrescriptionService.createPrescription(data);
  });
};
