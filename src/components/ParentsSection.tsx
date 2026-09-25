import React from 'react';
import { INVITATION_CONFIG } from '../config';
import { CelestialStar, RococoDivider, AtmosphericDivider } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';
import { Heart, Sparkles } from 'lucide-react';

export const ParentsSection: React.FC = () => {
  const { parents, quinceaneraName } = INVITATION_CONFIG;

  return (
    <section
      id="padres"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <EnchantedFrame innerClassName="py-10 sm:py-14 px-4 sm:px-10 text-center">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-1.5 rounded-full border border-[#C29043]/40 bg-[#081426]/75 shadow-[0_0_15px_rgba(194,144,67,0.25)] mb-5">
            <CelestialStar glyph="✦" size="sm" />
            <span className="text-xs sm:text-sm font-cinzel font-semibold tracking-[0.3em] text-[#F3DC9B] uppercase">
              {parents.sectionTitle}
            </span>
            <CelestialStar glyph="✦" size="sm" />
          </div>

          {/* Emotional Blessing Opening */}
          <p className="text-xl sm:text-2xl md:text-3xl font-garamond italic font-normal text-[#DEAB5B] max-w-2xl mx-auto leading-relaxed mb-6">
            &ldquo;{parents.blessing}&rdquo;
          </p>

          <RococoDivider color="#C29043" className="max-w-md mx-auto my-4" />

          {/* Invitation Premise Text */}
          <p className="text-xs sm:text-sm font-montserrat font-medium tracking-[0.22em] text-[#E8DAC2] uppercase max-w-xl mx-auto mb-8 leading-relaxed">
            {parents.invitationText}
          </p>

          {/* Royal Parents Display Card */}
          <div className="relative max-w-2xl mx-auto my-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0B1A30]/80 via-[#071324]/90 to-[#0B1A30]/80 border border-[#C29043]/35 shadow-[0_10px_35px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(194,144,67,0.1)]">
            {/* Top Center Heart / Filigree Accent */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#081426] border border-[#C29043] flex items-center justify-center text-[#DEAB5B] shadow-[0_0_15px_rgba(194,144,67,0.4)]">
              <Heart className="w-4 h-4 fill-[#DEAB5B]/30 text-[#DEAB5B]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-11 gap-6 md:gap-4 items-center">
              {/* Father */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-copper-gradient tracking-wide text-center">
                  {parents.father}
                </h3>
              </div>

              {/* Central Ampersand & Flourish */}
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <div className="hidden md:block h-8 w-px bg-gradient-to-b from-transparent via-[#C29043]/40 to-transparent" />
                <span className="text-3xl sm:text-4xl font-melancholight text-[#DEAB5B] my-1 select-none">
                  &amp;
                </span>
                <div className="hidden md:block h-8 w-px bg-gradient-to-b from-transparent via-[#C29043]/40 to-transparent" />
              </div>

              {/* Mother */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-copper-gradient tracking-wide text-center">
                  {parents.mother}
                </h3>
              </div>
            </div>
          </div>

          <AtmosphericDivider className="max-w-xs mx-auto my-6" color="#C29043" />

          {/* Sophie's Name Tribute */}
          <div className="mt-4">
            <h4 className="text-4xl sm:text-6xl font-melancholight text-copper-gradient drop-shadow-md tracking-wide">
              {quinceaneraName}
            </h4>
          </div>

          {/* Final Dedication Note */}
          <p className="text-sm sm:text-base font-garamond italic text-[#E8DAC2]/90 max-w-lg mx-auto mt-5 leading-relaxed">
            &ldquo;Gracias por ser mi guía, mi apoyo incondicional y el pilar que hace posible este sueño mágico.&rdquo;
          </p>
        </EnchantedFrame>
      </div>
    </section>
  );
};
