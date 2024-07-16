import React, { useEffect } from 'react';
import styles from '@pages/RegisterPage/RegisterPage.module.css';
import { Input } from '@common/fields';
import { DateInput } from '@inputs/Inputs/DateInput';
import { CalendarSvg } from '@utils/svg';
import { Calendar } from '@common/Calendar/Calendar.tsx';
import { Button } from '@common/buttons';
import { useIntl } from '@features/intl';
import { formatDate, useDate } from '@features/calendar';
import { useForm } from '@utils/hooks';
import { validateUsername } from '@helpers/*';
import { toast } from 'react-toastify';
import { ProfileFormDataValues } from '@pages/FillProfile/FillProfile.tsx';
import { useUser } from '@utils/contexts';

export const UserInfo = () => {
  const { translateMessage } = useIntl();
  const { isCalendar, setIsCalendar, selectedDay, setSelectedDay } = useDate();
  const { toggleStep } = useUser();

  const { values, setFieldValue, errors, handleSubmit, isSubmitting, resetForm } = useForm<ProfileFormDataValues>({
    initialValues: {
      name: '',
      city: '',
      birthday: ''
    },
    validateSchema: {
      name: validateUsername,
      city: validateUsername
    },
    onSubmit: async (values) => {
      try {
        toggleStep('pets');
        resetForm();
        setSelectedDay(null); // Сбрасываем selectedDay
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = formatDate(selectedDay.date, 'DD.MM.YYYY');
      if (values.birthday !== formattedDate) {
        setFieldValue('birthday', formattedDate);
      }
    }
  }, [selectedDay, setFieldValue, values.birthday]);

  return (
    <>
      <section className={styles.section_left}>
        <h1 className={styles.section_header}>
          {translateMessage('page.registration.step.fillProfileData.title')}
        </h1>

        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              label={translateMessage('field.input.name.label')}
              type="text"
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
            />
          </div>

          <div className={styles.input_container}>
            <Input
              label={translateMessage('field.input.registrationAddress.label')}
              type="text"
              value={values.city}
              onChange={(e) => setFieldValue('city', e.target.value)}
            />
          </div>

          <div className={styles.input_container}>
            <DateInput
              label={translateMessage('field.input.birthday.label')}
              type="text"
              value={values.birthday}
              components={{
                indicator: () => (
                  <div onClick={() => setIsCalendar(!isCalendar)}>
                    <CalendarSvg isOpen={isCalendar} />
                  </div>
                )
              }}
              onChange={() => setIsCalendar(!isCalendar)}
              onClick={() => setIsCalendar(!isCalendar)}
            />
          </div>

          {isCalendar && <Calendar />}

          <Button disabled={isSubmitting} type="submit">
            {translateMessage('button.next')}
          </Button>
        </form>
      </section>

      <section className={styles.section_right}>
        <div className={styles.section_right_header}>
          DOGGEE
        </div>

        <div className={styles.section_right_content}>
          <b>{translateMessage('page.registration.step.fillProfileData.hint.registrationAddressHint')}</b>
        </div>

        <div className={styles.section_right_bottom}>
          <span className={styles.section_right_sign_in}>
            {translateMessage('page.registration.skipAndFillInLater')}
          </span>
        </div>
      </section>
    </>
  );
};
