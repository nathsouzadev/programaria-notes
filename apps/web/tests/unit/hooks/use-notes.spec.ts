import { act, renderHook } from '@testing-library/react';
import { useNotes } from '@/hooks/use-notes';
import type { NotesMap } from '@/models/note';

let storeNotes: NotesMap = {};
const listeners = new Set<() => void>();
const mockSet = jest.fn((next: NotesMap) => {
  storeNotes = next;
  listeners.forEach((listener) => listener());
});

jest.mock('@/lib/notes/notes-store', () => ({
  notesStore: {
    getSnapshot: () => storeNotes,
    getServerSnapshot: () => ({}),
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set: (next: NotesMap) => mockSet(next),
  },
}));

describe('useNotes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storeNotes = {};
    listeners.clear();
  });

  it('should read notes from the store', () => {
    storeNotes = { '0': { text: 'a', updatedAt: 1 } };

    const { result } = renderHook(() => useNotes());

    expect(result.current.talks[0]).toMatchObject({ status: 'com anotação' });
    expect(result.current.totalLabel).toBe('1 de 8 palestras anotadas');
  });

  it('should start with no selection and eight talks', () => {
    const { result } = renderHook(() => useNotes());

    expect(result.current.selected).toBeNull();
    expect(result.current.talks).toHaveLength(8);
    expect(result.current.totalLabel).toBe('');
  });

  it('should select a talk and expose its number and title', () => {
    const { result } = renderHook(() => useNotes());

    act(() => result.current.select(4));

    expect(result.current.selected).toMatchObject({ id: 4, title: 'Decifrando entrevistas técnicas' });
    expect(result.current.selectedNumber).toBe('05');
    expect(result.current.talks[4]).toMatchObject({ active: true });
  });

  it('should open the editor with the current note text on unlock', () => {
    storeNotes = { '2': { text: 'texto', updatedAt: 1 } };
    const { result } = renderHook(() => useNotes());

    act(() => result.current.select(2));
    act(() => result.current.unlock());

    expect(result.current.editing).toBe(true);
    expect(result.current.draft).toBe('texto');
  });

  it('should save the draft to the store and close the editor', () => {
    const { result } = renderHook(() => useNotes());

    act(() => result.current.select(1));
    act(() => result.current.unlock());
    act(() => result.current.changeDraft('  nova anotação '));
    act(() => result.current.save());

    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({ '1': expect.objectContaining({ text: 'nova anotação' }) }),
    );
    expect(result.current.editing).toBe(false);
    expect(result.current.note).toMatchObject({ text: 'nova anotação' });
    expect(result.current.updatedLabel).toMatch(/^atualizada /);
  });

  it('should discard the draft on cancel without writing to the store', () => {
    const { result } = renderHook(() => useNotes());

    act(() => result.current.select(1));
    act(() => result.current.unlock());
    act(() => result.current.changeDraft('rascunho'));
    act(() => result.current.cancel());

    expect(mockSet).not.toHaveBeenCalled();
    expect(result.current.editing).toBe(false);
    expect(result.current.note).toBeNull();
  });

  it('should toggle the removal confirmation', () => {
    const { result } = renderHook(() => useNotes());

    act(() => result.current.askRemove());
    expect(result.current.confirming).toBe(true);

    act(() => result.current.cancelRemove());
    expect(result.current.confirming).toBe(false);
  });

  it('should remove the note through the store', () => {
    storeNotes = { '3': { text: 'x', updatedAt: 1 } };
    const { result } = renderHook(() => useNotes());

    act(() => result.current.select(3));
    act(() => result.current.unlock());
    act(() => result.current.remove());

    expect(mockSet).toHaveBeenCalledWith({});
    expect(result.current.note).toBeNull();
    expect(result.current.editing).toBe(false);
  });

  it('should clear the selection on back', () => {
    const { result } = renderHook(() => useNotes());

    act(() => result.current.select(0));
    act(() => result.current.back());

    expect(result.current.selected).toBeNull();
    expect(result.current.selectedNumber).toBe('');
  });
});
