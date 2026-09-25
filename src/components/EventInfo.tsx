import React from 'react';
import { MapPin, Calendar, ExternalLink, Clock, Sparkles, Crown } from 'lucide-react';
import { INVITATION_CONFIG } from '../config';
import { AtmosphericDivider, CandelabraDivider, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

export const EventInfo: React.FC = () => {
  return (
    <section
      id="evento"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Eyebrow and Section Title */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[#DEAB5B]">
          <CelestialStar glyph="✦" size="sm" />
          <span className="text-xs sm:text-sm font-montserrat tracking-[0.38em] uppercase font-medium">
            Detalles del Evento
          </span>
          <CelestialStar glyph="✦" size="sm" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-copper-gradient tracking-wider mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          LA NOCHE
        </h2>

        <AtmosphericDivider className="max-w-xs mx-auto mb-10" color="#C29043" />

        {/* Main Event Information Card with EnchantedFrame */}
        <div className="max-w-2xl mx-auto">
          <EnchantedFrame innerClassName="p-4 sm:p-10">
            {/* Date & Location Columns */}
            <div className="space-y-8">
              {/* Date Block */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#C29043]/60 flex items-center justify-center text-[#C29043] mb-3 bg-[#0B1A30]/60 shadow-[0_0_15px_rgba(194,144,67,0.2)]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-montserrat tracking-[0.28em] text-[#DEAB5B] uppercase mb-1 font-semibold">
                  FECHA
                </span>
                <p className="text-2xl sm:text-4xl font-playfair font-bold text-[#DEAB5B] tracking-wide">
                  14 NOVIEMBRE 2026
                </p>
              </div>

              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#C29043]/50 to-transparent" />

              {/* Royal Schedule Block */}
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-4 text-[#DEAB5B]">
                  <Clock className="w-4 h-4 text-[#C29043]" />
                  <span className="text-xs font-montserrat tracking-[0.3em] uppercase font-semibold">
                    PROGRAMA REAL
                  </span>
                  <Clock className="w-4 h-4 text-[#C29043]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                  {/* Card 1: Hora de Llegada */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1A30]/85 border border-[#C29043]/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#DEAB5B] transition-all relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-[11px] font-montserrat font-bold tracking-[0.2em] text-[#DEAB5B] uppercase">
                        RECEPCIÓN
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#030914] border border-[#C29043]/50 flex items-center justify-center text-[#DEAB5B]">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-cinzel font-bold text-copper-gradient">
                      {INVITATION_CONFIG.schedule.arrivalTime}
                    </p>
                    <h4 className="text-xs sm:text-sm font-montserrat font-bold tracking-wider text-[#FFF8E7] mt-1 uppercase">
                      HORA DE LLEGADA
                    </h4>
                    <p className="text-xs font-garamond text-[#C29043] mt-1 leading-relaxed">
                      Recepción y bienvenida de invitados.
                    </p>
                  </div>

                  {/* Card 2: Bajada de la Quinceañera */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132845]/90 via-[#0B1A30]/90 to-[#081426]/90 border border-[#DEAB5B]/70 shadow-[0_4px_25px_rgba(194,144,67,0.25)] hover:border-[#F3DC9B] transition-all relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-[11px] font-montserrat font-bold tracking-[0.2em] text-[#F3DC9B] uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#DEAB5B]" />
                        MOMENTO CUMBRE
                      </span>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#DEAB5B] to-[#9E6F28] p-0.5 shadow-[0_0_12px_rgba(194,144,67,0.5)]">
                        <div className="w-full h-full rounded-full bg-[#081426] flex items-center justify-center text-[#DEAB5B]">
                          <Crown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-cinzel font-bold text-copper-gradient">
                      8:30 PM
                    </p>
                    <h4 className="text-xs sm:text-sm font-montserrat font-bold tracking-wider text-[#FFF8E7] mt-1 uppercase">
                      BAJADA DE LA QUINCEAÑERA
                    </h4>
                    <p className="text-xs font-garamond text-[#DEAB5B] mt-1 leading-relaxed">
                      El mágico e inolvidable ingreso real de Sophie Shanell.
                    </p>
                  </div>
                </div>

                <p className="text-xs font-garamond italic text-[#DEAB5B]/90 mt-3.5 text-center">
                  ✨ Agradecemos tu valiosa puntualidad para compartir cada momento mágico.
                </p>
              </div>

              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#C29043]/50 to-transparent" />

              {/* Location Block */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-[#C29043]/60 flex items-center justify-center text-[#C29043] mb-3 bg-[#0B1A30]/60 shadow-[0_0_15px_rgba(194,144,67,0.2)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-montserrat tracking-[0.28em] text-[#DEAB5B] uppercase mb-1 font-semibold">
                  UBICACIÓN
                </span>
                <p className="text-xl sm:text-3xl md:text-4xl font-playfair font-bold text-copper-gradient tracking-wide mb-1 uppercase">
                  {INVITATION_CONFIG.venueName}
                </p>
                <p className="text-sm sm:text-base font-montserrat font-medium text-[#FDF3DF] tracking-wide mt-1">
                  {INVITATION_CONFIG.eventAddress}
                </p>
                <p className="text-xs font-cinzel tracking-[0.25em] text-[#DEAB5B] uppercase mt-1 font-medium">
                  Lima, Perú
                </p>
              </div>
            </div>

            {/* Google Maps Button */}
            <div className="mt-10">
              <a
                href={INVITATION_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="view-location-btn"
                className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-montserrat font-semibold tracking-[0.28em] uppercase text-[#030914] bg-gradient-to-r from-[#DEAB5B] via-[#C29043] to-[#9E6F28] hover:from-[#F3DC9B] hover:via-[#DEAB5B] hover:to-[#C29043] transition-all duration-300 shadow-[0_0_25px_rgba(194,144,67,0.6)] hover:shadow-[0_0_35px_rgba(243,220,155,0.8)] hover:scale-105 active:scale-95 shimmer-hover cursor-pointer"
              >
                <span>VER UBICACIÓN</span>
                <ExternalLink className="w-4 h-4 text-[#030914]" />
              </a>
            </div>
          </EnchantedFrame>
        </div>

        <CandelabraDivider className="mt-12" />
      </div>
    </section>
  );
};
