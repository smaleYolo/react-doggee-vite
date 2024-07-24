import React from 'react';

interface PlusSvgProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const PlusSvg = ({ width, height, ...props }: PlusSvgProps) => {
  return (
    <svg viewBox="0 0 15 14" width={width || '12'} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 2V12M2.5 7H12.5" stroke="#93B1FF" strokeWidth="4" strokeLinecap="round" />
    </svg>

  );
};