import { IUser } from '.';

export interface IPrescription {
  _id: string;
  user: IUser;
  description: string;
  createdAt: string;
}
