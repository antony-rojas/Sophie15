import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Play,
  Pause,
  RotateCcw,
  Upload,
  Trash2,
  Check,
  AlertCircle,
  Clock,
  Volume2,
  Sliders,
  Disc,
  Sparkles,
  FileAudio
} from 'lucide-react';
import { INVITATION_CONFIG } from '../config';
import {
  getCustomAudio,
  saveCustomAudio,
  updateAudioStartSecond,
  deleteCustomAudio,
  formatTimeSeconds,
  StoredAudioTrack
} from '../utils/audioStorage';

export const AudioSettingsTab: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<StoredAudioTrack | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startSecond, setStartSecond] = useState<number>(0);
  const [previewSrc, setPreviewSrc] = useState<string>(INVITATION_CONFIG.musicUrl);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [previewCurrentTime, setPreviewCurrentTime] = useState<number>(0);
  const [previewDuration, setPreviewDuration] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const previewAudioRef = useRef<HTMLMediaElement | null>(null);
  const previewObjectUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load track info from IndexedDB
  const loadTrackData = async () => {
    setLoading(true);
    try {
      const track = await getCustomAudio();
      setCurrentTrack(track);

      if (track && track.blob) {
        if (previewObjectUrlRef.current) {
          URL.revokeObjectURL(previewObjectUrlRef.current);
        }
        const url = URL.createObjectURL(track.blob);
        previewObjectUrlRef.current = url;
        setPreviewSrc(url);
        setStartSecond(track.startSecond || 0);
      } else {
        if (previewObjectUrlRef.current) {
          URL.revokeObjectURL(previewObjectUrlRef.current);
          previewObjectUrlRef.current = null;
        }
        setPreviewSrc(INVITATION_CONFIG.musicUrl);
        setStartSecond(0);
      }
    } catch (err) {
      console.warn('Error loading audio config in admin tab:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrackData();
    return () => {
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
    };
  }, []);

  // Update preview audio playback
  const togglePlayPreview = () => {
    if (!previewAudioRef.current) return;
    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.play().then(() => {
        setIsPlayingPreview(true);
      }).catch((e) => {
        console.warn('Preview play error:', e);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!previewAudioRef.current) return;
    setPreviewCurrentTime(previewAudioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!previewAudioRef.current) return;
    setPreviewDuration(previewAudioRef.current.duration || 0);
  };

  const handlePreviewEnded = () => {
    if (!previewAudioRef.current) return;
    // Loop back to startSecond
    previewAudioRef.current.currentTime = startSecond;
    previewAudioRef.current.play().catch(console.warn);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setPreviewCurrentTime(time);
    if (previewAudioRef.current) {
      previewAudioRef.current.currentTime = time;
    }
  };

  // Set start second to current preview playback time
  const handleCaptureCurrentTime = () => {
    const sec = Math.floor(previewCurrentTime);
    setStartSecond(sec);
    setSaveSuccess(`Segundo de inicio fijado en ${formatTimeSeconds(sec)} (${sec}s)`);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  // Quick adjust buttons
  const adjustStartSecond = (delta: number) => {
    const maxSec = previewDuration > 0 ? Math.floor(previewDuration - 2) : 600;
    setStartSecond((prev) => Math.max(0, Math.min(maxSec, prev + delta)));
  };

  // Test jump to 4s before end to verify seamless loop back to startSecond
  const handleTestLoopJump = () => {
    if (!previewAudioRef.current) return;
    const dur = previewAudioRef.current.duration || previewDuration;
    if (dur > 6) {
      previewAudioRef.current.currentTime = dur - 4;
      if (!isPlayingPreview) {
        previewAudioRef.current.play().then(() => setIsPlayingPreview(true)).catch(console.warn);
      }
      setSaveSuccess(`Saltando a 4s del final para probar repetición hacia ${formatTimeSeconds(startSecond)}...`);
      setTimeout(() => setSaveSuccess(null), 3500);
    } else {
      previewAudioRef.current.currentTime = startSecond;
      previewAudioRef.current.play().catch(console.warn);
    }
  };

  // Process file upload
  const processAudioFile = async (file: File) => {
    setErrorMessage(null);
    setSaveSuccess(null);

    // Validate mime / format (including MP4 files)
    const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.mp4'];
    const lowerName = file.name.toLowerCase();
    const hasValidExt = validExtensions.some((ext) => lowerName.endsWith(ext));
    const isMp4 = lowerName.endsWith('.mp4') || file.type.includes('mp4');
    const isValidType = file.type.startsWith('audio/') || file.type.startsWith('video/') || hasValidExt || isMp4;

    if (!isValidType) {
      setErrorMessage('Formato no compatible. Por favor sube un archivo de audio MP4, MP3, WAV, M4A, OGG o AAC.');
      return;
    }

    // Limit size to 80 MB (allowing high-quality MP4/audio files)
    const maxSize = 80 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('El archivo excede los 80MB. Por favor selecciona una versión más comprimida o corta.');
      return;
    }

    setIsUploading(true);
    try {
      // Pause preview if playing
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        setIsPlayingPreview(false);
      }

      // Calculate audio/video duration using appropriate media element
      const audioUrl = URL.createObjectURL(file);
      const tempMedia = isMp4 ? document.createElement('video') : new Audio();
      tempMedia.preload = 'metadata';
      tempMedia.src = audioUrl;
      
      const duration = await new Promise<number>((resolve) => {
        tempMedia.addEventListener('loadedmetadata', () => {
          resolve(tempMedia.duration || 0);
        });
        tempMedia.addEventListener('error', () => {
          resolve(0);
        });
        // Timeout safeguard
        setTimeout(() => resolve(0), 4000);
      });

      URL.revokeObjectURL(audioUrl);

      // Save to IndexedDB with chosen startSecond (or 0 if initial)
      const saved = await saveCustomAudio(file, file.name, startSecond, duration);
      setCurrentTrack(saved);

      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
      const newUrl = URL.createObjectURL(saved.blob);
      previewObjectUrlRef.current = newUrl;
      setPreviewSrc(newUrl);

      setSaveSuccess(`¡Canción «${file.name}» guardada con éxito!`);
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err) {
      console.error('Error saving audio file:', err);
      setErrorMessage('Error al guardar el archivo de audio. Verifica el espacio en tu navegador.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAudioFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAudioFile(file);
    }
  };

  // Save current startSecond setting
  const handleSaveStartSecond = async () => {
    setErrorMessage(null);
    try {
      await updateAudioStartSecond(startSecond);
      setSaveSuccess(`¡Segundo de inicio guardado en ${formatTimeSeconds(startSecond)} (${startSecond}s)!`);
      setTimeout(() => setSaveSuccess(null), 3500);
    } catch (err) {
      console.warn('Error saving start second:', err);
      setErrorMessage('No se pudo guardar la configuración de segundo.');
    }
  };

  // Revert to original classical waltz
  const handleRestoreDefault = async () => {
    if (!confirm('¿Deseas restaurar el vals clásico original (Vals de las Flores)? Se eliminará la canción personalizada actual.')) {
      return;
    }

    setErrorMessage(null);
    try {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        setIsPlayingPreview(false);
      }

      await deleteCustomAudio();
      setCurrentTrack(null);
      setStartSecond(0);

      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
        previewObjectUrlRef.current = null;
      }

      setPreviewSrc(INVITATION_CONFIG.musicUrl);
      setSaveSuccess('Se ha restaurado el vals original de Tchaikovsky.');
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err) {
      console.warn('Error restoring default song:', err);
      setErrorMessage('Error al restaurar la canción original.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-[#DEAB5B]">
        <Disc className="w-8 h-8 animate-spin" />
        <span className="ml-3 font-montserrat text-sm">Cargando biblioteca de audio...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto space-y-4 sm:space-y-6 pr-1 text-[#FFF8E7]">
      {/* Media element for preview & scrubber (rendered off-screen without display:none to prevent suspension) */}
      <video
        ref={(el) => {
          previewAudioRef.current = el;
        }}
        src={previewSrc}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handlePreviewEnded}
        preload="metadata"
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          width: '1px',
          height: '1px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -999,
        }}
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,video/mp4,.mp3,.wav,.ogg,.m4a,.aac,.mp4"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm font-montserrat flex items-center gap-2 shadow-lg animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/60 text-rose-200 text-xs sm:text-sm font-montserrat flex items-center gap-2 shadow-lg animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Status Card: Current Music in Play */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0B1A30] via-[#071324] to-[#0B1A30] border border-[#C29043]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 shadow-md ${
              currentTrack
                ? 'border-emerald-400/80 bg-emerald-950/40 text-emerald-300'
                : 'border-[#C29043] bg-[#0B1A30] text-[#DEAB5B]'
            }`}>
              {currentTrack ? <FileAudio className="w-6 h-6" /> : <Music className="w-6 h-6" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-montserrat tracking-wider uppercase font-bold ${
                  currentTrack
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-[#C29043]/20 text-[#DEAB5B] border border-[#C29043]/40'
                }`}>
                  {currentTrack ? 'Canción Personalizada Activa' : 'Vals Clásico por Defecto'}
                </span>
                <span className="text-xs text-[#C29043]/80 font-montserrat">
                  Bucle: desde el segundo {formatTimeSeconds(startSecond)} ({startSecond}s)
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-cinzel font-bold text-[#FFF8E7] truncate mt-1">
                {currentTrack ? currentTrack.fileName : 'Tchaikovsky - Vals de las Flores (Piano)'}
              </h4>
              <p className="text-xs text-[#DEAB5B]/70 font-montserrat">
                {currentTrack
                  ? `${(currentTrack.fileSize / (1024 * 1024)).toFixed(2)} MB · Guardado en tu dispositivo`
                  : 'Pista clásica original de la invitación'}
              </p>
            </div>
          </div>

          {currentTrack && (
            <button
              onClick={handleRestoreDefault}
              className="px-3 py-1.5 rounded-xl border border-rose-500/50 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40 text-xs font-montserrat flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 self-start sm:self-center"
              title="Volver a la canción por defecto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Original</span>
            </button>
          )}
        </div>
      </div>

      {/* Upload Zone */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0B1A30]/60 border border-[#C29043]/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#DEAB5B]" />
            <h3 className="text-sm sm:text-base font-cinzel font-bold text-[#DEAB5B] uppercase tracking-wide">
              Subir Nueva Canción de tu Preferencia
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs text-[#C29043]/80 font-montserrat">
            MP4, MP3, WAV, M4A, OGG, AAC (hasta 80MB)
          </span>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-3 ${
            isDragging
              ? 'border-emerald-400 bg-emerald-950/20 scale-[0.99]'
              : 'border-[#C29043]/50 bg-[#071324]/80 hover:border-[#DEAB5B] hover:bg-[#081426]'
          }`}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0B1A30] border border-[#C29043] flex items-center justify-center text-[#DEAB5B] shadow-inner">
            {isUploading ? (
              <Disc className="w-6 h-6 animate-spin text-emerald-400" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-montserrat font-semibold text-[#FFF8E7]">
              {isUploading ? 'Procesando y almacenando archivo...' : 'Arrastra tu archivo MP4 o de audio aquí o haz clic para examinar'}
            </p>
            <p className="text-[11px] sm:text-xs font-garamond text-[#DEAB5B]/80">
              Soporta música o videos MP4 descargados desde tu computadora o celular. El audio se reproducirá y guardará de manera permanente.
            </p>
          </div>

          <button
            type="button"
            disabled={isUploading}
            className="px-5 py-2 rounded-xl text-xs font-montserrat font-bold tracking-wider uppercase bg-gradient-to-r from-[#DEAB5B] via-[#C29043] to-[#9E6F28] text-[#071324] hover:scale-105 transition-transform shadow-md"
          >
            SELECCIONAR ARCHIVO
          </button>
        </div>
      </div>

      {/* Start Second & Preview Loop Control */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0B1A30]/80 border border-[#C29043]/50 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#DEAB5B]" />
          <h3 className="text-sm sm:text-base font-cinzel font-bold text-copper-gradient tracking-wide uppercase">
            Segundo de Inicio y Bucle Continuo
          </h3>
        </div>

        <p className="text-xs font-garamond text-[#DEAB5B]/90 leading-relaxed">
          Configura en qué momento exacto de la canción quieres que empiece a sonar (por ejemplo, el estribillo o coro).
          <strong className="text-[#FFF8E7] ml-1">
            Al llegar al final, la canción volverá a repetirse automáticamente desde este segundo en un bucle continuo sin detenerse.
          </strong>
        </p>

        {/* Interactive Preview Player Card */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#030914] border border-[#C29043]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={togglePlayPreview}
                className="w-9 h-9 rounded-full bg-[#C29043] hover:bg-[#DEAB5B] text-[#030914] flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md cursor-pointer"
                title={isPlayingPreview ? 'Pausar vista previa' : 'Reproducir vista previa'}
              >
                {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="min-w-0">
                <span className="text-xs font-montserrat font-bold text-[#FFF8E7] block truncate">
                  Vista Previa del Audio
                </span>
                <span className="text-[10px] font-montserrat text-[#C29043]">
                  {formatTimeSeconds(previewCurrentTime)} / {formatTimeSeconds(previewDuration)}
                </span>
              </div>
            </div>

            {/* Quick Button: Capture current time */}
            <button
              onClick={handleCaptureCurrentTime}
              className="px-2.5 py-1.5 rounded-lg border border-[#C29043]/60 bg-[#0B1A30] hover:bg-[#C29043] hover:text-[#030914] text-[#DEAB5B] text-[10px] sm:text-xs font-montserrat font-bold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              title="Fija el segundo donde está pausada o sonando la vista previa"
            >
              <Clock className="w-3 h-3" />
              <span>Fijar segundo actual ({Math.floor(previewCurrentTime)}s)</span>
            </button>
          </div>

          {/* Scrubber Bar */}
          <div className="space-y-1">
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max={previewDuration || 100}
                step="0.5"
                value={previewCurrentTime}
                onChange={handleSeek}
                className="w-full accent-[#DEAB5B] bg-[#0B1A30] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Marker showing the start second */}
            <div className="flex items-center justify-between text-[10px] text-[#DEAB5B]/70 font-montserrat px-0.5">
              <span>00:00</span>
              <span className="text-[#DEAB5B] font-bold">
                Punto de inicio configurado: {formatTimeSeconds(startSecond)}
              </span>
              <span>{formatTimeSeconds(previewDuration)}</span>
            </div>
          </div>
        </div>

        {/* Second Selector Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Direct Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-montserrat uppercase tracking-wider text-[#DEAB5B] block">
              Segundo exacto de inicio:
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  max={previewDuration > 0 ? Math.floor(previewDuration - 1) : 9999}
                  value={startSecond}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setStartSecond(isNaN(val) ? 0 : Math.max(0, val));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#030914] border border-[#C29043]/60 text-base font-bold text-center text-[#FFF8E7] focus:outline-none focus:border-[#DEAB5B]"
                />
              </div>
              <div className="px-3 py-2 rounded-xl bg-[#030914] border border-[#C29043]/40 text-xs font-montserrat text-[#DEAB5B] shrink-0">
                = {formatTimeSeconds(startSecond)}
              </div>
            </div>
          </div>

          {/* Quick Fine Tuning */}
          <div className="space-y-1.5">
            <label className="text-xs font-montserrat uppercase tracking-wider text-[#DEAB5B] block">
              Ajuste fino del segundo:
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setStartSecond(0)}
                className="px-2.5 py-1.5 rounded-lg bg-[#030914] border border-[#C29043]/40 text-[11px] font-montserrat text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] cursor-pointer"
              >
                0s (Inicio)
              </button>
              <button
                type="button"
                onClick={() => adjustStartSecond(-5)}
                className="px-2.5 py-1.5 rounded-lg bg-[#030914] border border-[#C29043]/40 text-[11px] font-montserrat text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] cursor-pointer"
              >
                -5s
              </button>
              <button
                type="button"
                onClick={() => adjustStartSecond(-1)}
                className="px-2.5 py-1.5 rounded-lg bg-[#030914] border border-[#C29043]/40 text-[11px] font-montserrat text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] cursor-pointer"
              >
                -1s
              </button>
              <button
                type="button"
                onClick={() => adjustStartSecond(+1)}
                className="px-2.5 py-1.5 rounded-lg bg-[#030914] border border-[#C29043]/40 text-[11px] font-montserrat text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] cursor-pointer"
              >
                +1s
              </button>
              <button
                type="button"
                onClick={() => adjustStartSecond(+5)}
                className="px-2.5 py-1.5 rounded-lg bg-[#030914] border border-[#C29043]/40 text-[11px] font-montserrat text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] cursor-pointer"
              >
                +5s
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons: Test Loop & Save */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#C29043]/30">
          <button
            type="button"
            onClick={handleTestLoopJump}
            className="px-4 py-2.5 rounded-xl bg-[#030914] border border-[#C29043]/60 text-[#DEAB5B] hover:text-[#FFF8E7] hover:border-[#DEAB5B] text-xs font-montserrat flex items-center justify-center gap-2 cursor-pointer transition-all"
            title="Salta a 4 segundos antes de terminar la canción para escuchar cómo empalma el reinicio al segundo de inicio"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C29043]" />
            <span>Probar Bucle (Salto al final y repetición)</span>
          </button>

          <button
            type="button"
            onClick={handleSaveStartSecond}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DEAB5B] via-[#C29043] to-[#9E6F28] text-[#071324] font-montserrat font-bold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>GUARDAR CONFIGURACIÓN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
