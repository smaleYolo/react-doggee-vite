export const validateIsEmpty = (value: string | number | readonly string[] | undefined) => {
  if (typeof value === 'string' && !value) return 'validations.required';
  if (typeof value === 'number' && value === 0) return 'validations.required';
  if (Array.isArray(value) && value.length === 0) return 'validations.required';
  if (value === undefined) return 'validations.required';
  return null;
};

export const validateField = (value: string | number | readonly string[] | undefined) => {
  return validateIsEmpty(value);
};

export const validateUsername = (value: string | number | readonly string[] | undefined) => {
  return validateIsEmpty(value);
};

export const validatePassword = (value: string | number | readonly string[] | undefined) => {
  return validateIsEmpty(value);
};

export const loginValidateSchema = {
  username: validateUsername,
  password: validatePassword,
  field: validateField,
};

export const validateLoginForm = (name: keyof typeof loginValidateSchema, value: string | number | readonly string[] | undefined) => {
  return loginValidateSchema[name](value);
};