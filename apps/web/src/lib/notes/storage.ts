import type { NotesMap } from '@/models/note';

/** Same key as the prototype so existing notes in the browser carry over. */
export const NOTES_STORAGE_KEY = 'programaria-notas-v2';

export function loadNotes(storage: Storage): NotesMap {
  try {
    const raw = storage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return isNotesMap(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveNotes(storage: Storage, notes: NotesMap): void {
  try {
    storage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Storage may be unavailable (private mode, quota). Notes stay in memory.
  }
}

function isNotesMap(value: unknown): value is NotesMap {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
