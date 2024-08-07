import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { IDog } from '@utils/models';
import {
  CreatePetPayload,
  CreatePetResponse,
  DogsContext,
  GetBreedsResponse,
  PetInfoValues,
  useAuth
} from '@utils/contexts';
import { api } from '@utils/api';
import { useMutation, useQueryLazy } from '@utils/hooks';



export interface IDogsContext {
  dogs: IDog[],
  breedsList: IDog['breed'][],
  setDogs: Dispatch<SetStateAction<IDog[]>>,
  createDogHandler: (body: PetInfoValues) => Promise<CreatePetResponse>
  updateDogHandler: (body: PetInfoValues) => Promise<CreatePetResponse>
  selectedDog: IDog | undefined;
  setSelectedDog: Dispatch<SetStateAction<IDog | undefined>>;
  toggleSelectedDog: (dog: IDog ) => void;
}

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const {userId, logout} = useAuth()


  const [dogs, setDogs] = useState<IDog[]>([]);
  const [selectedDog, setSelectedDog] = useState<IDog | undefined>(undefined);
  const [breedsList, setBreedsList] = useState<IDog['breed'][]>([])

  const { mutation: addPetInfoMutation } = useMutation<CreatePetResponse, PetInfoValues>({
    request: (petInfo: PetInfoValues) => {
      const updatedPetInfo = {
        ...petInfo,
        birthdate: new Date(petInfo.birthdate.split('.').reverse().join('-')),
        weight: Number(petInfo.weight)
      };
      return api.post<CreatePetResponse, CreatePetPayload>(`/users/${userId}/dogs`, updatedPetInfo);
    }
  });

  const { mutation: updateDogMutation } = useMutation<CreatePetResponse, PetInfoValues>({
    request: (petInfo: PetInfoValues) => {
      const updatedPetInfo = {
        ...petInfo,
        birthdate: new Date(petInfo.birthdate.split('.').reverse().join('-')),
        weight: Number(petInfo.weight)
      };
      return api.put<CreatePetResponse, CreatePetPayload>(`/users/${userId}/dogs/${selectedDog!.id}`, updatedPetInfo);
    }
  });

  const { query: getBreedsQuery} = useQueryLazy<GetBreedsResponse>({
    request: () => api.get('/breeds')
  })

  const initDogsBreeds = async () => {
    const response = await getBreedsQuery()

    if(response && response.data) {
      setBreedsList(response.data);
    }
  }

  const toggleSelectedDog = (dog: IDog) => {
    const currentDog = selectedDog?.id === dog.id;

    if (currentDog) {
      setSelectedDog(undefined)
    } else {
      setSelectedDog(dog);
    }
  }


  const createDogHandler = async (petInfo: PetInfoValues) => {
    return await addPetInfoMutation(petInfo)
  }

  const updateDogHandler = async (petInfo: PetInfoValues) => {
    return await updateDogMutation(petInfo)
  }


  useEffect(() => {
    if (userId) {
      initDogsBreeds()
    }
  },[userId])


  useEffect(() => {
    setDogs([]);
    setSelectedDog(undefined);
  }, [logout]);


  const value: IDogsContext = {
    dogs,
    breedsList,
    createDogHandler,
    updateDogHandler,
    setDogs,
    selectedDog,
    toggleSelectedDog,
    setSelectedDog
  };

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
};
