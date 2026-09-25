import React, { useState, useEffect } from 'react';
import { INVITATION_CONFIG } from '../config';
import { TimeLeft } from '../types';
import { AtmosphericDivider, CelestialStar } from './Ornaments';
import { Clock } from 'lucide-react';
import { EnchantedFrame } from './EnchantedFrame';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const targetDate = new Date(INVITATION_CONFIG.eventDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const timeUnits = [
    { label: 'DÍAS', value: formatNumber(timeLeft.days) },
    { label: 'HORAS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTOS', value: formatNumber(timeLeft.minutes) },
    { label: 'SEGUNDOS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <EnchantedFrame innerClassName="p-4 sm:p-10">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-2 text-[#DEAB5B]">
            <CelestialStar glyph="✦" size="sm" />
            <Clock className="w-3.5 h-3.5 animate-spin [animation-duration:16s] text-[#C29043]" />
            <span className="text-xs sm:text-sm font-montserrat tracking-[0.35em] uppercase font-medium">
              Cuenta Regresiva
            </span>
            <CelestialStar glyph="✦" size="sm" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-copper-gradient tracking-wide mb-3 drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)]">
            EL CUENTO ESTÁ A PUNTO DE COMENZAR
          </h2>

          <p className="text-3xl sm:text-4xl font-melancholight text-[#DEAB5B] mb-6">
            Faltan...
          </p>

          <AtmosphericDivider className="max-w-xs mx-auto mb-10" color="#C29043" />

          {/* 4 Time Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-3xl mx-auto">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="relative p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0B1A30]/80 via-[#040A15]/90 to-[#040A15] border border-[#C29043]/40 shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(194,144,67,0.15)] backdrop-blur-md group hover:border-[#DEAB5B]/70 hover:shadow-[0_0_30px_rgba(194,144,67,0.3)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl sm:text-6xl font-playfair font-bold text-copper-gradient tracking-tight drop-shadow-[0_2px_12px_rgba(194,144,67,0.4)]">
                  {unit.value}
                </div>

                <div className="mt-2.5 text-xs sm:text-sm font-montserrat font-semibold tracking-[0.28em] text-[#DEAB5B] uppercase">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm font-cinzel font-semibold tracking-[0.28em] text-[#DEAB5B] uppercase mt-10">
            14 DE NOVIEMBRE DE 2026 · {INVITATION_CONFIG.schedule.arrivalTime} · CHORRILLOS, LIMA
          </p>
        </EnchantedFrame>
      </div>
    </section>
  );
};
