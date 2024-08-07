import React, { useEffect,  useState } from 'react';
import styles from '../FillProfile.module.css';

import { Input, Select, WeightInput } from '@common/fields';
import { DateInput } from '@inputs/Inputs/DateInput';
import { Calendar } from '@common/Calendar/Calendar.tsx';
import { Button } from '@common/buttons';
import { useIntl } from '@features/intl';
import { ArrowSvg, CalendarSvg } from '@utils/svg';
import {
  PetInfoValues,
  Steps,
  useDate,
  useCalendar,
  useSteps,
  useDogs
} from '@utils/contexts';
import { useForm } from '@utils/hooks';
import { formatDate, validateField } from '@helpers/*';
import { toast } from 'react-toastify';

export const PetsInfo = () => {
  const { translateMessage } = useIntl();
  const { toggleStep, completeStep, currentStepTitle, updateStepData, profileSteps } = useSteps();
  const { selectedDog, breedsList, updateDogHandler, createDogHandler } = useDogs();
  const { isCalendar, setIsCalendar } = useCalendar();
  const { parseDateString, selectedDate, toggleSelectedDate } = useDate();

  const { values, setFieldValue, errors, handleSubmit, isSubmitting, canSubmit, resetForm } = useForm<PetInfoValues>({
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
        const data = selectedDog ? await updateDogHandler(values) : await createDogHandler(values);

        toast.success(translateMessage(data.message));

        updateStepData({ name: '', weight: '', breed: '', birthdate: '' }, currentStepTitle as Steps);
        toggleSelectedDate(null, 'dog_birthdate');

        completeStep(currentStepTitle as Steps);

        completeStep('profile');
        toggleStep('profile');
      } catch (error) {
        toast.error(translateMessage('error', { error: (error as Error).message }));
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
      toggleSelectedDate(date, 'dog_birthdate');
      setFieldValue('birthdate', newValue);
    } else {
      toggleSelectedDate(null, 'dog_birthdate');
      setFieldValue('birthdate', '');
    }
  };

  useEffect(() => {
    if (selectedDate.dog_birthdate) {
      const formattedDate = formatDate(selectedDate.dog_birthdate.date, 'DD.MM.YYYY');
      if (values.birthdate !== formattedDate) {
        setFieldValue('birthdate', formattedDate);
      }
    }
  }, [selectedDate, setFieldValue, values.birthdate]);

  useEffect(() => {
    if (selectedDog) {
      const selectedDogBD = formatDate(new Date(selectedDog.birthdate), 'DD.MM.YYYY');
      const date = parseDateString(selectedDogBD);

      setFieldValue('name', selectedDog.name);
      setFieldValue('breed', selectedDog.breed);

      setRawBirthdate(selectedDogBD);
      toggleSelectedDate(date, 'dog_birthdate');
      setFieldValue('birthdate', selectedDogBD);

      setFieldValue('weight', String(selectedDog.weight));
    } else {
      resetForm();
      toggleSelectedDate(null, 'dog_birthdate');
      setRawBirthdate('');
    }
  }, [selectedDog]);

  return (
    <>
      <div className={styles.step_text} onClick={() => toggleStep('user')}>
        <span>{translateMessage('button.goNextStep')}</span>
      </div>

      <form className={styles.form_container} onSubmit={handleSubmit}>
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
          <Select
            label={translateMessage('field.input.breed.label')}
            isError={!!errors?.breed}
            helperText={translateMessage(errors?.breed || 'errors?.breed') || ''}
            value={values.breed}
            onChange={(e) => setFieldValue('breed', e.target.value)}
            options={[' ', ...breedsList]}
            components={{
              indicator: () => (
                <span className={styles.indicator_arrow}>
                  <ArrowSvg />
                </span>
              )
            }}
          />
        </div>

        <div className={styles.input_container}>
          <DateInput
            label={translateMessage('field.input.dogBirthday.label')}
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
                <span className={styles.indicator}>
                  kg
                </span>
              )
            }}
          />
        </div>

        {isCalendar && (
          <Calendar
            type="dog"
            setFieldValue={setFieldValue}
            setRawBirthdate={setRawBirthdate}
          />
        )}

        <Button type="submit" disabled={isSubmitting || canSubmit}>
          {profileSteps.find((profStep) => profStep.step === currentStepTitle)?.completed
            ? selectedDog
              ? translateMessage('button.update.pets')
              : translateMessage('page.registration.step.addYourPetsStep.addAnotherPet')
            : translateMessage('button.next')}
        </Button>
      </form>
    </>
  );
};