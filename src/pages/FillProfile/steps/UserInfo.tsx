import styles from '../FillProfile.module.css'
import { Input } from '@common/fields';
import { DateInput } from '@inputs/Inputs/DateInput';
import { CalendarSvg } from '@utils/svg';
import { Calendar } from '@common/Calendar/Calendar.tsx';
import { Button } from '@common/buttons';
import React, { useEffect, useState } from 'react';
import { useIntl } from '@features/intl';
import { formatDate, useDate } from '@features/calendar';
import { useUser } from '@utils/contexts';
import { useForm, useMutation } from '@utils/hooks';
import { api } from '@utils/api';
import { validateField } from '@helpers/*';
import { toast } from 'react-toastify';

interface UpdateUserInfoResponse {
  message: string;
}

export interface UpdateUserInfoValues {
  name: string;
  city: string;
  birthdate: string;
}


interface UpdateUserInfoPayload {
  name: string;
  city: string;
  birthdate: Date;
}



export const UserInfo = () => {
  const { translateMessage } = useIntl();
  const { isCalendar, setIsCalendar, selectedDay, parseDateString, setSelectedDay } = useDate();
  const { currentStep, toggleStep, getUserId, completeStep, profileSteps } = useUser();


  const { mutation: updateUserInfoMutation } = useMutation<UpdateUserInfoResponse, UpdateUserInfoValues>({
    request: (userInfo: UpdateUserInfoValues) => {
      const updatedUserInfo = {
        ...userInfo,
        birthdate: new Date(userInfo.birthdate.split('.').reverse().join('-'))
      };
      return api.put<UpdateUserInfoResponse, UpdateUserInfoPayload>(`/users/${getUserId()}/profile`, updatedUserInfo);
    }
  });

  //TODO: Перенести информацию о пройденных шагах и данных о них на бекенд, вместо localStorage?
  const { values, setFieldValue, errors, handleSubmit, isSubmitting, resetForm } = useForm<UpdateUserInfoValues>({
    initialValues: {
      name: localStorage.getItem(`name_${getUserId()}`) || '',
      city: localStorage.getItem(`city_${getUserId()}`) || '',
      birthdate: localStorage.getItem(`birthdate_${getUserId()}`) || ''
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
        completeStep(currentStep);
        toggleStep('pets');
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = formatDate(selectedDay.date, 'DD.MM.YYYY');
      if (values.birthdate !== formattedDate) {
        setFieldValue('birthdate', formattedDate);
        localStorage.setItem(`birthdate_${getUserId()}`, formattedDate);
      }
    }
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem(`name_${getUserId()}`, values.name);
    localStorage.setItem(`city_${getUserId()}`, values.city);
  }, [values.name, values.city]);

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(newValue)) {  // Проверка на формат ДД.ММ.ГГГГ
      const date = parseDateString(newValue);
      setSelectedDay(date);
      setFieldValue('birthdate', newValue);
      localStorage.setItem(`birthdate_${getUserId()}`, newValue);
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
            profileSteps.find(profStep => profStep.step === currentStep)?.completed
              ? translateMessage('button.update')
              : translateMessage('button.next')
          }
        </Button>
      </form>
    </>
  );
};
