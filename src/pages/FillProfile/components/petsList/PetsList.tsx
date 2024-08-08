import React, { useEffect } from 'react';
import styles from './PetsList.module.css';

import { CheckMarkSvg, CrossSvg, PlusSvg } from '@utils/svg';
import { useMutation, useQuery } from '@utils/hooks';
import { api } from '@utils/api';
import { useCalendar, useAuth, useDogs, IGetUserDogsList, useSteps } from '@utils/contexts';
import { useIntl } from '@features/intl';
import { FieldLoader } from '@common/Loaders';
import { IDog } from '@utils/models';
import { toast } from 'react-toastify';

export const PetsList: React.FC = () => {
  const { translateMessage } = useIntl();
  const { userId } = useAuth();
  const { selectedDog, toggleSelectedDog, setSelectedDog, setDogs, dogs } = useDogs();
  const { getFullYears } = useCalendar();
  const { unCompleteStep, completeStep } = useSteps()

  // Запрос на получение списка собак пользователя
  const { data: userDogs, isLoading: isDogsLoading } = useQuery<IGetUserDogsList, IGetUserDogsList>({
    request: () => api.get(`/users/${userId}/dogs`),
    initialValue: { message: '', dogs: [] }
  });

  // Запрос на удаление собаки пользователя
  const { mutation: DeleteUserDogMutation, isLoading: isDeletingDogLoading } = useMutation<{
    message: string
  }, IDog['id']>({
    request: (DogId) => api.delete(`/users/${userId}/dogs/${DogId}`)
  });

  const deleteDogHandler = async (id: number) => {
    try {
      const data = await DeleteUserDogMutation(id);
      setDogs(dogs.filter(dog => dog.id !== id));
      setSelectedDog(undefined);

      toast.success(translateMessage(data.message));
    } catch (error) {
      toast.error((error as Error).message);
      console.warn(error);
    }
  };

  useEffect(() => {
    if (userDogs && userDogs.dogs.length > 0) {
      setDogs(userDogs.dogs);
    }
  }, [userDogs, setDogs]);

  useEffect(() => {
    if (dogs && dogs.length > 0) {
      completeStep('pets')
      completeStep('profile')
    } else {
      unCompleteStep('pets')
      unCompleteStep('profile')
    }
  }, [dogs, setDogs]);

  return (
    <div className={styles.container}>
      {dogs.length > 0 && (
        <h3 className={styles.header}>
          {translateMessage('step.title.pets')}
        </h3>
      )}

      <div className={styles.content}>
        <div className={styles.petsList}>
          {isDogsLoading || isDeletingDogLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 15 }}>
              <FieldLoader />
            </div>
          ) : (
            dogs.length > 0 ? (
              dogs.map(dog => (

                  <div key={dog.id} className={styles.petList_item}>
                    {dog === selectedDog && <CheckMarkSvg width={22} className={styles.checkMark} />}
                    <div
                      onClick={() => toggleSelectedDog(dog)}
                      className={`${styles.pet_item} ${dog === selectedDog ? styles.selected : ''}`}
                    >
                      <div className={styles.pet_item_info}>
                        {`${dog.name} - ${translateMessage(dog.breed)}, ${getFullYears(dog?.birthdate)} y.o., ${dog.weight} kg`}
                      </div>
                      <CrossSvg
                        width={13}
                        className={styles.cross}
                        onClick={() => {
                          deleteDogHandler(dog.id);
                          if (selectedDog) {
                            setSelectedDog(undefined);
                          }
                        }}
                      />
                    </div>
                  </div>
                )
              )
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyState_header}>
                  <PlusSvg className={styles.emptyState_plusIcon} />
                  <h2>{translateMessage('no.dogsList.title')}</h2>
                </div>
                <p>{translateMessage('no.dogsList.data')}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
