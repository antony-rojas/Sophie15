import React, { useState, useEffect } from 'react';
import { IMAGES } from './config';
import { Navbar } from './components/Navbar';
import { HeroDoors } from './components/HeroDoors';
import { Introduction } from './components/Introduction';
import { ParentsSection } from './components/ParentsSection';
import { Countdown } from './components/Countdown';
import { EnchantedRoseSection } from './components/EnchantedRoseSection';
import { AboutSophie } from './components/AboutSophie';
import { GrandBallroom } from './components/GrandBallroom';
import { EventInfo } from './components/EventInfo';
import { DressCode } from './components/DressCode';
import { GiftRainSection } from './components/GiftRainSection';
import { RsvpSection } from './components/RsvpSection';
import { FinalSection } from './components/FinalSection';
import { PetalCanvas } from './components/PetalCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { PrivateRsvpListModal } from './components/PrivateRsvpListModal';

export default function App() {
  const [hasEnteredStory, setHasEnteredStory] = useState<boolean>(false);
  const [isPrivateListOpen, setIsPrivateListOpen] = useState<boolean>(false);

  const handleEnterStory = () => {
    setHasEnteredStory(true);
  };

  // Check URL hash for direct organizer routes: #admin, #lista, #invitados, #privado
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (['#admin', '#lista', '#invitados', '#privado', '#rsvp-admin'].includes(hash)) {
        setIsPrivateListOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleClosePrivateList = () => {
    setIsPrivateListOpen(false);
    if (['#admin', '#lista', '#invitados', '#privado', '#rsvp-admin'].includes(window.location.hash.toLowerCase())) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  return (

    <div className="relative min-h-screen bg-[#081426] text-[#C29043] selection:bg-[#C29043]/30 selection:text-[#FDF3DF]">
      {/* Global Fixed Luxury Ballroom Background that persists across the entire scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* High-Resolution Ballroom Architecture */}
        <img
          src={IMAGES.heroBallroom}
          alt="Palacio Real"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 opacity-40"
        />
        {/* Cinematic Vignette & Radial Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081426]/90 via-[#081426]/60 to-[#081426]/85" />
        <div className="absolute inset-0 luxury-ambient-radial opacity-70" />

        {/* Subtle Atmospheric Geometric Gold Rings */}
        <div className="absolute -top-32 -left-32 w-96 h-96 border border-[#C29043] rounded-full opacity-[0.08]" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] border border-[#C29043] rounded-full opacity-[0.06]" />
        <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] border border-[#C29043] rounded-full opacity-[0.08]" />
      </div>

      {/* Dynamic Background Particle & Rose Petal System */}
      <PetalCanvas />

      {/* Floating Music Player */}
      <MusicPlayer autoPlayTrigger={hasEnteredStory} />

      {/* Minimalist Floating Navigation */}
      <Navbar onOpenPrivateList={() => setIsPrivateListOpen(true)} />

      {/* Main Story Flow */}
      <main className="relative z-10">
        {/* 1. Hero / Entrada al cuento */}
        <HeroDoors onEnter={handleEnterStory} />

        {/* 2. Introducción ("Érase una vez...") */}
        <Introduction />

        {/* 3. Los padres de la quinceañera */}
        <ParentsSection />

        {/* 4. Cuenta Regresiva */}
        <Countdown />

        {/* 4. La Rosa Encantada */}
        <EnchantedRoseSection />

        {/* 5. Sobre Sophie */}
        <AboutSophie />

        {/* 6. El Gran Salón */}
        <GrandBallroom />

        {/* 7. Información del Evento ("La Noche") */}
        <EventInfo />

        {/* 8. Dress Code ("Vestimenta") */}
        <DressCode />

        {/* 9. Lluvia de Regalos */}
        <GiftRainSection />

        {/* 10. RSVP ("¿Nos Acompañas?") */}
        <RsvpSection />

        {/* 11. Final / El cuento continúa */}
        <FinalSection />
      </main>

      {/* Private Organizer Guest List Modal */}
      <PrivateRsvpListModal
        isOpen={isPrivateListOpen}
        onClose={handleClosePrivateList}
      />
    </div>
  );
}
