import type { NotesMap } from '@/models/note';
import { loadNotes, saveNotes } from './storage';

export interface NotesStore {
  getSnapshot: () => NotesMap;
  getServerSnapshot: () => NotesMap;
  subscribe: (listener: () => void) => () => void;
  set: (notes: NotesMap) => void;
}

const EMPTY: NotesMap = {};

/**
 * External store over localStorage, consumed through `useSyncExternalStore`.
 * The snapshot is cached so React gets a stable reference between writes.
 */
export function createNotesStore(getStorage: () => Storage): NotesStore {
  let cache: NotesMap | null = null;
  const listeners = new Set<() => void>();

  return {
    getSnapshot() {
      if (cache === null) cache = loadNotes(getStorage());
      return cache;
    },
    getServerSnapshot() {
      return EMPTY;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set(notes) {
      cache = notes;
      saveNotes(getStorage(), notes);
      listeners.forEach((listener) => listener());
    },
  };
}

export const notesStore = createNotesStore(() => window.localStorage);
