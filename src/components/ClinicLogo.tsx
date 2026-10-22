import React from 'react';

interface Props {
  className?: string;
  showText?: boolean;
  dark?: boolean;
}

export const ClinicLogo: React.FC<Props> = ({
  className = 'w-14 h-14',
  showText = true,
}) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 300 340"
        className="w-full h-full drop-shadow-md select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pure White Circle Background */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="10"
        />

        {/* Pure Black SR Interlocked Monogram Emblem */}
        <g>
          {/* Main R character */}
          <path
            d="M 125 55 L 125 240 M 125 55 L 175 55 C 205 55 215 75 215 95 C 215 120 195 135 165 135 L 125 135 M 160 135 L 230 235"
            stroke="#0f172a"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* R Top & Bottom Serifs */}
          <path
            d="M 105 55 L 145 55 M 105 240 L 155 240"
            stroke="#0f172a"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Interlocking S character */}
          <path
            d="M 190 80 C 140 60 100 100 115 140 C 130 180 200 160 185 210 C 170 250 105 240 90 200"
            stroke="#0f172a"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Dr. sarikhani Typography Below Circle */}
        {showText && (
          <text
            x="150"
            y="325"
            textAnchor="middle"
            className="font-serif"
            fontSize="34"
            letterSpacing="2.5"
            fontWeight="700"
            fill="#0f172a"
          >
            Dr. sarikhani
          </text>
        )}
      </svg>
    </div>
  );
};
