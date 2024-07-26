import React, { useEffect, useState } from 'react';
import { Input, WeightInput } from '@common/fields';
import { DateInput } from '@inputs/Inputs/DateInput';
import { Calendar } from '@common/Calendar/Calendar.tsx';
import { Button } from '@common/buttons';

import styles from '../FillProfile.module.css';

import { useIntl } from '@features/intl';
import { CalendarSvg } from '@utils/svg';
import { PetInfoValues, IStep, Steps, UserInfoValues, useUser } from '@utils/contexts';
import { useForm, useMutation } from '@utils/hooks';
import { formatDate, validateField } from '@helpers/*';
import { useDate } from '@features/calendar';
import { api } from '@utils/api';
import { toast } from 'react-toastify';

interface CreatePetResponse {
  message: string;
}

interface CreatePetPayload extends Omit<PetInfoValues, 'birthdate' | 'weight'>{
  birthdate: Date;
  weight?: number;
}

export const PetsInfo = () => {
  const { translateMessage } = useIntl();
  const { toggleStep, userId, completeStep, currentStepTitle, updateStepData } = useUser()
  const { isCalendar, setIsCalendar, parseDateString, setSelectedDay, selectedDay } = useDate()

  const [petData] = useState<PetInfoValues>(() => {
    const petData: IStep[] = JSON.parse(localStorage.getItem(`profileSteps_${userId}`) || '[]').filter((d: IStep) => d.step === 'pets');

    if (petData.length > 0 && petData[0].step_data) {
      return petData[0].step_data as PetInfoValues
    } else {
      return {
        name: '',
        breed: '',
        birthdate: '',
        weight: ''
      }
    }
  })
  const [isStepCompleted] = useState<boolean>(() => {
    const petData: IStep[] = JSON.parse(localStorage.getItem(`profileSteps_${userId}`) || '[]').filter((d: IStep) => d.step === 'pets');

    if (petData.length > 0 && petData[0].step_data) {
      return petData[0].completed
    } else {
      return false
    }
  })

  const {mutation: addPetInfoMutation } = useMutation<CreatePetResponse, PetInfoValues>({
    request: (petInfo: PetInfoValues) => {
      const updatedPetInfo = {
        ...petInfo,
        birthdate: new Date(petInfo.birthdate.split('.').reverse().join('-')),
        weight: Number(petInfo.weight),
      };
      return api.post<CreatePetResponse, CreatePetPayload>(`/users/${userId}/dogs`, updatedPetInfo);
    }
  })

  const { values, setFieldValue, errors, handleSubmit, resetForm } = useForm<PetInfoValues>({
    initialValues: {
      name: petData.name,
      breed: petData.breed,
      birthdate: petData.birthdate,
      weight: petData.weight
    },
    validateSchema: {
      name: validateField,
      breed: validateField,
      birthdate: validateField,
      weight: validateField
    },
    onSubmit: async (values) => {
      try {
        const data = await addPetInfoMutation(values)
        toast.success(translateMessage('validations.success', { msg: data.message}));
        updateStepData({name: '', weight: '', breed: '', birthdate: ''}, currentStepTitle as Steps);

        completeStep(currentStepTitle as Steps);
        toggleStep('profile');
      } catch (error) {
        toast.error(translateMessage('error', {error: (error as Error).message}));
      }
    }
  });

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(newValue)) {
      const date = parseDateString(newValue);
      setSelectedDay(date);
      setFieldValue('birthdate', newValue);
    } else {
      setFieldValue('birthdate', newValue);
    }
  };

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = formatDate(selectedDay.date, 'DD.MM.YYYY');
      if (values.birthdate !== formattedDate) {
        setFieldValue('birthdate', formattedDate);
      }
    }
  }, [selectedDay]);


  return (
    <>
      <div className={styles.step_text}
        onClick={() => toggleStep('user')}
      >
        <span>
          {translateMessage('button.goNextStep')}
        </span>
      </div>

      <form
        className={styles.form_container}
        onSubmit={handleSubmit}
      >
        <div className={styles.input_container}>
          <Input
            label={translateMessage('field.input.dogName.label')}
            type="text"
            helperText={translateMessage(errors?.name || 'errors?.name') || ''}
            isError={!!errors?.name || false}
            value={values.name}
            onChange={(e) => setFieldValue('name', e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <Input
            label={translateMessage('field.input.breed.label')}
            type="text"
            helperText={translateMessage(errors?.breed || 'errors?.breed') || ''}
            isError={!!errors?.breed || false}
            value={values.breed}
            onChange={(e) => setFieldValue('breed', e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <DateInput
            label={translateMessage('field.input.dogBirthday.label')}
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
          />
        </div>

        <div className={styles.input_container}>
          <WeightInput
            label={translateMessage('field.input.dogWeight.label')}
            type="text"
            helperText={translateMessage(errors?.weight || 'errors?.weight') || ''}
            isError={!!errors?.weight || false}
            value={values.weight}
            onChange={(e) => setFieldValue('weight', e.target.value)}
            components={{
              indicator: () => (
                <span
                  className={styles.kg_indicator}
                >
                  kg
                </span>
              )
            }}
          />
        </div>

        {isCalendar && <Calendar />}

        <Button type="submit">
          {
            isStepCompleted ? (
              translateMessage('page.registration.step.addYourPetsStep.addAnotherPet')
            ) : (
              translateMessage('button.next')
            )
          }
        </Button>
      </form>
    </>
  );
};
