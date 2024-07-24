import React from 'react';

interface CrossProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const CrossSvg = ({ width, height, ...props }: CrossProps) => {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      width={width || '10'}
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Применяем остальные переданные свойства
    >
      <path d="M2 10L10 2M2 2L10 10" stroke="#E36464" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};