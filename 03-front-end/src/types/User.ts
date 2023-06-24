export interface IUser {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  phone: string;
  gender: string;
  address: string;
  role: string;
}

export interface IEditUserProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
}

export interface IChangeUserPassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
