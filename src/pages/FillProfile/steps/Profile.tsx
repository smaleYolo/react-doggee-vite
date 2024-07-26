import React from 'react';
import styles from '../FillProfile.module.css';
import { useIntl } from '@features/intl';
import { useUser } from '@utils/contexts';
import { Button } from '@common/buttons';
import { useQuery } from '@utils/hooks';
import { api } from '@utils/api';
import { FormInfo } from '@pages/FillProfile/components/formInfo/FormInfo.tsx';
import { IUser } from '@utils/models';



export const Profile = () => {
  const {translateMessage} = useIntl()
  const {toggleStep, userId} = useUser()

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

      {/*TODO: Loader*/}
      {isLoading && <h3>Loading...</h3>}
      {data && <FormInfo {...data} />}

      <Button >
        {translateMessage('button.done')}
      </Button>


    </>
  );
};
