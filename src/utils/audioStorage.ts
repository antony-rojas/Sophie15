/**
 * Utility for persisting custom music audio blobs and start time in IndexedDB
 * allowing offline persistence of large audio files (MP3, WAV, M4A, OGG)
 */

export interface StoredAudioTrack {
  key: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  blob?: Blob;
  arrayBuffer?: ArrayBuffer;
  startSecond: number;
  duration?: number;
  updatedAt: number;
}

const DB_NAME = 'SophieShanell_AudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'music_store';
const TRACK_KEY = 'active_custom_music';
const START_SEC_KEY = 'sophie_music_start_sec';
const HAS_CUSTOM_KEY = 'sophie_has_custom_music';

export const MUSIC_CHANGED_EVENT = 'sophie_custom_music_changed';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB no está disponible en este entorno'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Error al abrir la base de datos de audio'));
  });
}

/**
 * Save custom audio file blob and start second to IndexedDB
 * Reads raw bytes into ArrayBuffer to ensure 100% permanent persistence
 * across page reloads and browser restarts (preventing File reference expiry)
 */
export async function saveCustomAudio(
  fileOrBlob: Blob,
  fileName: string,
  startSecond: number = 0,
  duration?: number
): Promise<{
  fileName: string;
  fileSize: number;
  fileType: string;
  blob: Blob;
  startSecond: number;
  duration?: number;
}> {
  const db = await openDB();

  // Read full binary bytes to survive page reloads in all browsers
  const arrayBuffer = await fileOrBlob.arrayBuffer();

  const isMp4 = fileName.toLowerCase().endsWith('.mp4') || fileOrBlob.type.includes('mp4');
  const defaultMime = isMp4 ? 'video/mp4' : 'audio/mpeg';
  const fileType = fileOrBlob.type || defaultMime;

  const record: StoredAudioTrack = {
    key: TRACK_KEY,
    fileName,
    fileSize: arrayBuffer.byteLength,
    fileType,
    arrayBuffer,
    startSecond: Math.max(0, Math.floor(startSecond)),
    duration: duration ? Math.round(duration) : undefined,
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(record);

    putRequest.onsuccess = () => {
      try {
        localStorage.setItem(START_SEC_KEY, String(record.startSecond));
        localStorage.setItem(HAS_CUSTOM_KEY, 'true');
        localStorage.setItem('sophie_custom_music_name', fileName);
      } catch (e) {
        console.warn('LocalStorage error caching audio metadata:', e);
      }
      notifyMusicChanged();
      const freshBlob = new Blob([arrayBuffer], { type: fileType });
      resolve({
        fileName,
        fileSize: arrayBuffer.byteLength,
        fileType,
        blob: freshBlob,
        startSecond: record.startSecond,
        duration: record.duration,
      });
    };

    putRequest.onerror = () => reject(putRequest.error || new Error('No se pudo guardar el archivo de audio'));
  });
}

/**
 * Update only the start second of the existing audio
 */
export async function updateAudioStartSecond(startSecond: number): Promise<void> {
  const cleanSec = Math.max(0, Math.floor(startSecond));

  try {
    localStorage.setItem(START_SEC_KEY, String(cleanSec));
  } catch (e) {
    console.warn('LocalStorage error setting start second:', e);
  }

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(TRACK_KEY);

      getReq.onsuccess = () => {
        const record = getReq.result;
        if (record) {
          record.startSecond = cleanSec;
          record.updatedAt = Date.now();
          const putReq = store.put(record);
          putReq.onsuccess = () => resolve();
          putReq.onerror = () => reject(putReq.error);
        } else {
          resolve();
        }
      };
      getReq.onerror = () => reject(getReq.error);
    });
  } catch (err) {
    console.warn('Error updating start second in IndexedDB:', err);
  }

  notifyMusicChanged();
}

/**
 * Retrieve the active custom audio track from IndexedDB
 * Reconstitutes fresh Blob from raw ArrayBuffer bytes
 */
export async function getCustomAudio(): Promise<{
  fileName: string;
  fileSize: number;
  fileType: string;
  blob: Blob;
  startSecond: number;
  duration?: number;
} | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(TRACK_KEY);

      getReq.onsuccess = async () => {
        const result = getReq.result;
        if (!result) {
          resolve(null);
          return;
        }

        let blob: Blob | null = null;
        if (result.arrayBuffer && result.arrayBuffer instanceof ArrayBuffer) {
          blob = new Blob([result.arrayBuffer], { type: result.fileType || 'audio/mpeg' });
        } else if (result.blob && result.blob instanceof Blob) {
          // Attempt to upgrade legacy Blob to permanent ArrayBuffer
          try {
            const buf = await result.blob.arrayBuffer();
            if (buf && buf.byteLength > 0) {
              result.arrayBuffer = buf;
              blob = new Blob([buf], { type: result.fileType || 'audio/mpeg' });
              const upgradeTx = db.transaction(STORE_NAME, 'readwrite');
              upgradeTx.objectStore(STORE_NAME).put(result);
            } else {
              blob = result.blob;
            }
          } catch {
            blob = result.blob;
          }
        }

        if (!blob) {
          resolve(null);
          return;
        }

        resolve({
          fileName: result.fileName,
          fileSize: result.fileSize,
          fileType: result.fileType,
          blob,
          startSecond: result.startSecond || 0,
          duration: result.duration,
        });
      };
      getReq.onerror = () => {
        resolve(null);
      };
    });
  } catch (err) {
    console.warn('IndexedDB no accesible para leer música:', err);
    return null;
  }
}

/**
 * Delete custom audio track and revert to default classical song
 */
export async function deleteCustomAudio(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const delReq = store.delete(TRACK_KEY);

      delReq.onsuccess = () => resolve();
      delReq.onerror = () => reject(delReq.error);
    });
  } catch (err) {
    console.warn('Error deleting custom audio track:', err);
  }

  try {
    localStorage.removeItem(HAS_CUSTOM_KEY);
    localStorage.removeItem(START_SEC_KEY);
    localStorage.removeItem('sophie_custom_music_name');
  } catch (e) {
    console.warn(e);
  }

  notifyMusicChanged();
}

/**
 * Fast synchronous check for configured start second
 */
export function getSavedStartSecond(): number {
  try {
    const val = localStorage.getItem(START_SEC_KEY);
    return val ? Math.max(0, parseInt(val, 10) || 0) : 0;
  } catch {
    return 0;
  }
}

/**
 * Broadcast event to notify MusicPlayer across the applet
 */
export function notifyMusicChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MUSIC_CHANGED_EVENT));
  }
}

/**
 * Format seconds into mm:ss
 */
export function formatTimeSeconds(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
