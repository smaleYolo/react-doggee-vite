import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { IDog } from '@utils/models';
import { DogsContext, useAuth } from '@utils/contexts';
import { api } from '@utils/api';
import { useMutation, useQuery, useQueryLazy } from '@utils/hooks';


interface GetBreedsResponse {
  message: string,
  data: IDog['breed'][]
}


export interface IDogsContext {
  dogs: IDog[],
  breedsList: IDog['breed'][],
  setDogs: Dispatch<SetStateAction<IDog[]>>,
  deleteDogHandler: (id: IDog['id'], fn: (id: unknown) => Promise<unknown>) => void;
  selectedDog: IDog | undefined;
  setSelectedDog: Dispatch<SetStateAction<IDog | undefined>>;
  toggleSelectedDog: (dog: IDog ) => void;
}

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const {logout} = useAuth()

  const [dogs, setDogs] = useState<IDog[]>([]);
  const [selectedDog, setSelectedDog] = useState<IDog | undefined>(undefined);
  const [breedsList, setBreedsList] = useState<IDog['breed'][]>([])

  const toggleSelectedDog = (dog: IDog) => {
    const currentDog = selectedDog?.id === dog.id;

    if (currentDog) {
      setSelectedDog(undefined)
    } else {
      setSelectedDog(dog);
    }
  }

  const deleteDogHandler = async (id: number, fn: (body: unknown) => Promise<unknown>) => {
    await fn(id);
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  const {query: getBreedsQuery} = useQueryLazy<GetBreedsResponse>({
    request: () => api.get('/breeds')
  })

  useEffect(() => {
    const initBreedsList = async () => {
      const response = await getBreedsQuery()

      if(response && response.data) {
        setBreedsList(response.data);
      }
    }

    initBreedsList()
  }, []);


  useEffect(() => {
    setDogs([]);
    setSelectedDog(undefined);
  }, [logout]);


  const value: IDogsContext = {
    dogs,
    breedsList,
    deleteDogHandler,
    setDogs,
    selectedDog,
    toggleSelectedDog,
    setSelectedDog
  };

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
};
