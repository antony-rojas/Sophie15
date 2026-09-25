import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { INVITATION_CONFIG } from '../config';
import { getCustomAudio, MUSIC_CHANGED_EVENT, getSavedStartSecond } from '../utils/audioStorage';

/**
 * Web Audio API synthesizer for magical fairytale bell chimes
 */
export const playMagicalChimes = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Pentatonic fairy bell notes (C6, E6, G6, B6, D7, E7)
    const frequencies = [1046.50, 1318.51, 1567.98, 1975.53, 2349.32, 2637.02];
    const now = ctx.currentTime;

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);

      gain.gain.setValueAtTime(0.001, now + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.2, now + index * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 1.3);
    });
  } catch (err) {
    console.warn('Audio chime note error:', err);
  }
};

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string>(INVITATION_CONFIG.musicUrl);
  const [trackTitle, setTrackTitle] = useState<string>('Vals de las Flores');
  const [isCustomTrack, setIsCustomTrack] = useState<boolean>(false);

  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const startSecondRef = useRef<number>(getSavedStartSecond());
  const objectUrlRef = useRef<string | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Keep isPlayingRef updated without triggering dependency re-runs
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Load custom music from IndexedDB or revert to default
  const loadAudioTrack = useCallback(async (shouldPreservePlayState = false) => {
    try {
      const customTrack = await getCustomAudio();

      if (customTrack && customTrack.blob) {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
        }
        const newUrl = URL.createObjectURL(customTrack.blob);
        objectUrlRef.current = newUrl;

        setAudioSrc(newUrl);
        setTrackTitle(customTrack.fileName || 'Canción Personalizada');
        setIsCustomTrack(true);
        startSecondRef.current = customTrack.startSecond || 0;

        if (mediaRef.current) {
          mediaRef.current.src = newUrl;
          mediaRef.current.load();
        }
      } else {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
        setAudioSrc(INVITATION_CONFIG.musicUrl);
        setTrackTitle('Vals de las Flores');
        setIsCustomTrack(false);
        startSecondRef.current = getSavedStartSecond();

        if (mediaRef.current) {
          mediaRef.current.src = INVITATION_CONFIG.musicUrl;
          mediaRef.current.load();
        }
      }

      if (shouldPreservePlayState && mediaRef.current && isPlayingRef.current) {
        const media = mediaRef.current;
        const startSec = startSecondRef.current;
        try {
          if (media.readyState >= 1 && startSec > 0) {
            media.currentTime = startSec;
          }
          media.play().catch(console.warn);
        } catch (e) {
          console.warn('Error resuming playback after track change:', e);
        }
      }
    } catch (err) {
      console.warn('Error cargando pista de audio personalizada:', err);
    }
  }, []);

  // Initial track load & cleanup (runs only once on mount)
  useEffect(() => {
    loadAudioTrack();

    const handleMusicChanged = () => {
      loadAudioTrack(true);
    };

    const handleDirectPlay = () => {
      playMusic();
    };

    window.addEventListener(MUSIC_CHANGED_EVENT, handleMusicChanged);
    window.addEventListener('sophie_play_music', handleDirectPlay);

    return () => {
      window.removeEventListener(MUSIC_CHANGED_EVENT, handleMusicChanged);
      window.removeEventListener('sophie_play_music', handleDirectPlay);
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [loadAudioTrack]);

  // Auto-play trigger from hero doors (backup to direct event)
  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted) {
      playMusic();
    }
  }, [autoPlayTrigger, hasInteracted]);

  const playMusic = () => {
    const media = mediaRef.current;
    if (!media) return;

    media.volume = 0.45;
    const startSec = startSecondRef.current;

    // Apply start time if starting from beginning or ended
    if (startSec > 0 && (media.currentTime < startSec || media.ended)) {
      try {
        if (media.readyState >= 1) {
          media.currentTime = startSec;
        }
      } catch (e) {
        console.warn('Seeking before load, will reapply on play:', e);
      }
    }

    media
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
        // Ensure seek is respected once playback starts
        if (startSec > 0 && Math.abs(media.currentTime - startSec) > 1 && media.currentTime < startSec) {
          try {
            media.currentTime = startSec;
          } catch (err) {
            console.warn(err);
          }
        }
      })
      .catch((err) => {
        console.warn('Audio autoplay prevented or error:', err);
        setIsPlaying(false);
      });
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
      setIsPlaying(false);
    } else {
      // Resume or restart playback
      if (media.ended || media.currentTime < startSecondRef.current) {
        try {
          media.currentTime = startSecondRef.current;
        } catch (e) {
          console.warn(e);
        }
      }

      media
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Error resuming playback, reloading media:', err);
          media.load();
          media
            .play()
            .then(() => setIsPlaying(true))
            .catch((e) => console.warn('Retry failed:', e));
        });
    }
  };

  /**
   * Continuous loop behavior from specified startSecond to end:
   * When song reaches the end, reset currentTime back to startSecond and replay
   */
  const handleSongEnded = () => {
    const media = mediaRef.current;
    if (!media) return;
    const startSec = startSecondRef.current;
    try {
      media.currentTime = startSec;
      media
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.warn('Error looping audio:', err));
    } catch (err) {
      console.warn('Error resetting audio to startSecond on ended:', err);
    }
  };

  const handleLoadedMetadata = () => {
    const media = mediaRef.current;
    if (!media) return;
    const startSec = startSecondRef.current;
    if (startSec > 0 && media.currentTime < startSec && !isPlayingRef.current) {
      try {
        media.currentTime = startSec;
      } catch (e) {
        console.warn('Could not set initial currentTime on metadata load:', e);
      }
    }
  };

  const handleMediaError = (e: React.SyntheticEvent<HTMLMediaElement, Event>) => {
    console.warn('Media element warning/error event:', e);
  };

  return (
    <>
      {/* 
        Persistent media element:
        Uses <video> with playsInline which supports all MP4, MP3, WAV, M4A, OGG formats seamlessly.
        Crucial: Rendered off-screen without `display: none` so browsers (Chrome/Safari) NEVER suspend
        or freeze playback when paused or when looping.
      */}
      <video
        ref={mediaRef}
        src={audioSrc}
        playsInline
        preload="auto"
        onEnded={handleSongEnded}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleMediaError}
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

      {/* Floating Minimalist Music Toggle Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Subtle tooltip / label with status only (no track name) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#081426]/90 border border-[#C29043]/40 backdrop-blur-md text-xs font-montserrat text-[#DEAB5B] tracking-wider shadow-lg">
          <Music className={`w-3.5 h-3.5 text-[#C29043] shrink-0 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span className="truncate">
            {isPlaying ? 'Música ON' : 'Música OFF'}
          </span>
        </div>

        {/* Circular Floating Button */}
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className="relative group p-3.5 rounded-full bg-[#081426]/90 border border-[#C29043]/60 text-[#C29043] hover:text-[#FDF3DF] hover:border-[#DEAB5B] transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(194,144,67,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          id="music-toggle-btn"
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {/* Animated pulsing golden ring when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-[#C29043] animate-ping opacity-35" />
          )}

          {isPlaying ? (
            <Volume2 className="w-5 h-5 filter drop-shadow-[0_0_6px_#C29043]" />
          ) : (
            <VolumeX className="w-5 h-5 text-[#DEAB5B]/70" />
          )}

          {/* Note symbol ♪ indicator */}
          <span className="absolute -top-1 -right-1 text-xs font-serif font-bold text-[#FDF3DF] bg-[#7A1727] w-4 h-4 rounded-full flex items-center justify-center border border-[#C29043]/50 shadow-sm">
            ♪
          </span>
        </button>
      </div>
    </>
  );
};
