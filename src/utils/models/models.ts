// IUser & IDog
export interface IUser {
  id: number;
  username: string;
  name: string;
  city: string;
  birthdate: Date;
  dogs: IDog[];
}
export interface IDog {
  id: number;
  name: string;
  breed: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}



