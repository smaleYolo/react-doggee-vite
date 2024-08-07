import { IUser } from '@utils/models';

export interface UserInfoValues {
  name: string;
  city: string;
  birthdate: string;
}

export interface UpdateUserInfoPayload {
  name: IUser['name'];
  city: IUser['city'];
  birthdate: IUser['birthdate'];
}

export interface PetInfoValues {
  name: string;
  breed: string;
  birthdate: string;
  weight?: string;
}

export interface IRefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface IMessageResponse {
  message: string;
}