import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { IDog } from '@utils/models';
import { DogsContext, useAuth } from '@utils/contexts';


export interface IDogsContext {
  dogs: IDog[],
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





  useEffect(() => {
    setDogs([]);
    setSelectedDog(undefined);
  }, [logout]);


  const value: IDogsContext = {
    dogs,
    deleteDogHandler,
    setDogs,
    selectedDog,
    toggleSelectedDog,
    setSelectedDog
  };

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
};
