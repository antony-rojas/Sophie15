import React from 'react';
import { INVITATION_CONFIG } from '../config';
import { AtmosphericDivider, GoldenRoseSeal, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

export const FinalSection: React.FC = () => {
  return (
    <footer
      id="final"
      className="relative min-h-[90vh] flex flex-col justify-between items-center text-center overflow-hidden bg-transparent text-[#FFF8E7] pt-20 pb-12 px-4 sm:px-6"
    >
      {/* Main Closing Editorial Content */}
      <div className="relative z-10 max-w-2xl mx-auto my-auto w-full">
        <EnchantedFrame innerClassName="p-4 sm:p-12">
          {/* Poetic Lines */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <CelestialStar glyph="✦" size="sm" />
            <p className="text-3xl sm:text-4xl font-melancholight text-[#DEAB5B]">
              &ldquo;Y este cuento...&rdquo;
            </p>
            <CelestialStar glyph="✦" size="sm" />
          </div>

          <p className="text-4xl sm:text-6xl font-melancholight text-[#DEAB5B] font-semibold mb-6">
            ...apenas comienza.
          </p>

          <AtmosphericDivider className="max-w-xs mx-auto mb-8" color="#C29043" />

          {/* Sophie Shanell Monogram Stamp */}
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-melancholight text-copper-gradient mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-tight tracking-wide">
            {INVITATION_CONFIG.quinceaneraName}
          </h2>

          <p className="text-xs sm:text-sm font-montserrat tracking-[0.35em] text-[#DEAB5B] uppercase mb-1 font-medium">
            {INVITATION_CONFIG.eventName}
          </p>

          <p className="text-xs sm:text-sm font-cinzel font-semibold tracking-[0.3em] text-[#C29043] uppercase mb-8">
            {INVITATION_CONFIG.shortDate}
          </p>

          {/* Thank You Note */}
          <p className="text-xl sm:text-2xl font-melancholight text-[#E8DAC2] max-w-md mx-auto mb-8">
            &ldquo;Gracias por ser parte de esta noche tan especial.&rdquo;
          </p>

          {/* Delicate Golden Rose Seal at the bottom */}
          <div className="flex justify-center">
            <GoldenRoseSeal />
          </div>
        </EnchantedFrame>
      </div>

      {/* Footer Bottom Stamp */}
      <div className="relative z-10 mt-12 text-center text-xs font-montserrat tracking-[0.25em] text-[#C29043]/60 uppercase">
        <p>© 2026 · Sophie Shanell · Una Noche Encantada · Chorrillos, Lima</p>
      </div>
    </footer>
  );
};
