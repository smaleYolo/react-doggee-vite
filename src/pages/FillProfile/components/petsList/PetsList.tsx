import React, { useCallback, useEffect, useState } from 'react';
import styles from './PetsList.module.css';
import { CheckMarkSvg, CrossSvg, PlusSvg } from '@utils/svg';
import { useMutation, useQuery, useQueryLazy } from '@utils/hooks';
import { api } from '@utils/api';
import { useCalendar, useAuth, useSteps, useDogs, IGetUserDogsList } from '@utils/contexts';
import { IDog } from '@utils/models';
import { useIntl } from '@features/intl';
import { FieldLoader, FormLoader } from '@common/Loaders';



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
      {dogs && dogs.length ? (
        <h3 className={styles.header}>
          {translateMessage('step.title.pets')}
        </h3>
      ) : null}

      <div className={styles.content}>
        <div className={styles.petsList}>
          {isDogsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 15}}>
              <FieldLoader/>
            </div>
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
              <div className={styles.emptyState}>
                <div className={styles.emptyState_header}>
                  <PlusSvg className={styles.emptyState_plusIcon} /> <h2>{translateMessage('no.dogsList.title')}</h2>
                </div>
                <p>{translateMessage("no.dogsList.data")}</p>
              </div>
            )
          )}
        </div>

        <div
          className={styles.add_pet}
        >
          <div className={styles.add_pet_text}>
            {
              dogs.length ? (
                <div className={styles.add_pet_block}>
                  <PlusSvg className={styles.plusIcon} />
                  <h2>{translateMessage("page.registration.step.addYourPetsStep.addAnotherPet")}</h2>
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};
