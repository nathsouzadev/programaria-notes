import type { Note, NotesMap } from '@/models/note';

export function getNote(notes: NotesMap, talkId: number): Note | null {
  return notes[String(talkId)] ?? null;
}

/** Trims the text; an empty result removes the note instead of saving a blank one. */
export function upsertNote(notes: NotesMap, talkId: number, text: string, now: number): NotesMap {
  const trimmed = text.trim();
  if (!trimmed) return removeNote(notes, talkId);
  return { ...notes, [String(talkId)]: { text: trimmed, updatedAt: now } };
}

export function removeNote(notes: NotesMap, talkId: number): NotesMap {
  const next = { ...notes };
  delete next[String(talkId)];
  return next;
}

export function countNotes(notes: NotesMap): number {
  return Object.keys(notes).length;
}
