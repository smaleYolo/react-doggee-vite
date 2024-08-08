import { IDog } from '@utils/models';
import { PetInfoValues } from '@utils/contexts';

export interface GetBreedsResponse {
  message: string,
  data: IDog['breed'][]
}

export interface IGetUserDogsList {
  message: string;
  dogs: IDog[];
}

export interface CreatePetResponse {
  message: string;
}

export interface CreatePetPayload extends Omit<PetInfoValues, 'birthdate' | 'weight'> {
  birthdate: Date;
  weight?: number;
}