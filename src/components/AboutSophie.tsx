import React from 'react';
import { IMAGES, INVITATION_CONFIG } from '../config';
import { AtmosphericDivider, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

export const AboutSophie: React.FC = () => {
  return (
    <section
      id="sobre-sophie"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <EnchantedFrame innerClassName="p-4 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Stylized Princess Gazing Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[3/4] rounded-2xl p-2 bg-gradient-to-b from-[#E6C587] via-[#C99A5B]/60 to-[#8E5F2A] shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(201,154,91,0.25)] group">
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#030914]">
                  <img
                    src={IMAGES.princessGazing}
                    alt="Sophie Shanell - Una Noche Encantada"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: High-End Editorial Typography */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <CelestialStar glyph="✦" size="sm" />
                  <span className="text-xs sm:text-sm font-montserrat tracking-[0.4em] text-[#DEAB5B] uppercase font-medium">
                    {INVITATION_CONFIG.eventName}
                  </span>
                </div>

                {/* Big Editorial Name Composition */}
                <div className="mt-3">
                  <h2 className="text-5xl sm:text-7xl lg:text-8xl font-melancholight text-copper-gradient drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-tight tracking-wide">
                    {INVITATION_CONFIG.quinceaneraName}
                  </h2>
                </div>
              </div>

              <AtmosphericDivider className="lg:mx-0 max-w-sm" color="#C29043" />

              {/* Editorial Poetic Texts */}
              <div className="space-y-4">
                <p className="text-3xl sm:text-4xl font-melancholight text-[#DEAB5B] leading-relaxed">
                  &ldquo;Una nueva etapa comienza.&rdquo;
                </p>

                <p className="text-lg sm:text-xl font-garamond text-[#E8DAC2] leading-relaxed font-normal">
                  Una noche para celebrar los sueños, las ilusiones y todos los momentos que están por venir.
                </p>
              </div>

              {/* Royal Wax Crest / Accent */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#C29043]/60 flex items-center justify-center bg-[#030914]/80 text-[#C29043] shadow-[0_0_20px_rgba(194,144,67,0.25)]">
                  <span className="font-cinzel font-bold text-lg text-copper-gradient">XV</span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-montserrat font-medium tracking-[0.28em] text-[#DEAB5B] uppercase">
                    14 DE NOVIEMBRE
                  </p>
                  <p className="text-xs font-cinzel tracking-[0.22em] text-[#C29043]">
                    CHORRILLOS, LIMA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </EnchantedFrame>
      </div>
    </section>
  );
};
