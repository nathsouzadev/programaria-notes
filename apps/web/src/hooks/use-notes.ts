import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { formatUpdatedAt } from '@/lib/format/date';
import { countNotes, getNote, removeNote, upsertNote } from '@/lib/notes/notes';
import { notesStore } from '@/lib/notes/notes-store';
import { TALKS, findTalk } from '@/lib/talks/talks';
import { buildTotalLabel, formatTalkNumber, toTalkRow } from '@/lib/talks/transformers';
import type { Note } from '@/models/note';
import type { Talk, TalkRow } from '@/models/talk';

export interface UseNotesResult {
  talks: TalkRow[];
  totalLabel: string;
  selected: Talk | null;
  selectedNumber: string;
  note: Note | null;
  updatedLabel: string;
  editing: boolean;
  draft: string;
  confirming: boolean;
  select: (talkId: number) => void;
  back: () => void;
  unlock: () => void;
  changeDraft: (value: string) => void;
  save: () => void;
  cancel: () => void;
  askRemove: () => void;
  cancelRemove: () => void;
  remove: () => void;
}

export function useNotes(): UseNotesResult {
  const notes = useSyncExternalStore(
    notesStore.subscribe,
    notesStore.getSnapshot,
    notesStore.getServerSnapshot,
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [confirming, setConfirming] = useState(false);

  const closeEditor = useCallback(() => {
    setEditing(false);
    setDraft('');
    setConfirming(false);
  }, []);

  const selected = selectedId === null ? null : findTalk(selectedId);
  const note = selectedId === null ? null : getNote(notes, selectedId);

  const talks = useMemo(
    () => TALKS.map((talk) => toTalkRow(talk, notes, selectedId)),
    [notes, selectedId],
  );

  const select = useCallback(
    (talkId: number) => {
      setSelectedId(talkId);
      closeEditor();
    },
    [closeEditor],
  );

  const back = useCallback(() => {
    setSelectedId(null);
    closeEditor();
  }, [closeEditor]);

  const unlock = useCallback(() => {
    setDraft(note ? note.text : '');
    setConfirming(false);
    setEditing(true);
  }, [note]);

  const save = useCallback(() => {
    if (selectedId === null) return;
    notesStore.set(upsertNote(notes, selectedId, draft, Date.now()));
    closeEditor();
  }, [closeEditor, draft, notes, selectedId]);

  const remove = useCallback(() => {
    if (selectedId === null) return;
    notesStore.set(removeNote(notes, selectedId));
    closeEditor();
  }, [closeEditor, notes, selectedId]);

  return {
    talks,
    totalLabel: buildTotalLabel(countNotes(notes), TALKS.length),
    selected,
    selectedNumber: selectedId === null ? '' : formatTalkNumber(selectedId),
    note,
    updatedLabel: note ? formatUpdatedAt(note.updatedAt) : '',
    editing,
    draft,
    confirming,
    select,
    back,
    unlock,
    changeDraft: setDraft,
    save,
    cancel: closeEditor,
    askRemove: () => setConfirming(true),
    cancelRemove: () => setConfirming(false),
    remove,
  };
}
