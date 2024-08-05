import styles from '../FillProfile.module.css';
import { Input } from '@common/fields';
import { DateInput } from '@inputs/Inputs/DateInput';
import { CalendarSvg } from '@utils/svg';
import { Calendar } from '@common/Calendar/Calendar.tsx';
import { Button } from '@common/buttons';
import React, { useEffect, useState } from 'react';
import { useIntl } from '@features/intl';
import {
  IMessageResponse,
  IStep,
  Steps,
  UpdateUserInfoPayload, useCalendar,
  useDate,
  UserInfoValues, useSteps,
  useAuth
} from '@utils/contexts';
import { useForm, useMutation } from '@utils/hooks';
import { api } from '@utils/api';
import { formatDate, validateField } from '@helpers/*';
import { toast } from 'react-toastify';

export const UserInfo = () => {
  const { translateMessage } = useIntl();
  const { isCalendar, setIsCalendar } = useCalendar();
  const { parseDateString, selectedDate, toggleSelectedDate } = useDate();
  const { currentStepTitle, toggleStep, completeStep, profileSteps, updateStepData } = useSteps();
  const { userId } = useAuth();

  const [userData] = useState<UserInfoValues>(() => {
    const localProfileData: IStep[] = JSON.parse(localStorage.getItem(`profileSteps_${userId}`) || '[]').filter((d: IStep) => d.step === 'user');

    if (localProfileData.length > 0 && localProfileData[0].step_data) {
      return localProfileData[0].step_data as UserInfoValues;
    } else {
      return {
        name: '',
        city: '',
        birthdate: '',
      };
    }
  });

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

  const { values, setFieldValue, errors, handleSubmit, isSubmitting, canSubmit } = useForm<UserInfoValues>({
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
        toast.success(translateMessage(data.message));
        updateStepData(values, currentStepTitle as Steps);

        completeStep(currentStepTitle as Steps);
        toggleStep('pets');
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  const [rawBirthdate, setRawBirthdate] = useState(values.birthdate);
  const [isBirthdateTouched, setIsBirthdateTouched] = useState(false);

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setRawBirthdate(newValue);

    if (!isBirthdateTouched) {
      setIsBirthdateTouched(true);
    }

    if (/^\d{2}\.\d{2}\.\d{4}$/.test(newValue)) {
      const date = parseDateString(newValue);
      toggleSelectedDate(date, 'user_birthdate');

      setFieldValue('birthdate', newValue);

    } else {
      toggleSelectedDate(null, 'user_birthdate');
      setFieldValue('birthdate', '');
    }
  };

  useEffect(() => {
    if (selectedDate.user_birthdate) {
      const formattedDate = formatDate(selectedDate.user_birthdate.date, 'DD.MM.YYYY');
      if (values.birthdate !== formattedDate) {
        setFieldValue('birthdate', formattedDate);
        setRawBirthdate(formattedDate);
      }
    }
  }, [selectedDate, setFieldValue, values.birthdate]);



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
            onChange={(e) => {
              setFieldValue('name', e.target.value)
            }}
          />
        </div>

        <div className={styles.input_container}>
          <Input
            label={translateMessage('field.input.registrationAddress.label')}
            type="text"
            helperText={translateMessage(errors?.city || 'errors?.city') || ''}
            isError={!!errors?.city || false}
            value={values.city}
            onChange={(e) => {
              setFieldValue('city', e.target.value)
            }}
          />
        </div>

        <div className={styles.input_container}>
          <DateInput
            label={translateMessage('field.input.birthday.label')}
            type="text"
            helperText={translateMessage(errors?.birthdate || 'errors?.birthdate') || ''}
            isError={!!errors?.birthdate || (isBirthdateTouched && !rawBirthdate.length) || false}
            value={rawBirthdate}
            components={{
              indicator: () => (
                <div onClick={() => setIsCalendar(!isCalendar)}>
                  <CalendarSvg isOpen={isCalendar} />
                </div>
              )
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleBirthdateChange(e)
            }}
          />
        </div>

        {isCalendar && <Calendar type="user" setFieldValue={setFieldValue} setRawBirthdate={setRawBirthdate} />}

        <Button disabled={isSubmitting || canSubmit} type="submit">
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
