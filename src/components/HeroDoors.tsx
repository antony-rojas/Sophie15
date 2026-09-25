import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { INVITATION_CONFIG } from '../config';
import { playMagicalChimes } from './MusicPlayer';
import { RococoDivider, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

interface HeroDoorsProps {
  onEnter: () => void;
}

export const HeroDoors: React.FC<HeroDoorsProps> = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showStoryTransition, setShowStoryTransition] = useState<boolean>(false);

  const scrollToNextSection = () => {
    const nextSec = document.getElementById('historia');
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDoors = () => {
    setIsOpen(true);
    playMagicalChimes();
    onEnter();
    // Directly dispatch music play within active user gesture
    window.dispatchEvent(new CustomEvent('sophie_play_music'));

    // 1. Show the fairytale story intro overlay
    setTimeout(() => {
      setShowStoryTransition(true);
    }, 400);

    // 2. Automatically hide the fairytale story intro overlay after a few seconds
    setTimeout(() => {
      setShowStoryTransition(false);
    }, 2800);

    // 3. Smoothly scroll down to the story section
    setTimeout(() => {
      scrollToNextSection();
    }, 3100);
  };

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-16 px-4"
    >
      {/* Door Leaf: Left */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full z-10 origin-left transition-transform duration-1000 ease-in-out pointer-events-none ${
          isOpen ? '-translate-x-full [transform:rotateY(-85deg)] opacity-0' : 'translate-x-0 opacity-100'
        }`}
        style={{
          perspective: '1200px',
          background: 'linear-gradient(135deg, rgba(8, 20, 38, 0.95) 0%, rgba(23, 43, 77, 0.90) 100%)',
          borderRight: '2px solid rgba(201, 154, 91, 0.7)',
          boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.85), 10px 0 30px rgba(0,0,0,0.7)',
        }}
      >
        {/* Ornate Gold Wood Panel Molding on Left Door */}
        <div className="absolute inset-8 border border-[#C99A5B]/40 rounded-sm pointer-events-none flex flex-col justify-between p-6">
          <div className="w-full h-32 border border-[#C99A5B]/30 rounded-sm" />
          <div className="w-full h-48 border border-[#C99A5B]/30 rounded-sm flex items-center justify-center">
            <span className="text-xl text-[#C99A5B] opacity-40">✧</span>
          </div>
          <div className="w-full h-32 border border-[#C99A5B]/30 rounded-sm" />
        </div>
      </div>

      {/* Door Leaf: Right */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full z-10 origin-right transition-transform duration-1000 ease-in-out pointer-events-none ${
          isOpen ? 'translate-x-full [transform:rotateY(85deg)] opacity-0' : 'translate-x-0 opacity-100'
        }`}
        style={{
          perspective: '1200px',
          background: 'linear-gradient(225deg, rgba(8, 20, 38, 0.95) 0%, rgba(23, 43, 77, 0.90) 100%)',
          borderLeft: '2px solid rgba(201, 154, 91, 0.7)',
          boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.85), -10px 0 30px rgba(0,0,0,0.7)',
        }}
      >
        {/* Ornate Gold Wood Panel Molding on Right Door */}
        <div className="absolute inset-8 border border-[#C99A5B]/40 rounded-sm pointer-events-none flex flex-col justify-between p-6">
          <div className="w-full h-32 border border-[#C99A5B]/30 rounded-sm" />
          <div className="w-full h-48 border border-[#C99A5B]/30 rounded-sm flex items-center justify-center">
            <span className="text-xl text-[#C99A5B] opacity-40">✧</span>
          </div>
          <div className="w-full h-32 border border-[#C99A5B]/30 rounded-sm" />
        </div>
      </div>

      {/* Golden Light Burst Flare on Opening */}
      {isOpen && (
        <div className="absolute inset-0 z-15 pointer-events-none bg-radial from-[#F5E6B3]/60 via-[#C99A5B]/20 to-transparent animate-pulse duration-700" />
      )}

      {/* Hero Center Editorial Card with Enchanted Botanical Frame */}
      <div className="relative z-20 w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4">
        <EnchantedFrame
          className="max-w-4xl lg:max-w-5xl"
          innerClassName="py-8 sm:py-12 px-6 sm:px-12 md:px-16 flex flex-col items-center justify-center text-center"
        >
          {/* 1. Header Royal Tag / Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C29043]/40 bg-[#081426]/70 shadow-[0_0_15px_rgba(194,144,67,0.2)] mb-4">
            <span className="text-[#DEAB5B] text-xs">✦</span>
            <span className="text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.32em] text-[#F3DC9B] uppercase">
              Mis Quince Años
            </span>
            <span className="text-[#DEAB5B] text-xs">✦</span>
          </div>

          {/* 2. Main Royal Name in Copper-Gold Melancholight */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-melancholight text-copper-gradient drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] tracking-wide px-3 sm:px-6 py-1 select-none leading-[1.15] sm:leading-[1.1] mb-2 w-full max-w-4xl mx-auto overflow-visible">
            {INVITATION_CONFIG.quinceaneraName}
          </h1>

          {/* 3. Creative Concept / Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-garamond italic font-normal text-[#DEAB5B] tracking-wide mt-1 mb-2 drop-shadow-sm">
            &ldquo;{INVITATION_CONFIG.creativeConcept}&rdquo;
          </p>

          {/* 4. Elegant Ornate Divider */}
          <div className="w-full max-w-xs sm:max-w-md mx-auto my-3">
            <RococoDivider color="#C29043" className="my-0" />
          </div>

          {/* 5. Date & Venue Block - Centered and Ordered */}
          <div className="flex flex-col items-center justify-center gap-1.5 my-2 text-center">
            <div className="text-xs sm:text-sm md:text-base font-cinzel font-bold tracking-[0.28em] text-[#FDF3DF] uppercase drop-shadow-sm">
              SÁBADO · 14 DE NOVIEMBRE · 2026
            </div>
            <div className="text-xs sm:text-sm font-montserrat font-medium tracking-[0.16em] text-[#DEAB5B] uppercase flex items-center justify-center gap-2 flex-wrap">
              <span>{INVITATION_CONFIG.venueName}</span>
              <span className="opacity-60 hidden sm:inline">·</span>
              <span>Chorrillos</span>
            </div>
          </div>

          {/* 6. Call to Action Button: "ENTRAR AL CUENTO" */}
          <div className="mt-6 sm:mt-8 flex justify-center w-full">
            {!isOpen ? (
              <button
                onClick={handleOpenDoors}
                id="enter-fairytale-btn"
                className="relative inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 rounded-full overflow-hidden text-xs sm:text-sm font-montserrat font-semibold tracking-[0.32em] uppercase text-[#030914] bg-gradient-to-r from-[#DEAB5B] via-[#C29043] to-[#9E6F28] hover:from-[#F3DC9B] hover:via-[#DEAB5B] hover:to-[#C29043] transition-all duration-300 shadow-[0_0_25px_rgba(194,144,67,0.6)] hover:shadow-[0_0_40px_rgba(243,220,155,0.9)] hover:scale-105 active:scale-95 shimmer-hover cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  ENTRAR AL CUENTO
                  <Sparkles className="w-4 h-4 text-[#030914]" />
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={scrollToNextSection}
                id="scroll-to-story-indicator"
                aria-label="Ir a la siguiente sección"
                className="flex flex-col items-center animate-bounce group cursor-pointer p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DEAB5B]/60"
              >
                <span className="text-xs font-montserrat tracking-[0.25em] text-[#DEAB5B] group-hover:text-[#FFF8E7] uppercase mb-1 transition-colors drop-shadow-sm">
                  Bienvenida al Reino
                </span>
                <ChevronDown className="w-5 h-5 text-[#C29043] group-hover:text-[#FFF8E7] transition-colors" />
              </button>
            )}
          </div>
        </EnchantedFrame>
      </div>

      {/* Story Transition Overlay */}
      <AnimatePresence>
        {showStoryTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onClick={() => setShowStoryTransition(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030914]/92 backdrop-blur-md cursor-pointer select-none"
          >
            {/* Falling Red Petal */}
            <motion.div
              initial={{ y: -60, opacity: 0, rotate: -20 }}
              animate={{ y: 0, opacity: 1, rotate: 15 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="mb-6"
            >
              <div className="w-8 h-10 bg-gradient-to-br from-[#A31D33] to-[#7A1727] rounded-full shadow-[0_0_20px_rgba(122,23,39,0.8)] border border-[#DEAB5B]/30 [clip-path:polygon(50%_0%,100%_40%,80%_100%,20%_100%,0%_40%)]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="text-3xl sm:text-5xl font-melancholight text-[#DEAB5B] mb-3 text-center px-4"
            >
              Érase una vez...
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="text-5xl sm:text-7xl md:text-8xl font-melancholight text-copper-gradient tracking-wide text-center"
            >
              {INVITATION_CONFIG.quinceaneraName}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

