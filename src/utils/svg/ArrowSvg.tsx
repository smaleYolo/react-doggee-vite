import { useTheme } from '@features/theming';
import type { SVGProps } from 'react';
import React from 'react';

interface ArrowSvgProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export const ArrowSvg = ({ width, height }: ArrowSvgProps) => {
  const { theme } = useTheme();

  return (
    <svg
      fill="none"
      height={height || "6"}
      viewBox="0 0 10 6"
      width={width || "10"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M0.21967 5.28033C-0.0732231 4.98744 -0.0732231 4.51256 0.21967 4.21967L4.21967 0.21967C4.51256 -0.0732231 4.98744 -0.0732231 5.28033 0.21967L9.28033 4.21967C9.57322 4.51256 9.57322 4.98744 9.28033 5.28033C8.98744 5.57322 8.51256 5.57322 8.21967 5.28033L4.75 1.81066L1.28033 5.28033C0.987437 5.57322 0.512563 5.57322 0.21967 5.28033Z"
        fill={theme === 'light' ? "black" : 'white'}
        fillOpacity="0.5"
        fillRule="evenodd"
      />
    </svg>


  );
};