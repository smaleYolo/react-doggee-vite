import React from 'react';

import { CheckMarkSvg, WarningSvg } from '@utils/svg';
import { IntlText } from '@features/intl/components';

import styles from '@pages/RegisterPage/RegisterPage.module.css';

interface PasswordRuleProps {
  isCorrect: boolean;
  intlPath: string
}

export const PasswordRule = ({isCorrect, intlPath}: PasswordRuleProps) => {
  return (
    <div className={styles.section_rules_item}>
      {isCorrect ? <CheckMarkSvg /> : <WarningSvg />}
      <IntlText
        path={intlPath}
        ruleCheck={isCorrect}
      />
    </div>
  );
};
