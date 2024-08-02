
import React, { useState, useCallback } from 'react';

interface useFormProps<Values> {
  initialValues: Values;
  validateSchema?: {
    [Key in keyof Values]?: (value: Values[Key]) => string | null
  };
  validateOnChange?: boolean;
  onSubmit?: (values: Values) => void;
}

export const useForm = <Values>({
                                  initialValues,
                                  validateSchema,
                                  onSubmit,
                                  validateOnChange = true
                                }: useFormProps<Values>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [Key in keyof Values]?: string } | null>(null); // { username: 'error_message' } | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  //TODO: Добавить проверку на пустые поля values
  const [canSubmit, setCanSubmit] = useState(false);

  const validateField = <T extends keyof Values>(field: T, value: Values[T]) => {
    if (validateSchema && validateSchema[field]) {
      return validateSchema[field]?.(value);
    }
    return null;
  };

  const setFieldError = <T extends keyof Values>(field: T, error: string | null | undefined) => {
    setErrors({ ...errors, [field]: error });
  };


  const setFieldValue = useCallback(<T extends keyof Values>(field: T, value: Values[T]) => {
    setValues((prevValues) => {
      if (prevValues[field] !== value) {
        const newValues = { ...prevValues, [field]: value };
        setCanSubmit(true);
        if (validateOnChange) {
          const error = validateField(field, value);
          setFieldError(field, error);
        }
        return newValues;
      }
      return prevValues;
    });
  }, [validateOnChange]);

  const validate = () => {
    const validateErrors: typeof errors = {};
    let isValid = true;

    if (validateSchema) {
      for (const field in validateSchema) {
        const error = validateSchema[field as keyof Values]?.(values[field as keyof Values]);
        if (error) {
          isValid = false;
          validateErrors[field as keyof Values] = error;
        }
      }
    }

    setErrors(validateErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validate() && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Submit error', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors(null);
    setCanSubmit(false); // Сброс canSubmit при сбросе формы
  }, [initialValues]);

  return { values, errors, handleSubmit, isSubmitting, setFieldValue, setFieldError, validate, resetForm, canSubmit: !canSubmit };
};
