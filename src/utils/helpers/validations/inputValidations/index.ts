export interface FormErrors {
  username: string | null;
  password: string | null;
}


export const validateIsEmpty = (value: string) => {
  if (!value) return 'validations.required';
  return null;
};

export const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

export const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

export const loginValidateSchema = {
  username: validateUsername,
  password: validatePassword
};

export const validateLoginForm = (name: keyof typeof loginValidateSchema, value: string) => {
  return loginValidateSchema[name](value);
};