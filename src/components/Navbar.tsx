import React, { useState, useEffect } from 'react';
import { Menu, X, Users } from 'lucide-react';
import { NavItem } from '../types';
import { AtmosphericDivider, CelestialStar } from './Ornaments';

const NAV_ITEMS: NavItem[] = [
  { label: 'INICIO', href: '#inicio' },
  { label: 'HISTORIA', href: '#historia' },
  { label: 'PADRES', href: '#padres' },
  { label: 'EVENTO', href: '#evento' },
  { label: 'DRESS CODE', href: '#dresscode' },
  { label: 'REGALOS', href: '#regalos' },
  { label: 'RSVP', href: '#rsvp' },
];

interface NavbarProps {
  onOpenPrivateList?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPrivateList }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if user scrolled past initial banner
      setIsScrolled(currentScrollY > 100);

      // Auto-hide on downward scroll, reveal on upward scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#081426]/90 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-[0_4px_25px_rgba(0,0,0,0.7)]'
            : 'bg-gradient-to-b from-[#081426]/85 to-transparent'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo / Monogram */}
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <CelestialStar glyph="✦" size="sm" />
            <span className="text-2xl font-melancholight text-copper-gradient group-hover:opacity-90 transition-opacity">
              Sophie Shanell
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-xs font-montserrat tracking-[0.25em] text-[#C29043] hover:text-[#F3DC9B] transition-colors relative py-1 group font-medium"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C29043] to-[#DEAB5B] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Friends / Guest List Icon Button (No text, only icon) */}
            {onOpenPrivateList && (
              <button
                type="button"
                onClick={onOpenPrivateList}
                className="p-2.5 rounded-full border border-[#C29043]/40 bg-[#071324]/80 text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] hover:bg-[#C29043]/20 transition-all duration-300 shadow-[0_0_15px_rgba(194,144,67,0.2)] hover:shadow-[0_0_20px_rgba(194,144,67,0.5)] cursor-pointer"
                title="Lista de Invitados"
                aria-label="Lista de Invitados"
              >
                <Users className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#C29043] hover:text-[#DEAB5B] transition-colors cursor-pointer"
              aria-label="Abrir menú"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#081426]/95 backdrop-blur-xl flex flex-col justify-center items-center px-6 animate-fadeIn">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-3 text-[#C29043] hover:text-[#DEAB5B] cursor-pointer"
            aria-label="Cerrar menú"
          >
            <X className="w-8 h-8" />
          </button>

          <span className="text-4xl font-melancholight text-copper-gradient mb-2 tracking-wide">
            Sophie Shanell
          </span>
          <span className="text-xs font-montserrat tracking-[0.3em] text-[#DEAB5B] uppercase mb-6 font-medium">
            Mis XV Años
          </span>

          <AtmosphericDivider className="w-48 mb-8" color="#C29043" />

          <div className="flex flex-col items-center space-y-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-montserrat font-medium tracking-[0.3em] text-[#C29043] hover:text-[#F3DC9B] transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
          </div>

          <AtmosphericDivider className="w-48 mt-8" color="#C29043" />
        </div>
      )}
    </>
  );
};
