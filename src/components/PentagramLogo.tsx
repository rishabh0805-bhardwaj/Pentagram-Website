import React from 'react';

interface PentagramLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'emblem' | 'horizontal';
  theme?: 'light' | 'dark';
}

export const PentagramLogo: React.FC<PentagramLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  theme = 'light',
}) => {
  // Dimensions mapping
  const sizeMap = {
    sm: { emblem: 36, height: 36, textH: 14 },
    md: { emblem: 46, height: 46, textH: 16 },
    lg: { emblem: 60, height: 60, textH: 20 },
    xl: { emblem: 84, height: 84, textH: 26 },
  };

  const currentSize = sizeMap[size];
  const crimson = '#C7244E';
  const crimsonDark = '#9C2542';
  const textColor = theme === 'dark' ? '#FAF6F0' : '#323232';
  const subtextColor = theme === 'dark' ? '#C69255' : '#6B6565';

  // The official emblem based directly on the provided logo image:
  // Concentric swirling circular lines around a pentagon with armchair & floor lamp cutout
  const renderEmblem = (dim: number) => (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:rotate-6"
    >
      {/* Dynamic concentric swirling circular rings */}
      <circle
        cx="100"
        cy="100"
        r="94"
        stroke={crimson}
        strokeWidth="3.2"
        strokeDasharray="560 40"
        strokeLinecap="round"
      />
      <circle
        cx="100"
        cy="100"
        r="88"
        stroke={crimson}
        strokeWidth="2.2"
        strokeDasharray="490 60"
        strokeDashoffset="120"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle
        cx="100"
        cy="100"
        r="83"
        stroke={crimson}
        strokeWidth="1.4"
        strokeDasharray="420 80"
        strokeDashoffset="240"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Central Solid Crimson Pentagon */}
      {/* Pentagon vertices: Top Point (100, 52), Right Upper (138, 76), Right Lower (126, 120), Left Lower (74, 120), Left Upper (62, 76) */}
      <path
        d="M 100 52
           L 138 76
           L 126 120
           L 74 120
           L 62 76
           Z"
        fill={crimson}
      />

      {/* Negative space / White Cutout inside pentagon:
          1. Armchair on left
          2. Floor Lamp on center/right */}
      <g fill="#FFFFFF">
        {/* Floor Lamp */}
        {/* Lampshade (Trapezoid) */}
        <path d="M 95 65 L 105 65 L 108 76 L 92 76 Z" />
        {/* Lamp Pole */}
        <rect x="98.8" y="76" width="2.4" height="29" rx="1.2" />
        {/* Lamp Circular/Oval Base */}
        <ellipse cx="100" cy="106" rx="6" ry="2" />

        {/* Armchair silhouette (left side cutout) */}
        {/* Backrest curved cushion */}
        <path
          d="M 60 76
             C 60 72, 73 72, 74 76
             L 74 91
             C 74 93, 72 94, 69 94
             L 60 94
             Z"
        />
        {/* Armchair Seat & Armrest Pill */}
        <rect x="67" y="84" width="20" height="7.5" rx="3.5" />
        {/* Armchair front round bolster */}
        <path
          d="M 85 84
             C 89 84, 91 87, 91 91
             L 91 106
             C 91 109, 87 110, 84 109
             L 84 92
             C 84 87, 85 84, 85 84
             Z"
        />
        {/* Armchair cushion depth shadow / seat front */}
        <path d="M 68 93 L 86 93 C 87.5 93, 88.5 94.5, 88.5 96 L 88.5 99 C 88.5 100.5, 87 101, 85 101 L 68 101 Z" />
        {/* Armchair front leg */}
        <rect x="70" y="101" width="3" height="7" rx="1" />
      </g>
    </svg>
  );

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem(currentSize.emblem)}
      </div>
    );
  }

  if (variant === 'full') {
    // Exact stacked layout matching the official circular logo image
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {renderEmblem(currentSize.emblem * 1.4)}
        <div className="mt-2.5 tracking-tight">
          <div
            className="font-sans font-extrabold text-[#383838] tracking-[0.08em] uppercase"
            style={{ fontSize: currentSize.textH * 1.25, lineHeight: 1.1 }}
          >
            PENTAGRAM
          </div>
          <div
            className="font-sans font-medium text-[#6B6565] tracking-[0.28em] uppercase mt-0.5"
            style={{ fontSize: currentSize.textH * 0.58 }}
          >
            YOUR HOME EXPERT
          </div>
        </div>
      </div>
    );
  }

  // Default 'horizontal' lockup: Emblem on left, bold PENTAGRAM and YOUR HOME EXPERT on right
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {renderEmblem(currentSize.emblem)}
      <div className="flex flex-col justify-center select-none text-left">
        <span
          className="font-sans font-extrabold tracking-[0.08em] uppercase leading-none"
          style={{ color: textColor, fontSize: currentSize.textH }}
        >
          PENTAGRAM
        </span>
        <span
          className="font-sans font-medium tracking-[0.22em] uppercase leading-tight mt-1 text-[9px] sm:text-[10px]"
          style={{ color: subtextColor }}
        >
          YOUR HOME EXPERT
        </span>
      </div>
    </div>
  );
};
