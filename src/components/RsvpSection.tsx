import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, User, Phone } from 'lucide-react';
import { INVITATION_CONFIG } from '../config';
import { RsvpFormData } from '../types';
import { AtmosphericDivider, GoldenRoseSeal, CelestialStar } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';
import { saveRsvpRecord } from '../services/rsvpStorage';

export const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: '',
    phone: '',
    attending: 'yes',
    guestsCount: 1,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const triggerRoyalCelebration = () => {
    // Elegant Gold & Rose Royal Confetti burst
    const end = Date.now() + 1.8 * 1000;
    const colors = ['#C29043', '#DEAB5B', '#F3DC9B', '#D4AF37', '#9E6F28', '#E6C687'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Por favor ingresa tu número de teléfono / WhatsApp.');
      return;
    }

    setErrorMsg('');
    setIsSaving(true);

    try {
      await saveRsvpRecord({
        fullName: formData.fullName,
        phone: formData.phone,
      });
      triggerRoyalCelebration();
      setSubmitted(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'No se pudo guardar la confirmación. Inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const sendToWhatsApp = () => {
    const guestName = formData.fullName.trim();
    const message = `Hola soy ${guestName} y quiero confirmar mi asistencia a tu quinceañero`;
    const targetPhone = "51926961387";
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="rsvp"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CelestialStar glyph="✦" size="sm" />
            <span className="text-xs sm:text-sm font-montserrat tracking-[0.4em] text-[#DEAB5B] uppercase font-medium">
              Confirmación de Asistencia
            </span>
            <CelestialStar glyph="✦" size="sm" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-copper-gradient tracking-wide mt-2 mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            ¿NOS ACOMPAÑAS?
          </h2>

          <p className="text-2xl sm:text-3xl font-melancholight text-[#DEAB5B]">
            &ldquo;Será un honor compartir esta noche tan especial contigo.&rdquo;
          </p>

          <AtmosphericDivider className="max-w-xs mx-auto mt-6" color="#C29043" />
        </div>

        {/* Luxury Form Enclosed in Enchanted Frame */}
        <EnchantedFrame innerClassName="p-4 sm:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6" id="rsvp-form">
              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3.5 rounded-lg bg-[#7A1727]/70 border border-[#C29043]/50 text-xs font-montserrat text-[#FDF3DF] text-center tracking-wide animate-shake">
                  {errorMsg}
                </div>
              )}

              {/* 1. Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-montserrat tracking-[0.25em] text-[#DEAB5B] uppercase">
                  <User className="w-3.5 h-3.5 text-[#C29043]" />
                  <span>Nombre Completo</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Escribe tu nombre y apellido"
                  className="w-full px-5 py-3.5 rounded-xl bg-[#030914]/80 border border-[#C29043]/45 text-[#C29043] placeholder-[#C29043]/40 text-sm font-garamond focus:outline-none focus:border-[#DEAB5B] focus:ring-1 focus:ring-[#C29043] transition-all"
                />
              </div>

              {/* 2. Phone / WhatsApp (Directly below Full Name) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-montserrat tracking-[0.25em] text-[#DEAB5B] uppercase">
                  <Phone className="w-3.5 h-3.5 text-[#C29043]" />
                  <span>Teléfono / WhatsApp</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Ej: +51 987 654 321"
                  className="w-full px-5 py-3.5 rounded-xl bg-[#030914]/80 border border-[#C29043]/45 text-[#C29043] placeholder-[#C29043]/40 text-sm font-garamond focus:outline-none focus:border-[#DEAB5B] focus:ring-1 focus:ring-[#C29043] transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  id="confirm-attendance-btn"
                  disabled={isSaving}
                  className="w-full py-4 rounded-full text-xs sm:text-sm font-montserrat font-bold tracking-[0.3em] uppercase text-[#030914] bg-gradient-to-r from-[#DEAB5B] via-[#C29043] to-[#9E6F28] hover:from-[#F3DC9B] hover:via-[#DEAB5B] hover:to-[#C29043] transition-all duration-300 shadow-[0_0_25px_rgba(194,144,67,0.6)] hover:shadow-[0_0_35px_rgba(243,220,155,0.8)] hover:scale-[1.02] active:scale-98 shimmer-hover cursor-pointer disabled:opacity-60 disabled:cursor-wait disabled:hover:scale-100"
                >
                  {isSaving ? 'GUARDANDO...' : 'CONFIRMAR ASISTENCIA'}
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Certificate View */
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="flex justify-center">
                <GoldenRoseSeal />
              </div>

              <div className="flex items-center justify-center gap-2 text-[#DEAB5B]">
                <CheckCircle2 className="w-5 h-5 text-[#C29043]" />
                <span className="text-xs font-montserrat tracking-[0.3em] uppercase">
                  Respuesta Registrada con Éxito
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-melancholight text-copper-gradient">
                ¡Gracias, {formData.fullName}!
              </h3>

              <p className="text-lg font-garamond text-[#C29043] max-w-md mx-auto">
                {formData.attending === 'yes'
                  ? 'Tu asistencia ha sido confirmada con éxito y tus datos quedaron guardados en la lista de invitados.'
                  : 'Agradecemos tu respuesta. Sophie llevará tus mejores deseos en su corazón.'}
              </p>

              <AtmosphericDivider className="max-w-xs mx-auto" color="#C29043" />

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={sendToWhatsApp}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0B1A30] border border-[#C29043]/60 text-xs sm:text-sm font-montserrat font-medium tracking-[0.15em] text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] hover:bg-[#12243d] transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(194,144,67,0.4)]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Quiero confirmar mi asistencia</span>
                </button>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-montserrat tracking-[0.15em] text-[#C29043]/70 hover:text-[#C29043] underline transition-colors cursor-pointer"
                >
                  Modificar respuesta
                </button>
              </div>
            </div>
          )}
        </EnchantedFrame>
      </div>
    </section>
  );
};
