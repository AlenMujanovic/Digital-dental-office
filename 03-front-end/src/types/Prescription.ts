import { IUser } from '.';

export interface IPrescription {
  _id?: string;
  user?: IUser | null;
  description: string;
  createdAt?: string;
}
