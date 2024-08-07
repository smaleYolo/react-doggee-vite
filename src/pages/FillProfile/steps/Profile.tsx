import React from 'react';
import styles from '../FillProfile.module.css';
import { useIntl } from '@features/intl';
import { useSteps, useAuth } from '@utils/contexts';
import { useQuery } from '@utils/hooks';
import { api } from '@utils/api';
import { IUser } from '@utils/models';
import { FormLoader } from '@common/Loaders';
import { FormInfo } from '@pages/FillProfile';



export const Profile = () => {
  const {translateMessage} = useIntl()
  const { userId} = useAuth()
  const {toggleStep} = useSteps()

  const {data , isError, isLoading} = useQuery<IUser | null, IUser>({
    request: () => api.get<IUser>(`/users/${userId}/profile`),
    initialValue: null,
    dependencies: []
  })

  return (
    <>
      <div className={styles.step_text}
           onClick={() => toggleStep('pets')}
      >
        <span>
          {translateMessage('button.goNextStep')}
        </span>
      </div>

      {isLoading && <FormLoader/>}
      {data && <FormInfo {...data} />}
    </>
  );
};
