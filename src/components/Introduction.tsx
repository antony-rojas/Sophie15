import React from 'react';
import { IMAGES, INVITATION_CONFIG } from '../config';
import { AtmosphericDivider, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

export const Introduction: React.FC = () => {
  return (
    <section
      id="historia"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <EnchantedFrame innerClassName="p-4 sm:p-10">
          {/* Central Enchanted Rose Cloche Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-52 sm:w-48 sm:h-64 rounded-full p-1.5 bg-gradient-to-b from-[#E6C587] via-[#C99A5B] to-[#8E5F2A] shadow-[0_10px_35px_rgba(122,23,39,0.4),0_0_25px_rgba(201,154,91,0.3)]">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#E6C587]/60 bg-[#030914]">
                <img
                  src={IMAGES.enchantedRose}
                  alt="Vitral Encantado"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Subtle glass reflection highlight */}
              <div className="absolute top-4 left-6 w-8 h-16 bg-white/20 rounded-full blur-[2px] -rotate-12 pointer-events-none" />
            </div>
          </div>

          {/* Fairytale Story Lines */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CelestialStar glyph="✦" size="sm" />
              <p className="text-3xl sm:text-4xl md:text-5xl font-melancholight text-[#DEAB5B] leading-relaxed">
                &ldquo;Érase una vez una niña que soñaba con una noche mágica...&rdquo;
              </p>
              <CelestialStar glyph="✦" size="sm" />
            </div>

            <AtmosphericDivider className="my-6" color="#C29043" />

            <p className="text-base sm:text-xl font-cinzel font-medium text-[#C29043] tracking-wider leading-relaxed">
              Hoy, ese sueño está a punto de hacerse realidad.
            </p>

            <div className="pt-4 space-y-2">
              <p className="text-4xl sm:text-6xl md:text-7xl font-melancholight text-copper-gradient drop-shadow-sm tracking-wide">
                {INVITATION_CONFIG.quinceaneraName}
              </p>
              <p className="text-xs sm:text-sm font-montserrat tracking-[0.3em] text-[#DEAB5B] uppercase pt-1 font-medium">
                te invita a celebrar con ella sus XV años
              </p>
            </div>
          </div>
        </EnchantedFrame>
      </div>
    </section>
  );
};
