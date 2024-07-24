import React, { useEffect } from 'react';
import { Input, WeightInput } from '@common/fields';
import { DateInput } from '@inputs/Inputs/DateInput';
import { Calendar } from '@common/Calendar/Calendar.tsx';
import { Button } from '@common/buttons';

import styles from '../FillProfile.module.css';

import { useIntl } from '@features/intl';
import { CalendarSvg } from '@utils/svg';
import { useUser } from '@utils/contexts';
import { useForm, useMutation } from '@utils/hooks';
import { formatDate, validateField } from '@helpers/*';
import { useDate } from '@features/calendar';
import { api } from '@utils/api';
import { toast } from 'react-toastify';

interface CreatePetResponse {
  message: string;
}

interface CreatePetValues {
  name: string;
  breed: string;
  birthdate: string;
  weight?: string;
}

interface CreatePetPayload extends Omit<CreatePetValues, 'birthdate' | 'weight'>{
  birthdate: Date;
  weight?: number;
}

export const PetsInfo = () => {
  const { translateMessage } = useIntl();
  const { toggleStep, getUserId, completeStep, currentStep } = useUser()
  const { isCalendar, setIsCalendar, parseDateString, setSelectedDay, selectedDay } = useDate()

  const {mutation: addPetInfoMutation } = useMutation<CreatePetResponse, CreatePetValues>({
    request: (petInfo: CreatePetValues) => {
      const updatedPetInfo = {
        ...petInfo,
        birthdate: new Date(petInfo.birthdate.split('.').reverse().join('-')),
        weight: Number(petInfo.weight),
      };
      return api.post<CreatePetResponse, CreatePetPayload>(`/users/${getUserId()}/dogs`, updatedPetInfo);
    }
  })

  const { values, setFieldValue, errors, handleSubmit, isSubmitting, resetForm } = useForm<CreatePetValues>({
    initialValues: {
      name: '',
      breed: '',
      birthdate: '',
      weight: ''
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
        console.log(data);
        toast.success(translateMessage('validations.success', { msg: data.message}));
        completeStep(currentStep);
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
          {translateMessage('button.next')}
        </Button>
      </form>
    </>
  );
};
