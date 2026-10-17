import { createNotesStore } from '@/lib/notes/notes-store';

const mockLoadNotes = jest.fn();
const mockSaveNotes = jest.fn();
jest.mock('@/lib/notes/storage', () => ({
  loadNotes: (...args: unknown[]) => mockLoadNotes(...args),
  saveNotes: (...args: unknown[]) => mockSaveNotes(...args),
}));

const storage = {} as Storage;

describe('createNotesStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadNotes.mockReturnValue({});
  });

  it('should load from storage once and cache the snapshot', () => {
    const notes = { '1': { text: 'a', updatedAt: 1 } };
    mockLoadNotes.mockReturnValue(notes);
    const store = createNotesStore(() => storage);

    const first = store.getSnapshot();
    const second = store.getSnapshot();

    expect(mockLoadNotes).toHaveBeenCalledTimes(1);
    expect(mockLoadNotes).toHaveBeenCalledWith(storage);
    expect(first).toBe(second);
    expect(first).toEqual(notes);
  });

  it('should return an empty server snapshot', () => {
    const store = createNotesStore(() => storage);

    expect(store.getServerSnapshot()).toEqual({});
  });

  it('should persist, update the snapshot and notify subscribers on set', () => {
    const store = createNotesStore(() => storage);
    const listener = jest.fn();
    store.subscribe(listener);
    const notes = { '2': { text: 'b', updatedAt: 2 } };

    store.set(notes);

    expect(mockSaveNotes).toHaveBeenCalledWith(storage, notes);
    expect(store.getSnapshot()).toBe(notes);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should stop notifying after unsubscribe', () => {
    const store = createNotesStore(() => storage);
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    unsubscribe();
    store.set({});

    expect(listener).not.toHaveBeenCalled();
  });
});
