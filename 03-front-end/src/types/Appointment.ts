import { IUser } from './User';

export interface IAppointment {
  _id?: string;
  startTimeAndDate: string;
  endTimeAndDate: string;
  user?: IUser;
  type?: string;
  status?: string;
}
