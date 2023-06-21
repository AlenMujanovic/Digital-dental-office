import { useQuery } from '@tanstack/react-query';
import { PrescriptionService } from '../services/PrescriptionService';
import { IPrescription } from '../types';

export const usePrescriptions = () => {
  return useQuery<unknown, Error, { results: IPrescription[]; message: string }>(['prescriptions'], async () => {
    return await PrescriptionService.getPrescriptions();
  });
};
