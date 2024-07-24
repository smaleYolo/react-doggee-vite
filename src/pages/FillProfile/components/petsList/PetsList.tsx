import React, { useEffect, useState } from 'react';
import styles from './PetsList.module.css';
import { CheckMarkSvg, CrossSvg, PlusSvg, WarningSvg } from '@utils/svg';
import { useMutation, useQuery } from '@utils/hooks';
import { api } from '@utils/api';
import { useUser } from '@utils/contexts';
import { IDog } from '@utils/models';
import { useCalendar, useDate } from '@features/calendar';
import { useIntl } from '@features/intl';

export const PetsList = () => {
  const showCheckMark = true;

  const {translateMessage} = useIntl()
  const { getUserId } = useUser();
  const { getFullYears } = useDate();

  const [dogs, setDogs] = useState<IDog[]>([]);

  const deleteDogHandler = async (id: number) => {
    await DeleteUserDogMutation(id);
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  const { data: userDogs, isLoading, isError } = useQuery<IDog[], IDog[]>({
    request: () => api.get(`/users/${getUserId()}/dogs`),
    initialValue: [],
    dependencies: []
  });

  useEffect(() => {
    if (userDogs) {
      setDogs(userDogs);
    }
  }, [userDogs]);


  const { mutation: DeleteUserDogMutation } = useMutation({
    request: (DogId) => api.delete(`/users/${getUserId()}/dogs/${DogId}`)
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
            dogs.map(dog => (
              <div key={dog.id} className={styles.petList_item}>
                {showCheckMark ? <CheckMarkSvg width={'22'} /> : <WarningSvg width={'22'} />}
                <div className={styles.pet_item}>
                  <span>{`${dog.name} - ${dog.breed}, ${getFullYears(dog?.birthdate)} y.o., ${dog.weight} kg`}</span>
                  <CrossSvg
                    width={13}
                    className={styles.cross}
                    onClick={() => deleteDogHandler(dog.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className={styles.add_pet}
        >
          <div className={styles.add_pet_text}>
            {
              dogs.length > 0 ? (
                <>
                  <PlusSvg className={styles.plus} />
                  <span>{translateMessage('page.registration.step.addYourPetsStep.addAnotherPet')}</span>
                </>
              ) : (
                <h3>{translateMessage("page.registration.step.addYourPetsStep.title")}</h3>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
