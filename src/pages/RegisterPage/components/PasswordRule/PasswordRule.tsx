import styles from '@pages/RegisterPage/RegisterPage.module.css';
import React from 'react';

import { IntlText } from '@features/intl/components';
import { CheckMarkSvg, WarningSvg } from '@utils/svg';


interface PasswordRuleProps {
  isCorrect: boolean;
  intlPath: string
}

export const PasswordRule = ({isCorrect, intlPath}: PasswordRuleProps) => {
  return (
    <div className={styles.rules_container_main_item}>
      {isCorrect ? <CheckMarkSvg /> : <WarningSvg />}
      <IntlText
        path={intlPath}
        ruleCheck={isCorrect}
      />
    </div>
  );
};
