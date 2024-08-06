import React, { useCallback, useEffect, useState } from 'react';
import styles from './PetsList.module.css';
import { CheckMarkSvg, CrossSvg, PlusSvg } from '@utils/svg';
import { useMutation, useQuery } from '@utils/hooks';
import { api } from '@utils/api';
import { useCalendar, useAuth, useSteps, useDogs } from '@utils/contexts';
import { IDog } from '@utils/models';
import { useIntl } from '@features/intl';

export interface IGetUserGogsList {
  message: string;
  dogs: IDog[];
}


export const PetsList = () => {
  const {translateMessage} = useIntl()
  const { userId } = useAuth();
  const { selectedDog, toggleSelectedDog, setSelectedDog, dogs, setDogs, deleteDogHandler } = useDogs()
  const { getFullYears } = useCalendar();
  const { unCompleteStep, completeStep} = useSteps()

  const { data: userDogs, isLoading } = useQuery<IGetUserGogsList, IGetUserGogsList>({
    request: () => api.get(`/users/${userId}/dogs`),
    initialValue: { message: '', dogs: [] },
    dependencies: []
  });


  useEffect(() => {
    if (userDogs && userDogs.dogs.length > 0) {
      setDogs(userDogs.dogs);
    }
  }, [userDogs]);

  useEffect(() => {
    if(!dogs.length) {
      unCompleteStep('pets');
    } else {
      completeStep('pets')
    }
  }, [dogs]);


  const { mutation: DeleteUserDogMutation } = useMutation({
    request: (DogId) => api.delete(`/users/${userId}/dogs/${DogId}`)
  });



  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        {translateMessage('step.title.pets')}
      </h3>

      <div className={styles.content}>
        <div className={styles.petsList}>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            dogs.length ? (
              dogs.map(dog => (
                <div key={dog.id} className={styles.petList_item}>
                  {dog === selectedDog ? <CheckMarkSvg width={'22'} className={styles.checkMark} /> : null}
                  <div className={`${styles.pet_item} ${dog === selectedDog ? styles.selected : ''}`}>
                    <div
                      onClick={() => toggleSelectedDog(dog)}
                    >
                      {`${dog.name} - ${translateMessage(dog.breed)}, ${getFullYears(dog?.birthdate)} y.o., ${dog.weight} kg`}
                    </div>
                    <CrossSvg
                      width={13}
                      className={styles.cross}
                      onClick={() => {
                        deleteDogHandler(dog.id, DeleteUserDogMutation)
                        if (selectedDog) {
                          setSelectedDog(undefined)
                        }
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              //TODO: Нормальная визуализация
              <h2>Добавьте собачек...</h2>
            )
          )}
        </div>

        <div
          className={styles.add_pet}
        >
          <div className={styles.add_pet_text}>
            {
              dogs.length ? (
                <>
                  <PlusSvg className={styles.plus} />
                  <span>{translateMessage('page.registration.step.addYourPetsStep.addAnotherPet')}</span>
                </>
              ) : (
                //TODO: Нормальная визуализация
                <h3>{translateMessage("page.registration.step.addYourPetsStep.title")}</h3>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
