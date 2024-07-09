import React, { useState, useCallback, useEffect } from 'react';

interface usePasswordRulesProps {
  password: string;
  passwordRepeat?: string
}

const usePasswordRules = ({passwordRepeat, password}: usePasswordRulesProps) => {

  const [passwordRuleChecker, setPasswordRuleChecker] = useState({
    passwords_match: false,
    contain_number: false,
    contain_uppercase: false,
    contain_lowercase: false,
    contain_5_characters: false,
  });

  const rules = React.useMemo(() => [
    {
      intlPath: "page.registration.step.fillLoginDataStep.passwordRules.containNumbers",
      isCorrect: passwordRuleChecker.contain_number
    },
    {
      intlPath: "page.registration.step.fillLoginDataStep.passwordRules.containUppercase",
      isCorrect: passwordRuleChecker.contain_uppercase
    },
    {
      intlPath: "page.registration.step.fillLoginDataStep.passwordRules.containLowerCase",
      isCorrect: passwordRuleChecker.contain_lowercase
    },
    {
      intlPath: "page.registration.step.fillLoginDataStep.passwordRules.contain5Characters",
      isCorrect: passwordRuleChecker.contain_5_characters
    },
    {
      intlPath: "page.registration.step.fillLoginDataStep.passwordRules.mustMatch",
      isCorrect: passwordRuleChecker.passwords_match
    },
  ],[passwordRuleChecker])

  const [isRulesCompleted, setIsRulesCompleted] = useState<boolean>(false)

  const validatePasswordRules = useCallback((password: string, passwordRepeat?: string ) => ({
    passwords_match: password.length > 0 && password === passwordRepeat,
    contain_number: /\d/.test(password),
    contain_uppercase: /[A-Z]/.test(password),
    contain_lowercase: /[a-z]/.test(password),
    contain_5_characters: password.length >= 5
  }), []);

  useEffect(() => {
    setPasswordRuleChecker(validatePasswordRules(password, passwordRepeat));
  }, [password, passwordRepeat]);

  useEffect(() => {
    setIsRulesCompleted(!Object.values(passwordRuleChecker).includes(false))
  }, [passwordRuleChecker]);

  return { passwordRuleChecker, isRulesCompleted, rules };
};

export default usePasswordRules;
