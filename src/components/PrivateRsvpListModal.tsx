import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Download, 
  Trash2, 
  Search, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  X, 
  FileSpreadsheet, 
  Copy, 
  Check,
  RefreshCw,
  Users,
  Music
} from 'lucide-react';
import { RsvpRecord } from '../types';
import { 
  getStoredRsvps, 
  deleteRsvpRecord, 
  exportRsvpsToExcelXML, 
  exportRsvpsToJSON,
  clearAllRsvps 
} from '../services/rsvpStorage';
import { CelestialStar } from './Ornaments';
import { AudioSettingsTab } from './AudioSettingsTab';

interface PrivateRsvpListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateRsvpListModal: React.FC<PrivateRsvpListModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [records, setRecords] = useState<RsvpRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'yes' | 'no'>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'music'>('rsvp');

  // Load records
  const refreshRecords = () => {
    setRecords(getStoredRsvps());
    setConfirmDeleteId(null);
  };

  useEffect(() => {
    if (isOpen) {
      refreshRecords();
    }
  }, [isOpen]);

  // Handle PIN Unlock (passcode: 0221)
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim();
    if (clean === '0221') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Contraseña incorrecta. Por favor ingresa la clave de 4 dígitos.');
    }
  };

  // Safe deletion without blocked window.confirm
  const executeDelete = (id: string) => {
    const updated = deleteRsvpRecord(id);
    setRecords(updated);
    setConfirmDeleteId(null);
  };

  // Safe clear all
  const executeClearAll = () => {
    clearAllRsvps();
    setRecords([]);
    setConfirmClearAll(false);
  };

  const handleCopyPhone = (phone: string) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => {
      setCopiedPhone((curr) => (curr === phone ? null : curr));
    }, 2200);
  };

  const handleCopySummary = () => {
    if (records.length === 0) return;
    const text = records
      .map((r, i) => `${i + 1}. ${r.fullName} | Tel: ${r.phone} | Asistencia: ${r.attending === 'yes' ? 'SÍ (CONFIRMADO)' : 'NO ASISTIRÁ'} | ${r.formattedDate}`)
      .join('\n');
    
    navigator.clipboard.writeText(`👑 LISTA DE INVITADOS — XV AÑOS DE SOPHIE SHANELL\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  // Filtered records
  const filtered = records.filter((r) => {
    const matchQuery = 
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);
    const matchStatus = filterStatus === 'all' || r.attending === filterStatus;
    return matchQuery && matchStatus;
  });

  const totalAttending = records.filter((r) => r.attending === 'yes').length;
  const totalDeclined = records.filter((r) => r.attending === 'no').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#030914]/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[94vh] sm:h-auto sm:max-h-[90vh] flex flex-col bg-[#071324] border-2 border-[#C29043]/70 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(194,144,67,0.3)] overflow-hidden text-[#FFF8E7]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-[#C29043]/30 bg-[#0B1A30]/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#C29043] flex items-center justify-center bg-[#071324] text-[#DEAB5B] shrink-0">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-xl font-cinzel font-bold text-copper-gradient leading-tight">
                PANEL PRIVADO DE ASISTENCIA
              </h2>
              <p className="text-[10px] sm:text-xs font-montserrat text-[#DEAB5B] tracking-wider truncate">
                XV Años Sophie Shanell · Archivo confidencial
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-[#C29043] hover:text-[#FFF8E7] hover:bg-[#C29043]/20 transition-all cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Authentication PIN Screen */
          <div className="p-6 sm:p-12 text-center max-w-md mx-auto space-y-6 my-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#C29043] flex items-center justify-center mx-auto bg-[#0B1A30] text-[#DEAB5B] shadow-[0_0_20px_rgba(194,144,67,0.3)]">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#FFF8E7]">
                Acceso Exclusivo al Registro
              </h3>
              <p className="text-xs sm:text-sm font-garamond text-[#DEAB5B]/90">
                Ingresa el PIN de organizador para consultar la lista de nombres y teléfonos confirmados.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                autoFocus
                placeholder="Ingresa PIN secreto"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-5 py-3 text-center tracking-widest text-lg rounded-xl bg-[#030914] border border-[#C29043]/60 text-[#DEAB5B] placeholder-[#DEAB5B]/30 focus:outline-none focus:border-[#DEAB5B] focus:ring-2 focus:ring-[#C29043]"
              />

              {pinError && (
                <p className="text-xs font-montserrat text-rose-400 bg-rose-950/40 p-2 rounded-lg border border-rose-800/50">
                  {pinError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-montserrat font-bold text-xs tracking-[0.25em] uppercase bg-gradient-to-r from-[#DEAB5B] via-[#C29043] to-[#9E6F28] text-[#030914] hover:scale-[1.02] transition-all cursor-pointer shadow-lg"
              >
                DESBLOQUEAR LISTA
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden p-3 sm:p-6 space-y-3 sm:space-y-4">
            
            {/* Top Navigation Tabs: Invitados vs Música */}
            <div className="flex items-center gap-2 border-b border-[#C29043]/30 pb-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('rsvp')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-montserrat font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'rsvp'
                    ? 'bg-[#C29043] text-[#071324] shadow-md'
                    : 'bg-[#0B1A30]/80 text-[#DEAB5B] hover:text-[#FFF8E7] hover:bg-[#0B1A30]'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Lista de Invitados</span>
                <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-sans font-bold ${
                  activeTab === 'rsvp' ? 'bg-[#071324] text-[#DEAB5B]' : 'bg-[#C29043]/20 text-[#DEAB5B]'
                }`}>
                  {records.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('music')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-montserrat font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'music'
                    ? 'bg-[#C29043] text-[#071324] shadow-md'
                    : 'bg-[#0B1A30]/80 text-[#DEAB5B] hover:text-[#FFF8E7] hover:bg-[#0B1A30]'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Música de la Invitación</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 font-sans font-semibold">
                  Personalizar
                </span>
              </button>
            </div>

            {activeTab === 'music' ? (
              <AudioSettingsTab />
            ) : (
              <>
                {/* KPI Cards (Always 3-columns, compact on mobile) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
              <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0B1A30]/80 border border-[#C29043]/40 text-center sm:text-left">
                <span className="text-[9px] sm:text-xs font-montserrat uppercase tracking-wider text-[#DEAB5B] block truncate">
                  Total
                </span>
                <p className="text-lg sm:text-3xl font-playfair font-bold text-[#FFF8E7] mt-0.5 sm:mt-1">
                  {records.length}
                </p>
              </div>

              <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0B1A30]/80 border border-emerald-500/40 text-center sm:text-left">
                <span className="text-[9px] sm:text-xs font-montserrat uppercase tracking-wider text-emerald-400 block truncate">
                  Confirmados
                </span>
                <p className="text-lg sm:text-3xl font-playfair font-bold text-emerald-300 mt-0.5 sm:mt-1">
                  {totalAttending}
                </p>
              </div>

              <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0B1A30]/80 border border-rose-500/40 text-center sm:text-left">
                <span className="text-[9px] sm:text-xs font-montserrat uppercase tracking-wider text-rose-400 block truncate">
                  Cancelados
                </span>
                <p className="text-lg sm:text-3xl font-playfair font-bold text-rose-300 mt-0.5 sm:mt-1">
                  {totalDeclined}
                </p>
              </div>
            </div>

            {/* Actions Bar: Search, Filters & Export Buttons */}
            <div className="space-y-2 shrink-0">
              {/* Search Bar + Refresh */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C29043]" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o teléfono..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl bg-[#030914] border border-[#C29043]/40 text-xs sm:text-sm text-[#FFF8E7] placeholder-[#C29043]/50 focus:outline-none focus:border-[#DEAB5B]"
                  />
                </div>
                <button
                  onClick={refreshRecords}
                  title="Actualizar lista"
                  className="p-2 rounded-xl bg-[#0B1A30] border border-[#C29043]/50 text-[#DEAB5B] hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Status Filter Chips + Export Buttons in responsive flex */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Status Filter Chips */}
                <div className="flex items-center gap-1 bg-[#030914] p-1 rounded-xl border border-[#C29043]/30 overflow-x-auto max-w-full">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-montserrat transition-all cursor-pointer whitespace-nowrap ${
                      filterStatus === 'all' ? 'bg-[#C29043] text-[#030914] font-bold' : 'text-[#DEAB5B] hover:text-[#FFF8E7]'
                    }`}
                  >
                    Todos ({records.length})
                  </button>
                  <button
                    onClick={() => setFilterStatus('yes')}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-montserrat transition-all cursor-pointer whitespace-nowrap ${
                      filterStatus === 'yes' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-400 hover:text-emerald-200'
                    }`}
                  >
                    Confirmados ({totalAttending})
                  </button>
                  <button
                    onClick={() => setFilterStatus('no')}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-montserrat transition-all cursor-pointer whitespace-nowrap ${
                      filterStatus === 'no' ? 'bg-rose-700 text-white font-bold' : 'text-rose-400 hover:text-rose-200'
                    }`}
                  >
                    Cancelados ({totalDeclined})
                  </button>
                </div>

                {/* Export Buttons */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={exportRsvpsToExcelXML}
                    title="Descargar tabla en formato Excel XML (.xml)"
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-800 hover:text-white text-[11px] sm:text-xs font-montserrat font-medium transition-all cursor-pointer shadow whitespace-nowrap"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Excel XML</span>
                  </button>

                  <button
                    onClick={exportRsvpsToJSON}
                    title="Descargar archivo de respaldo JSON"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0B1A30] border border-[#C29043]/50 text-[#DEAB5B] hover:bg-[#C29043]/20 text-[11px] sm:text-xs font-montserrat font-medium transition-all cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">JSON</span>
                  </button>

                  <button
                    onClick={handleCopySummary}
                    title="Copiar texto resumen de invitados"
                    className="p-1.5 sm:p-2 rounded-xl bg-[#0B1A30] border border-[#C29043]/50 text-[#DEAB5B] hover:text-white transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Records Container (min-h-0 with overflow-y-auto so scrolling works reliably on mobile and desktop) */}
            <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-[#C29043]/30 bg-[#030914]/60">
              {filtered.length === 0 ? (
                <div className="text-center py-12 sm:py-16 px-4 space-y-3">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-[#C29043]/40 mx-auto" />
                  <p className="text-base sm:text-lg font-cinzel text-[#DEAB5B]">
                    No se encontraron confirmaciones
                  </p>
                  <p className="text-xs font-montserrat text-[#C29043]/60 max-w-sm mx-auto">
                    {searchQuery
                      ? 'Ningún invitado coincide con el término de búsqueda.'
                      : 'Las confirmaciones de asistencia enviadas a través de la invitación se guardarán automáticamente aquí.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* MOBILE VIEW: Sleek Card List (Visible only on mobile screens < 640px) */}
                  <div className="block sm:hidden p-2.5 space-y-2.5">
                    {filtered.map((record, index) => (
                      <div
                        key={record.id}
                        className="p-3 rounded-xl bg-[#0B1A30]/90 border border-[#C29043]/40 shadow-sm space-y-2"
                      >
                        {/* Header: Name + Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-[#030914] border border-[#C29043]/40 flex items-center justify-center text-[10px] font-mono text-[#DEAB5B] shrink-0">
                              {index + 1}
                            </span>
                            <h4 className="font-montserrat font-bold text-xs text-[#FFF8E7] truncate">
                              {record.fullName}
                            </h4>
                          </div>

                          {record.attending === 'yes' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shrink-0">
                              <CheckCircle className="w-2.5 h-2.5" /> Confirmado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-950/90 text-rose-300 border border-rose-500/50 shrink-0">
                              <XCircle className="w-2.5 h-2.5" /> No Asistirá
                            </span>
                          )}
                        </div>

                        {/* Phone & Quick Actions */}
                        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[#C29043]/15">
                          {record.phone ? (
                            <button
                              type="button"
                              onClick={() => handleCopyPhone(record.phone)}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#030914] border border-[#C29043]/40 text-xs font-mono text-[#DEAB5B] active:bg-[#132845] transition-all cursor-pointer"
                              title="Toca para copiar"
                            >
                              <span>{record.phone}</span>
                              {copiedPhone === record.phone ? (
                                <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-1 py-0.5 rounded border border-emerald-500/50">
                                  Copiado
                                </span>
                              ) : (
                                <Copy className="w-3 h-3 text-[#C29043]/70" />
                              )}
                            </button>
                          ) : (
                            <span className="text-xs text-[#C29043]/40 italic">Sin teléfono</span>
                          )}

                          <div className="flex items-center gap-1.5">
                            {record.phone && (
                              <>
                                <a
                                  href={`https://wa.me/${record.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 active:bg-emerald-800"
                                  title="WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`tel:${record.phone}`}
                                  className="p-1.5 rounded-lg bg-sky-950/80 border border-sky-500/50 text-sky-300 active:bg-sky-800"
                                  title="Llamar"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </>
                            )}

                            {/* Inline Delete Button */}
                            {confirmDeleteId === record.id ? (
                              <div className="flex items-center gap-1 ml-1 bg-rose-950/90 px-1.5 py-0.5 rounded border border-rose-600/50">
                                <span className="text-[10px] text-rose-200">¿Borrar?</span>
                                <button
                                  onClick={() => executeDelete(record.id)}
                                  className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold"
                                >
                                  Sí
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-1.5 py-0.5 rounded bg-[#030914] text-[#DEAB5B] text-[10px]"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteId(record.id)}
                                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/80 ml-1 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Date info */}
                        <div className="text-[10px] text-[#C29043]/70 font-montserrat">
                          📅 {record.formattedDate}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DESKTOP VIEW: Full table with horizontal scroll protection */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-[#C29043]/30 bg-[#0B1A30] text-[#DEAB5B] font-montserrat uppercase text-[11px] tracking-wider sticky top-0 z-10">
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Nombre Completo</th>
                          <th className="py-3 px-4">Teléfono (clic para copiar)</th>
                          <th className="py-3 px-4">Estado</th>
                          <th className="py-3 px-4">Fecha y Hora</th>
                          <th className="py-3 px-4 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C29043]/15 font-montserrat">
                        {filtered.map((record, index) => (
                          <tr
                            key={record.id}
                            className="hover:bg-[#0B1A30]/50 transition-colors group"
                          >
                            <td className="py-3 px-4 text-[#C29043]/60 font-mono text-xs">
                              {index + 1}
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#FFF8E7] max-w-[200px] truncate">
                              {record.fullName}
                            </td>
                            <td className="py-3 px-4">
                              {record.phone ? (
                                <div className="flex items-center gap-2">
                                  {/* Click on phone number copies it */}
                                  <button
                                    type="button"
                                    onClick={() => handleCopyPhone(record.phone)}
                                    title="Haz clic para copiar el número de teléfono"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1A30] hover:bg-[#132845] border border-[#C29043]/40 hover:border-[#DEAB5B] transition-all cursor-pointer group/phone text-left"
                                  >
                                    <span className="font-mono text-[#DEAB5B] group-hover/phone:text-[#FFF8E7] text-xs font-semibold">
                                      {record.phone}
                                    </span>
                                    {copiedPhone === record.phone ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/50">
                                        <Check className="w-3 h-3" /> Copiado
                                      </span>
                                    ) : (
                                      <Copy className="w-3 h-3 text-[#C29043]/60 group-hover/phone:text-[#DEAB5B] transition-colors" />
                                    )}
                                  </button>
                                  
                                  {/* Quick WhatsApp & Call links */}
                                  <a
                                    href={`https://wa.me/${record.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Abrir chat en WhatsApp"
                                    className="p-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-800 transition-colors"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                  <a
                                    href={`tel:${record.phone}`}
                                    title="Llamar directamente"
                                    className="p-1.5 rounded-lg bg-sky-950/70 border border-sky-500/40 text-sky-400 hover:text-white hover:bg-sky-800 transition-colors"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              ) : (
                                <span className="text-[#C29043]/40 italic text-xs">Sin teléfono</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {record.attending === 'yes' ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50">
                                  <CheckCircle className="w-3 h-3" />
                                  Confirmado
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/50">
                                  <XCircle className="w-3 h-3" />
                                  No Asistirá
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-xs text-[#C29043]/80 whitespace-nowrap">
                              {record.formattedDate}
                            </td>
                            <td className="py-3 px-4 text-right">
                              {confirmDeleteId === record.id ? (
                                <div className="flex items-center justify-end gap-1.5 animate-fadeIn">
                                  <span className="text-[11px] text-rose-300 font-semibold">¿Eliminar?</span>
                                  <button
                                    onClick={() => executeDelete(record.id)}
                                    className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold cursor-pointer transition-colors shadow"
                                    title="Confirmar eliminación"
                                  >
                                    Sí
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-2 py-1 rounded bg-[#0B1A30] border border-[#C29043]/40 text-[#DEAB5B] hover:text-white text-[11px] cursor-pointer transition-colors"
                                    title="Cancelar"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDeleteId(record.id)}
                                  title="Eliminar este registro"
                                  className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-200 hover:bg-rose-950/80 transition-all cursor-pointer group-hover:opacity-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
            </>
          )}

            {/* Modal Bottom Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#C29043]/20 text-[11px] sm:text-xs font-montserrat text-[#C29043]/70 shrink-0">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {activeTab === 'music'
                    ? 'Configuración de Audio y Bucle Persistente · Mis XV Años'
                    : `${records.length} registro${records.length === 1 ? '' : 's'} en base de datos`}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {activeTab === 'rsvp' && (
                  confirmClearAll ? (
                    <div className="flex items-center gap-1.5 bg-rose-950/90 px-2.5 py-1 rounded-xl border border-rose-600/60 animate-fadeIn">
                      <span className="text-rose-200 text-[11px] font-semibold">¿Vaciar todo?</span>
                      <button
                        onClick={executeClearAll}
                        className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] cursor-pointer transition-colors"
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => setConfirmClearAll(false)}
                        className="px-2 py-0.5 rounded bg-[#0B1A30] text-[#DEAB5B] hover:text-white text-[11px] cursor-pointer transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    records.length > 0 && (
                      <button
                        onClick={() => setConfirmClearAll(true)}
                        className="text-rose-400/70 hover:text-rose-300 hover:underline cursor-pointer transition-colors"
                      >
                        Vaciar lista
                      </button>
                    )
                  )
                )}
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0B1A30] border border-[#C29043]/40 text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
