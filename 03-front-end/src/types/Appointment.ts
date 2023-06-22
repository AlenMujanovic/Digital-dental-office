import { IUser } from './User';

export interface IAppointment {
  _id: string;
  startTimeAndDate: string;
  endTimeAndDate: string;
  user: IUser;
  type: string;
  status: 'Pending' | 'Canceled' | 'Done' | 'Free';
}

export interface IAppointmentRequest {
  _id: string;
  type?: string;
  status: 'Pending' | 'Canceled' | 'Done' | 'Free';
}
