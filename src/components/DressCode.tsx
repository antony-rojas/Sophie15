import React from 'react';
import { IMAGES, INVITATION_CONFIG } from '../config';
import { AtmosphericDivider, CelestialStar } from './Ornaments';
import { Sparkles } from 'lucide-react';
import { EnchantedFrame } from './EnchantedFrame';

export const DressCode: React.FC = () => {
  return (
    <section
      id="dresscode"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <EnchantedFrame innerClassName="p-4 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
            {/* Left Column: Couture Editorial Gown Artwork */}
            <div className="md:col-span-5 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[3/4] rounded-2xl p-2 bg-gradient-to-b from-[#DEAB5B] via-[#C29043] to-[#9E6F28] shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(194,144,67,0.3)] group">
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#030914]">
                  <img
                    src={IMAGES.coutureGown}
                    alt="Vestimenta de Gala Elegante"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Dress Code Information */}
            <div className="md:col-span-7 lg:col-span-7 flex flex-col items-center text-center justify-center space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C29043]/50 bg-[#0B1A30]/70 text-[#DEAB5B] text-xs font-montserrat tracking-[0.3em] uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C29043]" />
                <span>Código de Vestimenta</span>
              </div>

              <div className="overflow-visible py-1 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-cinzel font-bold text-copper-gradient tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-normal inline-block">
                  VESTIMENTA
                </h2>
              </div>

              <AtmosphericDivider className="mx-auto max-w-sm" color="#C29043" />

              <div className="space-y-2 text-center w-full">
                <p className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-[#DEAB5B] tracking-wider drop-shadow-sm text-center">
                  {INVITATION_CONFIG.dressCode}
                </p>

                <p className="text-2xl sm:text-3xl font-melancholight text-[#DEAB5B] leading-relaxed pt-1 text-center max-w-md mx-auto">
                  &ldquo;{INVITATION_CONFIG.dressCodeSubtitle}&rdquo;
                </p>
              </div>

              {/* Reserved Colors Callout */}
              <div className="w-full max-w-lg mx-auto p-4 sm:p-5 rounded-2xl bg-[#030914]/85 border border-[#C29043]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-3.5 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-montserrat tracking-[0.25em] text-[#DEAB5B] uppercase font-semibold text-center">
                  <CelestialStar glyph="✦" size="sm" />
                  <span>COLORES QUE SOLO PUEDE USAR LA QUINCEAÑERA</span>
                  <CelestialStar glyph="✦" size="sm" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
                  {INVITATION_CONFIG.reservedColors?.map((color) => (
                    <div
                      key={color.name}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1A30]/90 border border-[#C29043]/50 shadow-sm"
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${color.gradient} shadow-[0_0_8px_rgba(194,144,67,0.5)] border border-[#030914]`}
                      />
                      <span className="text-xs font-montserrat font-medium tracking-wider text-[#C29043] uppercase">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-0.5">
                  <p className="text-xs sm:text-sm font-montserrat font-bold tracking-[0.2em] text-[#DEAB5B] uppercase text-center drop-shadow-sm">
                    NO USAR ESTOS COLORES
                  </p>
                </div>

                <p className="text-[11px] sm:text-xs font-garamond italic text-[#C29043]/85 tracking-wide text-center pt-1 max-w-md mx-auto">
                  * Agradecemos a nuestros invitados reservar estas tonalidades exclusivamente para Sophie.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3 text-xs font-montserrat tracking-[0.25em] text-[#DEAB5B] uppercase text-center">
                <CelestialStar glyph="✦" size="sm" />
                <span>Traje Formal · Vestido de Noche</span>
                <CelestialStar glyph="✦" size="sm" />
              </div>
            </div>
          </div>
        </EnchantedFrame>
      </div>
    </section>
  );
};
