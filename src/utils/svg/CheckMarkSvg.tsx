import React from 'react';

interface CheckMarkSvgProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export const CheckMarkSvg = ({
                               width, height
                             }: CheckMarkSvgProps) => (
  <svg
    fill="none"
    viewBox="0 0 17 12"
    height={height}
    width={width || '15.0000'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M16.0326 2.87661C16.5818 2.25638 16.5242 1.30838 15.904 0.759195C15.2838 0.210007 14.3358 0.267598 13.7866 0.887827L7.43865 8.0569L3.0076 4.63263C2.3521 4.12606 1.41006 4.2468 0.903495 4.9023C0.396929 5.5578 0.517665 6.49984 1.17317 7.00641L6.51311 11.1331C6.54752 11.1704 6.58416 11.2064 6.623 11.2408C7.24323 11.7899 8.19123 11.7324 8.74042 11.1121L16.0326 2.87661Z"
      fill="#93B1FF"
      fillRule="evenodd"
    />
  </svg>
);