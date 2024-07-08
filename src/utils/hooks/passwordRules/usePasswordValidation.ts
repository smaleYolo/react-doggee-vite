import { useState, useCallback, useEffect } from 'react';

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
  const [isRulesCompleted, setIsRulesCompleted] = useState<boolean>(!Object.values(passwordRuleChecker).includes(false))

  const validatePasswordRules = useCallback(({ password, passwordRepeat }: usePasswordRulesProps) => ({
    passwords_match: password.length > 0 && password === passwordRepeat,
    contain_number: /\d/.test(password),
    contain_uppercase: /[A-Z]/.test(password),
    contain_lowercase: /[a-z]/.test(password),
    contain_5_characters: password.length >= 5
  }), []);

  useEffect(() => {
    setPasswordRuleChecker(validatePasswordRules({password, passwordRepeat}));
  }, [password, passwordRepeat]);

  useEffect(() => {
    setIsRulesCompleted(!Object.values(passwordRuleChecker).includes(false))
  }, [passwordRuleChecker]);

  return { passwordRuleChecker, isRulesCompleted };
};

export default usePasswordRules;
