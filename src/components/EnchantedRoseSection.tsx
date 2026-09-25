import React from 'react';
import { IMAGES } from '../config';
import { AtmosphericDivider, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

export const EnchantedRoseSection: React.FC = () => {
  return (
    <section
      id="rosa-encantada"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      {/* Subtle Rose Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7A1727]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#C99A5B]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Celestial Sparkles */}
      <div className="absolute top-20 right-16 text-[#F5E6B3] opacity-20 text-xs animate-star">✦</div>
      <div className="absolute bottom-20 left-16 text-[#C99A5B] opacity-25 text-sm animate-star [animation-delay:1.8s]">✧</div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Enchanted Cloche Glass Display */}
        <div className="relative inline-block mx-auto mb-10 group">
          <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-t-full p-2 bg-gradient-to-b from-[#E6C587]/60 via-[#C99A5B]/40 to-[#8E5F2A]/80 border border-[#C99A5B]/60 shadow-[0_0_60px_rgba(122,23,39,0.4),0_0_35px_rgba(201,154,91,0.25)]">
            <div className="w-full h-full rounded-t-full overflow-hidden bg-[#030914] relative">
              <img
                src={IMAGES.enchantedRose}
                alt="Vitral Encantado del Baile Real"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center animate-float group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Glass dome reflection highlights */}
              <div className="absolute top-6 left-8 w-8 h-32 bg-white/20 rounded-full blur-[3px] -rotate-12 pointer-events-none" />
              <div className="absolute top-12 right-8 w-4 h-20 bg-[#F5E6B3]/25 rounded-full blur-[2px] rotate-12 pointer-events-none" />
            </div>

            {/* Base Pedestal Gold Carvings */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-6 bg-gradient-to-r from-[#8E5F2A] via-[#F5E6B3] to-[#8E5F2A] rounded-md shadow-lg border border-[#FFF8E7]/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#7A1727] border border-[#FFF8E7]" />
            </div>
          </div>
        </div>

        {/* Poetic Fairytale Quote enclosed in Enchanted Frame */}
        <div className="max-w-2xl mx-auto">
          <EnchantedFrame innerClassName="p-4 sm:p-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CelestialStar glyph="✧" size="sm" />
            </div>

            <p className="text-3xl sm:text-4xl md:text-5xl font-melancholight text-[#DEAB5B] leading-relaxed mb-4">
              &ldquo;Hay momentos que queremos guardar para siempre.&rdquo;
            </p>

            <AtmosphericDivider color="#C29043" />

            <p className="text-base sm:text-xl font-cinzel font-semibold tracking-[0.28em] text-[#C29043] uppercase mt-4">
              Esta noche será uno de ellos.
            </p>
          </EnchantedFrame>
        </div>
      </div>
    </section>
  );
};
