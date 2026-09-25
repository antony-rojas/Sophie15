import React, { useEffect, useRef } from 'react';
import { INVITATION_CONFIG } from '../config';
import { CelestialStar, RococoDivider, AtmosphericDivider } from './Ornaments';
import { EnchantedFrame } from './EnchantedFrame';
import { Gift, Sparkles, Heart } from 'lucide-react';

interface FallingGift {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayOffset: number;
  rotation: number;
  rotationSpeed: number;
  boxColor: string;
  ribbonColor: string;
  opacity: number;
}

export const GiftRainSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const giftPalettes = [
      { box: '#DEAB5B', ribbon: '#FFF8E7', highlight: '#FDF3DF' }, // Radiant gold box, ivory ribbon
      { box: '#8E1829', ribbon: '#F3DC9B', highlight: '#FFA4B2' }, // Royal crimson velvet box, bright gold ribbon
      { box: '#C29043', ribbon: '#FDF3DF', highlight: '#F4DEB3' }, // Burnished gold box, champagne ribbon
      { box: '#142B4B', ribbon: '#DEAB5B', highlight: '#5480B8' }, // Midnight royal navy box, gold ribbon
      { box: '#F4E5C8', ribbon: '#A47328', highlight: '#FFFFFF' }, // Champagne pearl box, deep gold ribbon
      { box: '#A62639', ribbon: '#FFE8B3', highlight: '#FF8597' }, // Ruby rose box, golden ribbon
    ];

    const giftCount = window.innerWidth < 768 ? 16 : 26;
    const gifts: FallingGift[] = [];

    // Initialize gifts spread across the height so the rain is active immediately
    for (let i = 0; i < giftCount; i++) {
      const palette = giftPalettes[Math.floor(Math.random() * giftPalettes.length)];
      gifts.push({
        x: Math.random() * width,
        y: Math.random() * (height + 120) - 60,
        size: Math.random() * 18 + 22, // 22px to 40px
        speedY: Math.random() * 1.3 + 1.1, // Smooth continuous downward speed
        swaySpeed: Math.random() * 0.025 + 0.015,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: (Math.random() - 0.5) * 0.35,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        boxColor: palette.box,
        ribbonColor: palette.ribbon,
        opacity: Math.random() * 0.15 + 0.85, // 0.85 to 1.0 (distinctly visible in front)
      });
    }

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      gifts.forEach((g) => {
        // Continuous downward motion
        g.y += g.speedY;
        // Gentle horizontal sway
        g.x += Math.sin(time * g.swaySpeed + g.swayOffset) * 0.6;
        g.rotation += g.rotationSpeed;

        // Wrap around bottom -> top for continuous endless rain
        if (g.y > height + 60) {
          g.y = -60;
          g.x = Math.random() * width;
          g.speedY = Math.random() * 1.4 + 1.1;
        }
        if (g.x < -40) g.x = width + 40;
        if (g.x > width + 40) g.x = -40;

        // Draw individual gift box on canvas
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rotation);
        ctx.globalAlpha = g.opacity;

        const w = g.size;
        const h = g.size * 0.88;
        const hw = w / 2;
        const hh = h / 2;
        const rw = Math.max(3.5, w * 0.2); // ribbon width
        const lidH = h * 0.28;

        // 3D Drop shadow so gifts pop in front of the card
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        // Main Box Body
        ctx.fillStyle = g.boxColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-hw, -hh + lidH * 0.6, w, h - lidH * 0.6, 4);
        } else {
          ctx.rect(-hw, -hh + lidH * 0.6, w, h - lidH * 0.6);
        }
        ctx.fill();

        // Box border for definition
        ctx.strokeStyle = 'rgba(255, 248, 231, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Box Lid (slightly wider)
        ctx.fillStyle = g.boxColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-hw - 2, -hh, w + 4, lidH, 3);
        } else {
          ctx.rect(-hw - 2, -hh, w + 4, lidH);
        }
        ctx.fill();

        // Lid highlight border
        ctx.strokeStyle = g.ribbonColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Reset shadow for ribbons to keep crisp
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Vertical Ribbon
        ctx.fillStyle = g.ribbonColor;
        ctx.fillRect(-rw / 2, -hh, rw, h);

        // Horizontal Ribbon across box body
        ctx.fillRect(-hw, 0, w, rw * 0.8);

        // Ribbon Bow on top with slight glow
        ctx.fillStyle = g.ribbonColor;
        ctx.beginPath();
        // Left loop
        ctx.ellipse(-hw * 0.35, -hh - 3, w * 0.24, h * 0.16, -Math.PI / 5, 0, Math.PI * 2);
        // Right loop
        ctx.ellipse(hw * 0.35, -hh - 3, w * 0.24, h * 0.16, Math.PI / 5, 0, Math.PI * 2);
        ctx.fill();

        // Center knot
        ctx.beginPath();
        ctx.arc(0, -hh - 1, rw * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // Star glint on the ribbon
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-hw * 0.4, -hh - 4, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const { giftRain } = INVITATION_CONFIG;

  return (
    <section
      id="regalos"
      ref={containerRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent text-[#FFF8E7] overflow-hidden"
    >
      {/* Foreground Falling Gifts Canvas (Cascades gracefully in FRONT of the card with z-20 and pointer-events-none) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <EnchantedFrame innerClassName="p-6 sm:p-12 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#C29043]/50 bg-[#0B1A30]/80 text-[#DEAB5B] text-xs font-montserrat tracking-[0.3em] uppercase shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C29043]" />
            <span>Detalles &amp; Presentes</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C29043]" />
          </div>

          {/* Section Main Title */}
          <div className="overflow-visible py-1">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-copper-gradient tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-tight">
              {giftRain.sectionTitle.toUpperCase()}
            </h2>
          </div>

          <RococoDivider color="#C29043" className="max-w-sm mx-auto my-4" />

          {/* Central Poetic Subtitle */}
          <div className="space-y-3 max-w-2xl mx-auto mb-8">
            <p className="text-2xl sm:text-3xl md:text-4xl font-melancholight text-[#DEAB5B] leading-relaxed">
              &ldquo;{giftRain.subtitle}&rdquo;
            </p>

            <p className="text-base sm:text-lg font-garamond text-[#E8DAC2] leading-relaxed max-w-xl mx-auto">
              {giftRain.message}
            </p>
          </div>

          {/* Royal Treasure Chest / Envelope Card */}
          <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0B1A30]/85 via-[#071324]/90 to-[#0B1A30]/85 border border-[#C29043]/40 shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_0_20px_rgba(194,144,67,0.15)] relative overflow-hidden group">
            {/* Ambient Corner Sparkles */}
            <div className="absolute top-2 left-3 text-[#F3DC9B] text-xs opacity-40 animate-star">✦</div>
            <div className="absolute top-2 right-3 text-[#F3DC9B] text-xs opacity-40 animate-star [animation-delay:1.5s]">✧</div>

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Floating Gift Emblem */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DEAB5B] via-[#C29043] to-[#9E6F28] p-0.5 shadow-[0_0_25px_rgba(194,144,67,0.5)] group-hover:scale-110 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-[#081426] flex items-center justify-center border border-[#F3DC9B]/40 text-[#DEAB5B]">
                  <Gift className="w-8 h-8 animate-bounce" style={{ animationDuration: '2.5s' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-copper-gradient tracking-wide">
                  Baúl Real de Deseos
                </h3>
                <p className="text-xs sm:text-sm font-montserrat tracking-[0.2em] text-[#DEAB5B] uppercase font-medium">
                  {giftRain.envelopeNote}
                </p>
              </div>

              <p className="text-xs sm:text-sm font-garamond italic text-[#C29043]/90 max-w-md mx-auto leading-relaxed pt-1">
                Agradecemos de corazón tu cariño, tus bendiciones y tus hermosos deseos en esta nueva etapa de Sophie.
              </p>

              {/* Decorative mini badge */}
              <div className="inline-flex items-center gap-2 pt-2 text-[#DEAB5B] text-xs font-cinzel tracking-widest uppercase">
                <Heart className="w-3.5 h-3.5 fill-[#DEAB5B]/40 text-[#DEAB5B]" />
                <span>Gracias por ser parte de este cuento</span>
                <Heart className="w-3.5 h-3.5 fill-[#DEAB5B]/40 text-[#DEAB5B]" />
              </div>
            </div>
          </div>

          <AtmosphericDivider className="max-w-xs mx-auto mt-8 mb-3" color="#C29043" />

          <div className="flex items-center justify-center gap-2 text-xs font-montserrat tracking-[0.3em] text-[#DEAB5B]/80 uppercase">
            <CelestialStar glyph="✦" size="sm" />
            <span>Sophie Shanell · Mis XV Años</span>
            <CelestialStar glyph="✦" size="sm" />
          </div>
        </EnchantedFrame>
      </div>
    </section>
  );
};
