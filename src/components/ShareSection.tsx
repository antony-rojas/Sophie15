import React, { useState } from 'react';
import { Share2, MessageCircle, Copy, Check } from 'lucide-react';
import { INVITATION_CONFIG } from '../config';
import { AtmosphericDivider, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';

export const ShareSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Sophie Shanell — Mis XV Años',
      text: INVITATION_CONFIG.whatsappMessage,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share dismissed:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href;
    const fullText = `${INVITATION_CONFIG.whatsappMessage}\n\n👑 Ver invitación digital:\n${currentUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="compartir"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <EnchantedFrame innerClassName="p-4 sm:p-8">
          <div className="flex items-center justify-center gap-2 mb-1 text-[#DEAB5B]">
            <CelestialStar glyph="✦" size="sm" />
            <span className="text-xs font-montserrat tracking-[0.35em] uppercase">
              Invitación Real
            </span>
            <CelestialStar glyph="✦" size="sm" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-copper-gradient tracking-wide mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            COMPARTE ESTE CUENTO
          </h2>

          <p className="text-sm font-montserrat tracking-[0.22em] text-[#C29043] uppercase mb-4">
            Invita a tus seres queridos a ser parte del reino
          </p>

          <AtmosphericDivider className="max-w-xs mx-auto mb-8" color="#C29043" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Share Button */}
            <button
              onClick={handleShare}
              id="share-invite-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-montserrat font-bold tracking-[0.28em] uppercase text-[#030914] bg-gradient-to-r from-[#DEAB5B] via-[#C29043] to-[#9E6F28] hover:from-[#F3DC9B] hover:via-[#DEAB5B] transition-all shadow-[0_0_25px_rgba(194,144,67,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#030914]" />
              <span>COMPARTIR INVITACIÓN</span>
            </button>

            {/* WhatsApp Direct Share Button */}
            <button
              onClick={handleWhatsAppShare}
              id="whatsapp-share-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-montserrat font-medium tracking-[0.2em] uppercase bg-[#0B1A30]/80 border border-[#C29043]/50 text-[#DEAB5B] hover:text-[#FDF3DF] hover:border-[#DEAB5B] hover:bg-[#0B1A30] transition-all cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Compartir por WhatsApp</span>
            </button>

            {/* Copy Link Option */}
            <button
              onClick={handleCopyLink}
              aria-label="Copiar enlace de invitación"
              className="p-3.5 rounded-full bg-[#030914] border border-[#C29043]/45 text-[#C29043] hover:text-[#DEAB5B] hover:border-[#DEAB5B] transition-all cursor-pointer shadow-sm"
              title="Copiar enlace"
            >
              {copied ? <Check className="w-4 h-4 text-[#DEAB5B]" /> : <Copy className="w-4 h-4 text-[#C29043]" />}
            </button>
          </div>

          {copied && (
            <p className="text-xs font-montserrat text-[#DEAB5B] tracking-wider mt-3 animate-fadeIn">
              ¡Enlace copiado al portapapeles!
            </p>
          )}
        </EnchantedFrame>
      </div>
    </section>
  );
};
