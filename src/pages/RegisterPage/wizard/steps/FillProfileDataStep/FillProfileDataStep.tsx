import React, { useEffect } from 'react';
import styles from '../../../RegisterPage.module.css';
import { useIntl } from '@features/intl';
import { Input } from '@common/fields';
import { Button } from '@common/buttons';
import { DateInput } from '@inputs/Inputs/DateInput';
import { CalendarSvg } from '@utils/svg';
import { Calendar } from '@common/Calendar/Calendar';
import { useDate } from '@utils/contexts';
import { formatDate, validateUsername } from '@helpers/*';
import { useForm } from '@utils/hooks';
import { toast } from 'react-toastify';

export interface ProfileFormDataValues {
  name: string;
  city: string;
  birthday: string | number | readonly string[] | undefined;
}

export const FillProfileDataStep = () => {
  const { translateMessage } = useIntl();
  const { isCalendar, setIsCalendar } = useDate();
  const { selectedDay } = useDate();

  const { values, setFieldValue, errors, handleSubmit, isSubmitting } = useForm<ProfileFormDataValues>({
    initialValues: {
      name: '',
      city: '',
      birthday: ''
    },
    validateSchema: {
      name: validateUsername,
      city: validateUsername,
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = formatDate(selectedDay.date, 'DD.MM.YYYY');
      setFieldValue('birthday', formattedDate);
    }
  }, [selectedDay]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
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
                onChange={() => setIsCalendar(!isCalendar)}
                onClick={() => {
                  if (values.birthday) {
                    setIsCalendar(!isCalendar);
                  }
                }}
                components={{
                  indicator: () => (
                    <div onClick={() => setIsCalendar(!isCalendar)}>
                      <CalendarSvg isOpen={isCalendar} />
                    </div>
                  )
                }}
              />
            </div>

            {isCalendar && <Calendar />}

            <Button type="submit" disabled={isSubmitting}>
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
      </div>
    </div>
  );
};
