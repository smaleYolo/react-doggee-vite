import styles from '../FillProfile.module.css'
import { Input } from '@common/fields';
import { DateInput } from '@inputs/Inputs/DateInput';
import { CalendarSvg } from '@utils/svg';
import { Calendar } from '@common/Calendar/Calendar.tsx';
import { Button } from '@common/buttons';
import React, { useEffect, useState } from 'react';
import { useIntl } from '@features/intl';
import { formatDate, useDate } from '@features/calendar';
import { IMessageResponse, IStep, Steps, UserInfoValues, useUser } from '@utils/contexts';
import { useForm, useMutation } from '@utils/hooks';
import { api } from '@utils/api';
import { validateField } from '@helpers/*';
import { toast } from 'react-toastify';


interface UpdateUserInfoPayload {
  name: string;
  city: string;
  birthdate: Date;
}



export const UserInfo = () => {
  const { translateMessage } = useIntl();
  const { isCalendar, setIsCalendar, parseDateString, setSelectedDay } = useDate();
  const { currentStepTitle, toggleStep, userId, completeStep, profileSteps, updateStepData } = useUser();

  const [userData] = useState<UserInfoValues>(() => {
    const profileData: IStep[] = JSON.parse(localStorage.getItem(`profileSteps_${userId}`) || '[]').filter((d: IStep) => d.step === 'user');

    if (profileData.length > 0 && profileData[0].step_data) {
      return profileData[0].step_data as UserInfoValues
    } else {
      return {
        name: '',
        city: '',
        birthdate: '',
      }
    }
  })

  const { mutation: updateUserInfoMutation } = useMutation<IMessageResponse, UserInfoValues>({
    request: (userInfo: UserInfoValues) => {
      const updatedUserInfo: UpdateUserInfoPayload = {
        name: userInfo.name,
        city: userInfo.city,
        birthdate: new Date(userInfo.birthdate.split('.').reverse().join('-'))
      };
      return api.put<IMessageResponse, UpdateUserInfoPayload>(`/users/${userId}/profile`, updatedUserInfo);
    }
  });

  const { values, setFieldValue, errors, handleSubmit, isSubmitting, resetForm } = useForm<UserInfoValues>({
    initialValues: {
      name: userData.name,
      city: userData.city,
      birthdate: userData.birthdate
    },
    validateSchema: {
      name: validateField,
      city: validateField,
      birthdate: validateField
    },
    onSubmit: async (values) => {
      try {
        const data = await updateUserInfoMutation(values);
        toast.success(translateMessage('validations.success', { msg: data.message }));
        updateStepData(values, currentStepTitle as Steps);

        completeStep(currentStepTitle as Steps);
        toggleStep('pets');

      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(newValue)) {  // Проверка на формат ДД.ММ.ГГГГ
      const date = parseDateString(newValue);
      setSelectedDay(date);
      setFieldValue('birthdate', newValue);
    } else {
      setFieldValue('birthdate', newValue);  // Обновление значения в любом случае, чтобы пользователь видел введенные данные
    }
  };


  return (
    <>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <Input
            label={translateMessage('field.input.name.label')}
            helperText={translateMessage(errors?.name || 'errors?.name') || ''}
            isError={!!errors?.name || false}
            type="text"
            value={values.name}
            onChange={(e) => setFieldValue('name', e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <Input
            label={translateMessage('field.input.registrationAddress.label')}
            type="text"
            helperText={translateMessage(errors?.city || 'errors?.city') || ''}
            isError={!!errors?.city || false}
            value={values.city}
            onChange={(e) => setFieldValue('city', e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <DateInput
            label={translateMessage('field.input.birthday.label')}
            type="text"
            helperText={translateMessage(errors?.birthdate || 'errors?.birthdate') || ''}
            isError={!!errors?.birthdate || false}
            value={values.birthdate}
            components={{
              indicator: () => (
                <div onClick={() => setIsCalendar(!isCalendar)}>
                  <CalendarSvg isOpen={isCalendar} />
                </div>
              )
            }}
            onChange={handleBirthdateChange}
            // onClick={() => setIsCalendar(!isCalendar)}
          />
        </div>

        {isCalendar && <Calendar />}

        <Button disabled={isSubmitting} type="submit">
          {
            profileSteps.find(profStep => profStep.step === currentStepTitle)?.completed
              ? translateMessage('button.update')
              : translateMessage('button.next')
          }
        </Button>
      </form>
    </>
  );
};
