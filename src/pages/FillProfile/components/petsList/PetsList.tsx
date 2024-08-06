import React, { useCallback, useEffect, useState } from 'react';
import styles from './PetsList.module.css';
import { CheckMarkSvg, CrossSvg, PlusSvg } from '@utils/svg';
import { useMutation, useQuery, useQueryLazy } from '@utils/hooks';
import { api } from '@utils/api';
import { useCalendar, useAuth, useSteps, useDogs, IGetUserDogsList } from '@utils/contexts';
import { IDog } from '@utils/models';
import { useIntl } from '@features/intl';



export const PetsList = () => {
  const {translateMessage} = useIntl()
  const {userId} = useAuth()
  const { selectedDog, toggleSelectedDog, setSelectedDog, setDogs, dogs, deleteDogHandler } = useDogs()
  const { getFullYears } = useCalendar();

  const { data: userDogs, isLoading: isDogsLoading} = useQuery<IGetUserDogsList, IGetUserDogsList>({
    request: () => api.get(`/users/${userId}/dogs`),
    initialValue: {message: '', dogs: []}
  });


  useEffect(() => {
    if (userDogs && userDogs.dogs.length > 0){
      setDogs(userDogs.dogs)
    }
  }, [userDogs]);


  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        {translateMessage('step.title.pets')}
      </h3>

      <div className={styles.content}>
        <div className={styles.petsList}>
          {isDogsLoading ? (
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
                        deleteDogHandler(dog.id)
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
