import React from 'react';

/**
 * Atmospheric Luxury celestial star glyphs
 */
export const CelestialStar: React.FC<{
  glyph?: '✦' | '✧' | '★';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ glyph = '✦', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-sm',
  }[size];

  return (
    <span
      className={`inline-block select-none text-[#C29043] opacity-75 animate-star ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      {glyph}
    </span>
  );
};

/**
 * Cosmic subtle concentric gold rings from Atmospheric Luxury theme
 */
export const AtmosphericRings: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 border border-[#C29043] rounded-full opacity-[0.08]" />
      <div className="absolute -top-16 -left-16 w-56 h-56 sm:w-72 sm:h-72 border border-[#C29043] rounded-full opacity-[0.05]" />
      <div className="absolute -bottom-28 -right-28 w-80 h-80 sm:w-[420px] sm:h-[420px] border border-[#C29043] rounded-full opacity-[0.08]" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 border border-[#C29043] rounded-full opacity-[0.05]" />
      
      {/* Floating celestial sparkle coordinates */}
      <div className="absolute top-[18%] left-[8%] text-[#F3DC9B] text-xs opacity-25 animate-star">✦</div>
      <div className="absolute top-[35%] right-[12%] text-[#C29043] text-[9px] opacity-30 animate-star [animation-delay:1.2s]">✧</div>
      <div className="absolute bottom-[28%] left-[15%] text-[#F3DC9B] text-[10px] opacity-25 animate-star [animation-delay:2.4s]">✦</div>
      <div className="absolute top-[68%] right-[20%] text-[#C29043] text-xs opacity-30 animate-star [animation-delay:0.7s]">✧</div>
    </div>
  );
};

/**
 * Atmospheric Luxury Hairline + 3-Dot Divider
 */
export const AtmosphericDivider: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#C29043'
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="h-[1px] w-12 sm:w-16 bg-[#C29043] opacity-40" />
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-[#C29043] opacity-40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C29043] shadow-[0_0_8px_#C29043]" />
        <div className="w-1 h-1 rounded-full bg-[#C29043] opacity-40" />
      </div>
      <div className="h-[1px] w-12 sm:w-16 bg-[#C29043] opacity-40" />
    </div>
  );
};

/**
 * Candelabra divider with 3 candles and animated flickering flames
 */
export const CandelabraDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-6 select-none ${className}`} id="candelabra-divider">
      <div className="flex items-end justify-center gap-6 relative">
        {/* Left Candle */}
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-4 bg-gradient-to-t from-[#DEAB5B] to-[#FDF3DF] rounded-full animate-candle" />
          <div className="w-0.5 h-1.5 bg-[#4A3B22]" />
          <div className="w-2 h-7 bg-gradient-to-r from-[#C29043] via-[#F3DC9B] to-[#C29043] rounded-sm shadow-sm" />
        </div>

        {/* Center Main Candle (Taller) */}
        <div className="flex flex-col items-center -translate-y-2">
          <div className="w-3 h-5 bg-gradient-to-t from-[#DEAB5B] to-[#FDF3DF] rounded-full animate-candle [animation-delay:0.4s]" />
          <div className="w-0.5 h-2 bg-[#4A3B22]" />
          <div className="w-2.5 h-10 bg-gradient-to-r from-[#C29043] via-[#F3DC9B] to-[#C29043] rounded-sm shadow-sm" />
        </div>

        {/* Right Candle */}
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-4 bg-gradient-to-t from-[#DEAB5B] to-[#FDF3DF] rounded-full animate-candle [animation-delay:0.8s]" />
          <div className="w-0.5 h-1.5 bg-[#4A3B22]" />
          <div className="w-2 h-7 bg-gradient-to-r from-[#C29043] via-[#F3DC9B] to-[#C29043] rounded-sm shadow-sm" />
        </div>
      </div>

      {/* Ornate Golden Candelabra Base */}
      <svg
        className="w-36 h-8 text-[#C29043] -mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        viewBox="0 0 144 32"
        fill="currentColor"
      >
        <path d="M72 16 C60 16 52 8 40 8 C36 8 34 10 30 14 C36 18 48 20 60 20 L66 28 L78 28 L84 20 C96 20 108 18 114 14 C110 10 108 8 104 8 C92 8 84 16 72 16 Z" />
        <circle cx="72" cy="18" r="3" fill="#FDF3DF" opacity="0.8" />
        <path d="M25 14 C22 14 18 16 16 20 C22 22 30 20 32 16 Z" />
        <path d="M119 14 C122 14 126 16 128 20 C122 22 114 20 112 16 Z" />
      </svg>
    </div>
  );
};

/**
 * Ornate Rococó Golden Divider
 */
export const RococoDivider: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#C29043'
}) => {
  return (
    <div className={`flex items-center justify-center my-6 gap-3 ${className}`}>
      <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent via-[#C29043]/50 to-[#C29043]" />
      
      {/* Central Rococo emblem */}
      <svg className="w-12 h-6" viewBox="0 0 48 24" fill={color}>
        <path d="M24 2 C20 6 16 6 12 4 C10 8 6 10 2 10 C6 12 8 16 8 20 C12 16 18 18 24 22 C30 18 36 16 40 20 C40 16 42 12 46 10 C42 10 38 8 36 4 C32 6 28 6 24 2 Z" opacity="0.9" />
        <circle cx="24" cy="12" r="2.5" fill="#FDF3DF" />
      </svg>

      <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent via-[#C29043]/50 to-[#C29043]" />
    </div>
  );
};

/**
 * Corner Filigree for luxury frames
 */
export const CornerOrnament: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const rotationClass = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2 rotate-90',
    'bottom-left': 'bottom-2 left-2 -rotate-90',
    'bottom-right': 'bottom-2 right-2 rotate-180',
  }[position];

  return (
    <div className={`absolute ${rotationClass} pointer-events-none w-8 h-8 sm:w-10 sm:h-10 text-[#C29043]/70 z-10`}>
      <svg viewBox="0 0 40 40" fill="currentColor">
        <path d="M0 0 L16 0 C16 4 12 8 8 8 C8 12 4 16 0 16 Z M0 0 L40 0 C32 4 24 12 24 24 C12 24 4 32 0 40 L0 32 C3 26 8 22 14 20 C10 16 6 10 4 0 Z" />
      </svg>
    </div>
  );
};

/**
 * Stained Glass Accent Motif
 */
export const StainedGlassAccent: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center p-2 rounded-full border border-[#C29043]/30 bg-[#081426]/60 backdrop-blur-sm ${className}`}>
      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#7A1727] via-[#172B4D] to-[#C29043] opacity-80" />
    </div>
  );
};

/**
 * Golden Rose Seal
 */
export const GoldenRoseSeal: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#DEAB5B] via-[#C29043] to-[#9E6F28] p-0.5 shadow-[0_0_20px_rgba(194,144,67,0.4)] ${className}`}>
      <div className="w-full h-full rounded-full bg-[#081426] flex items-center justify-center border border-[#F3DC9B]/40">
        <span className="text-2xl filter drop-shadow-[0_0_6px_#DEAB5B]">🥀</span>
      </div>
    </div>
  );
};
