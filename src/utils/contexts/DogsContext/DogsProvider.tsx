import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { IDog } from '@utils/models';
import { DogsContext, PetInfoValues, useAuth, useSteps } from '@utils/contexts';
import { api } from '@utils/api';
import { useMutation, useQueryLazy } from '@utils/hooks';


interface GetBreedsResponse {
  message: string,
  data: IDog['breed'][]
}

export interface IGetUserDogsList {
  message: string;
  dogs: IDog[];
}

interface CreatePetResponse {
  message: string;
}

interface CreatePetPayload extends Omit<PetInfoValues, 'birthdate' | 'weight'> {
  birthdate: Date;
  weight?: number;
}


export interface IDogsContext {
  dogs: IDog[],
  initUserDogs: () => void;
  isDogsLoading: boolean,
  breedsList: IDog['breed'][],
  setDogs: Dispatch<SetStateAction<IDog[]>>,
  deleteDogHandler: (id: IDog['id']) => void;
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

  const { mutation: DeleteUserDogMutation } = useMutation({
    request: (DogId) => api.delete(`/users/${userId}/dogs/${DogId}`)
  });

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

  const { query: getUserDogsQuery, isLoading: isDogsLoading} = useQueryLazy<IGetUserDogsList>({
    request: () => api.get(`/users/${userId}/dogs`)
  });

  const initUserDogs = async () => {
    const response = await getUserDogsQuery()

    if(response && response.dogs) {
      setDogs(response.dogs);
    }
  }

  const initBreedsList = async () => {
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

  const deleteDogHandler = async (id: number) => {
    await DeleteUserDogMutation(id);
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  const createDogHandler = async (petInfo: PetInfoValues) => {
    return await addPetInfoMutation(petInfo)
  }

  const updateDogHandler = async (petInfo: PetInfoValues) => {
    return await updateDogMutation(petInfo)
  }


  useEffect(() => {
    if (userId){
      initBreedsList()
    }
  }, []);

  useEffect(() => {
    if (userId) {
      initUserDogs()
    }
  },[])


  useEffect(() => {
    setDogs([]);
    setSelectedDog(undefined);
  }, [logout]);


  const value: IDogsContext = {
    dogs,
    initUserDogs,
    isDogsLoading,
    breedsList,
    deleteDogHandler,
    createDogHandler,
    updateDogHandler,
    setDogs,
    selectedDog,
    toggleSelectedDog,
    setSelectedDog
  };

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
};
