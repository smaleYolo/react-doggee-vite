import React from 'react';

interface PenSvgProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const PenSvg = ({ width, height, ...props }: PenSvgProps) => {
  return (
    <svg viewBox="0 0 12 12" width={width || '14'} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 9.50035V12H2.49965L9.87196 4.62769L7.37231 2.12804L0 9.50035ZM11.805 2.69463C12.065 2.43466 12.065 2.01472 11.805 1.75476L10.2452 0.194973C9.98528 -0.064991 9.56534 -0.064991 9.30537 0.194973L8.08554 1.4148L10.5852 3.91446L11.805 2.69463Z"
        fill="#93B1FF" />
    </svg>

  );
};