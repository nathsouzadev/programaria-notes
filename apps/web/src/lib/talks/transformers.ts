import type { NotesMap } from '@/models/note';
import type { Talk, TalkRow } from '@/models/talk';

export function formatTalkNumber(id: number): string {
  return String(id + 1).padStart(2, '0');
}

export function toTalkRow(talk: Talk, notes: NotesMap, selectedId: number | null): TalkRow {
  const hasNote = Boolean(notes[String(talk.id)]);
  return {
    id: talk.id,
    number: formatTalkNumber(talk.id),
    title: talk.title,
    status: hasNote ? 'com anotação' : 'sem anotação',
    active: talk.id === selectedId,
  };
}

export function buildTotalLabel(annotated: number, total: number): string {
  if (annotated === 0) return '';
  return `${annotated} de ${total} palestras anotadas`;
}
