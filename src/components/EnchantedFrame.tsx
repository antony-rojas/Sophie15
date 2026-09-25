import React from 'react';
import { IMAGES } from '../config';

interface EnchantedFrameProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  variant?: 'hero' | 'default' | 'compact';
}

/**
 * Enchanted Royal Botanical Frame
 * Intricate copper-gold botanical filigree, corner scrolls, side vine flourishes,
 * and double hairline borders framing the card rectangle in deep midnight luxury.
 */
export const EnchantedFrame: React.FC<EnchantedFrameProps> = ({
  children,
  className = '',
  innerClassName = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`relative w-full ${className.includes('max-w-') ? '' : 'max-w-4xl'} mx-auto rounded-3xl p-5 sm:p-8 md:p-11 transition-all duration-700 ${className}`}
    >
      {/* 1. Deep Midnight Navy Background with Atmospheric Radiance */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#030914]/95 via-[#081426]/92 to-[#030914]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.92),0_0_30px_rgba(194,144,67,0.22)] pointer-events-none overflow-hidden">
        {/* Night Sky Cosmic Radial Highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(23,43,77,0.45)_0%,rgba(3,9,20,0.85)_80%)] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(194,144,67,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-[radial-gradient(ellipse_at_bottom,rgba(194,144,67,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Botanical Gold Frame Texture Ambient Layer */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${IMAGES.botanicalFrame})` }}
        />

        {/* Scattered Stardust & Golden Specks */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-6 left-[15%] w-1 h-1 rounded-full bg-[#DEAB5B] opacity-60 shadow-[0_0_4px_#DEAB5B]" />
          <div className="absolute top-10 left-[28%] w-1.5 h-1.5 rounded-full bg-[#C29043] opacity-75 shadow-[0_0_6px_#C29043] animate-pulse" />
          <div className="absolute top-4 right-[20%] w-1 h-1 rounded-full bg-[#F3DC9B] opacity-70 animate-star" />
          <div className="absolute top-12 right-[32%] w-1.5 h-1.5 rounded-full bg-[#C29043] opacity-50" />
          
          <div className="absolute top-1/3 left-4 w-1 h-1 rounded-full bg-[#DEAB5B] opacity-50 animate-star [animation-delay:1s]" />
          <div className="absolute top-1/2 left-6 w-1.5 h-1.5 rounded-full bg-[#C29043] opacity-65 animate-pulse" />
          <div className="absolute top-2/3 left-4 w-1 h-1 rounded-full bg-[#C29043] opacity-40" />

          <div className="absolute top-1/3 right-4 w-1 h-1 rounded-full bg-[#DEAB5B] opacity-50 animate-star [animation-delay:1.5s]" />
          <div className="absolute top-1/2 right-6 w-1.5 h-1.5 rounded-full bg-[#C29043] opacity-65 animate-pulse [animation-delay:0.7s]" />
          <div className="absolute top-2/3 right-4 w-1 h-1 rounded-full bg-[#C29043] opacity-40" />

          <div className="absolute bottom-8 left-[18%] w-1.5 h-1.5 rounded-full bg-[#C29043] opacity-65 animate-pulse [animation-delay:2s]" />
          <div className="absolute bottom-5 left-[35%] w-1 h-1 rounded-full bg-[#DEAB5B] opacity-50" />
          <div className="absolute bottom-7 right-[16%] w-1.5 h-1.5 rounded-full bg-[#F3DC9B] opacity-70 animate-star [animation-delay:0.5s]" />
          <div className="absolute bottom-11 right-[30%] w-1 h-1 rounded-full bg-[#C29043] opacity-55" />
          
          <div className="absolute top-[22%] left-[10%] text-[#DEAB5B] text-[8px] opacity-40 animate-star">✦</div>
          <div className="absolute top-[42%] right-[10%] text-[#DEAB5B] text-[8px] opacity-40 animate-star [animation-delay:1.8s]">✦</div>
          <div className="absolute bottom-[25%] left-[12%] text-[#C29043] text-[9px] opacity-35 animate-star [animation-delay:2.4s]">✧</div>
          <div className="absolute bottom-[35%] right-[14%] text-[#C29043] text-[9px] opacity-35 animate-star [animation-delay:1.1s]">✧</div>
        </div>
      </div>

      {/* 2. Outer Rectangular Metallic Hairline Frame */}
      <div className="absolute inset-0 rounded-3xl border border-[#C29043]/50 pointer-events-none shadow-[inset_0_0_15px_rgba(194,144,67,0.15)]" />

      {/* 3. Inner Fine Hairline Inset Frame with Notched Corners */}
      <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#C29043]/35 pointer-events-none" />

      {/* 4. Left and Right Vertical Botanical Filigree Borders (The Motif Brought to the Front) */}
      <VerticalSideFiligree side="left" />
      <VerticalSideFiligree side="right" />

      {/* 5. Top and Bottom Center Botanical Crest Flourishes */}
      <TopBottomFiligree position="top" />
      <TopBottomFiligree position="bottom" />

      {/* 6. Four Corner Botanical Scroll Clusters */}
      <CornerFiligree position="top-left" />
      <CornerFiligree position="top-right" />
      <CornerFiligree position="bottom-left" />
      <CornerFiligree position="bottom-right" />

      {/* 7. Four Corner Celestial Diamond Accent Jewels */}
      <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#FFF8E7] shadow-[0_0_8px_#FFF8E7,0_0_12px_#DFBA73] pointer-events-none z-20 flex items-center justify-center text-[8px] text-[#8E5F2A]">✦</div>
      <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FFF8E7] shadow-[0_0_8px_#FFF8E7,0_0_12px_#DFBA73] pointer-events-none z-20 flex items-center justify-center text-[8px] text-[#8E5F2A]">✦</div>
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#FFF8E7] shadow-[0_0_8px_#FFF8E7,0_0_12px_#DFBA73] pointer-events-none z-20 flex items-center justify-center text-[8px] text-[#8E5F2A]">✦</div>
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FFF8E7] shadow-[0_0_8px_#FFF8E7,0_0_12px_#DFBA73] pointer-events-none z-20 flex items-center justify-center text-[8px] text-[#8E5F2A]">✦</div>

      {/* 8. Main Inner Content Area (Framed Elegantly with Crisp Legibility) */}
      <div className={`relative z-10 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

/**
 * Vertical Botanical Side Filigree Border
 * Renders the intricate floral / leaf / swirl filigree along the left and right outer borders of the card.
 */
const VerticalSideFiligree: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const isRight = side === 'right';
  const sideClass = isRight ? 'right-0 scale-x-[-1]' : 'left-0';

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${sideClass} w-8 sm:w-12 md:w-14 h-[75%] max-h-[380px] pointer-events-none z-10 flex items-center justify-center`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full text-[#C99A5B] filter drop-shadow-[0_0_6px_rgba(201,154,91,0.4)]"
        viewBox="0 0 44 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`sideGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#DFBA73" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#C99A5B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8E5F2A" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Central Spine Line */}
        <path
          d="M6 10 C6 60 14 100 18 130 C14 160 6 200 6 250"
          stroke={`url(#sideGrad-${side})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Upper Botanical Acanthus Swirl */}
        <path
          d="M8 40 C18 35 30 22 28 14 C25 6 15 10 16 20 C17 26 22 28 26 24 C28 22 28 20 26 18 C24 16 22 17 22 19"
          stroke={`url(#sideGrad-${side})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Upper Sprouting Leaf */}
        <path
          d="M12 42 C20 40 28 45 32 52 C26 52 18 48 12 42 Z"
          fill={`url(#sideGrad-${side})`}
          opacity="0.8"
        />
        <path
          d="M14 62 C22 58 32 64 36 74 C28 73 20 68 14 62 Z"
          fill={`url(#sideGrad-${side})`}
          opacity="0.75"
        />

        {/* Middle Central Rosette & Double Leaf Bloom */}
        <path
          d="M10 110 C22 105 36 112 40 125 C32 126 22 120 16 114 Z"
          fill={`url(#sideGrad-${side})`}
          opacity="0.85"
        />
        <path
          d="M18 130 C28 124 38 130 42 140 C34 140 24 135 18 130 Z"
          fill={`url(#sideGrad-${side})`}
          opacity="0.85"
        />
        <path
          d="M10 150 C22 155 36 148 40 135 C32 134 22 140 16 146 Z"
          fill={`url(#sideGrad-${side})`}
          opacity="0.85"
        />

        {/* Center Pearl Jewels */}
        <circle cx="18" cy="130" r="3" fill="#FFF8E7" />
        <circle cx="18" cy="130" r="1.8" fill="#C99A5B" />
        <circle cx="28" cy="115" r="1.5" fill="#E6C587" />
        <circle cx="28" cy="145" r="1.5" fill="#E6C587" />

        {/* Lower Sprouting Leaf */}
        <path
          d="M14 198 C22 202 32 196 36 186 C28 187 20 192 14 198 Z"
          fill={`url(#sideGrad-${side})`}
          opacity="0.75"
        />
        <path
          d="M12 218 C20 220 28 215 32 208 C26 208 18 212 12 218 Z"
          fill={`url(#sideGrad-${side})`}
          opacity="0.8"
        />

        {/* Lower Botanical Acanthus Swirl */}
        <path
          d="M8 220 C18 225 30 238 28 246 C25 254 15 250 16 240 C17 234 22 232 26 236 C28 238 28 240 26 242 C24 244 22 243 22 241"
          stroke={`url(#sideGrad-${side})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

/**
 * Top/Bottom Botanical Crown Crest
 * Sits flush on the top and bottom center borders of the frame.
 */
const TopBottomFiligree: React.FC<{ position: 'top' | 'bottom' }> = ({ position }) => {
  const isTop = position === 'top';
  const posClass = isTop ? 'top-0' : 'bottom-0 scale-y-[-1]';

  return (
    <div
      className={`absolute ${posClass} inset-x-0 flex justify-center pointer-events-none z-10 px-4`}
      aria-hidden="true"
    >
      <svg
        className="w-40 sm:w-56 md:w-72 h-auto text-[#C99A5B] filter drop-shadow-[0_0_6px_rgba(201,154,91,0.35)] -translate-y-1/2"
        viewBox="0 0 240 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`crestGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8E5F2A" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#C99A5B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFF8E7" stopOpacity="1" />
            <stop offset="70%" stopColor="#C99A5B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8E5F2A" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Central Arch Line */}
        <path
          d="M20 28 C60 18 95 12 120 12 C145 12 180 18 220 28"
          stroke={`url(#crestGrad-${position})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Symmetrical Left Wing Vine & Leaves */}
        <path
          d="M120 14 C105 8 85 8 65 14 C75 11 90 10 105 13 Z"
          fill={`url(#crestGrad-${position})`}
        />
        <path
          d="M95 10 C88 4 78 6 72 12 C80 12 88 11 95 10 Z"
          fill={`url(#crestGrad-${position})`}
        />
        <path
          d="M60 16 C52 12 42 14 38 20 C46 20 54 18 60 16 Z"
          fill={`url(#crestGrad-${position})`}
        />

        {/* Symmetrical Right Wing Vine & Leaves */}
        <path
          d="M120 14 C135 8 155 8 175 14 C165 11 150 10 135 13 Z"
          fill={`url(#crestGrad-${position})`}
        />
        <path
          d="M145 10 C152 4 162 6 168 12 C160 12 152 11 145 10 Z"
          fill={`url(#crestGrad-${position})`}
        />
        <path
          d="M180 16 C188 12 198 14 202 20 C194 20 186 18 180 16 Z"
          fill={`url(#crestGrad-${position})`}
        />

        {/* Central Royal Star & Fleur-de-lis Jewel */}
        <circle cx="120" cy="12" r="3.5" fill="#FFF8E7" />
        <circle cx="120" cy="12" r="2" fill="#C99A5B" />
        <path
          d="M120 2 C118 6 115 9 111 11 C115 13 118 16 120 20 C122 16 125 13 129 11 C125 9 122 6 120 2 Z"
          fill="#FFF8E7"
        />
      </svg>
    </div>
  );
};

/**
 * Corner Botanical Filigree
 * Sits snugly in the 4 rounded corners of the card frame.
 */
const CornerFiligree: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ position }) => {
  const positioningClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-x-[-1] scale-y-[-1]',
  }[position];

  return (
    <div
      className={`absolute ${positioningClasses} w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 pointer-events-none z-10`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full text-[#C99A5B] filter drop-shadow-[0_0_5px_rgba(201,154,91,0.4)]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`cornerGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#DFBA73" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#C99A5B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8E5F2A" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Outer Corner Arch */}
        <path
          d="M8 82 C8 42 24 18 64 10"
          stroke={`url(#cornerGrad-${position})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M82 8 C42 8 18 24 10 64"
          stroke={`url(#cornerGrad-${position})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Diagonal Inner Curving Flourish */}
        <path
          d="M14 14 C26 26 44 44 68 50 C52 48 38 40 30 30 C20 20 16 16 14 14 Z"
          fill={`url(#cornerGrad-${position})`}
          opacity="0.85"
        />

        {/* Corner Leaves sprouting inwards */}
        <path
          d="M38 12 C42 6 50 6 54 12 C48 14 42 14 38 12 Z"
          fill={`url(#cornerGrad-${position})`}
          opacity="0.8"
        />
        <path
          d="M12 38 C6 42 6 50 12 54 C14 48 14 42 12 38 Z"
          fill={`url(#cornerGrad-${position})`}
          opacity="0.8"
        />
        <path
          d="M58 20 C64 16 72 18 74 26 C68 26 62 24 58 20 Z"
          fill={`url(#cornerGrad-${position})`}
          opacity="0.8"
        />
        <path
          d="M20 58 C16 64 18 72 26 74 C26 68 24 62 20 58 Z"
          fill={`url(#cornerGrad-${position})`}
          opacity="0.8"
        />

        {/* Stardust Corner Specks */}
        <circle cx="16" cy="16" r="2.5" fill="#FFF8E7" />
        <circle cx="16" cy="16" r="1.5" fill="#C99A5B" />
        <circle cx="32" cy="14" r="1.2" fill="#DFBA73" />
        <circle cx="14" cy="32" r="1.2" fill="#DFBA73" />
        <circle cx="52" cy="10" r="1" fill="#DFBA73" />
        <circle cx="10" cy="52" r="1" fill="#DFBA73" />
      </svg>
    </div>
  );
};

