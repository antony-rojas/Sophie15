import React from 'react';
import { IMAGES } from '../config';
import { AtmosphericDivider, CandelabraDivider, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

export const GrandBallroom: React.FC = () => {
  return (
    <section
      id="gran-salon"
      className="relative py-20 sm:py-28 px-4 sm:px-6 flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <EnchantedFrame innerClassName="p-4 sm:p-10">
          <CandelabraDivider className="mb-2" />

          <div className="flex items-center justify-center gap-2 mb-1">
            <CelestialStar glyph="✦" size="sm" />
            <span className="text-xs sm:text-sm font-montserrat tracking-[0.4em] text-[#DEAB5B] uppercase font-medium">
              El Escenario de una Noche Mágica
            </span>
            <CelestialStar glyph="✦" size="sm" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-copper-gradient tracking-widest mt-2 mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            EL GRAN SALÓN
          </h2>

          {/* Framed Panorama View */}
          <div className="my-6 rounded-2xl overflow-hidden border border-[#C29043]/40 shadow-inner max-h-64 sm:max-h-80 relative group">
            <img
              src={IMAGES.grandBallroom}
              alt="El Gran Salón de Baile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/70 via-transparent to-[#030914]/40 pointer-events-none" />
          </div>

          <AtmosphericDivider color="#C29043" />

          <div className="text-base sm:text-xl font-cinzel font-semibold tracking-[0.3em] text-[#C29043] uppercase mt-4">
            14 · NOVIEMBRE · 2026
          </div>
        </EnchantedFrame>
      </div>
    </section>
  );
};
