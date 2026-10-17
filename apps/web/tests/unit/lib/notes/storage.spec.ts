import { NOTES_STORAGE_KEY, loadNotes, saveNotes } from '@/lib/notes/storage';

function makeStorage(initial: Record<string, string> = {}): Storage {
  const data = new Map(Object.entries(initial));
  return {
    getItem: jest.fn((key: string) => data.get(key) ?? null),
    setItem: jest.fn((key: string, value: string) => void data.set(key, value)),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn(),
    length: 0,
  };
}

describe('storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadNotes', () => {
    it('should return an empty map when nothing is stored', () => {
      expect(loadNotes(makeStorage())).toEqual({});
    });

    it('should parse the stored notes map', () => {
      const stored = { '1': { text: 'oi', updatedAt: 1 } };
      const storage = makeStorage({ [NOTES_STORAGE_KEY]: JSON.stringify(stored) });

      expect(loadNotes(storage)).toEqual(stored);
    });

    it('should return an empty map on invalid JSON', () => {
      const storage = makeStorage({ [NOTES_STORAGE_KEY]: '{not json' });

      expect(loadNotes(storage)).toEqual({});
    });

    it('should return an empty map when the stored value is not an object', () => {
      const storage = makeStorage({ [NOTES_STORAGE_KEY]: '[1,2]' });

      expect(loadNotes(storage)).toEqual({});
    });
  });

  describe('saveNotes', () => {
    it('should serialize notes under the storage key', () => {
      const storage = makeStorage();
      const notes = { '0': { text: 'a', updatedAt: 10 } };

      saveNotes(storage, notes);

      expect(storage.setItem).toHaveBeenCalledWith(NOTES_STORAGE_KEY, JSON.stringify(notes));
    });

    it('should swallow storage errors', () => {
      const storage = makeStorage();
      (storage.setItem as jest.Mock).mockImplementation(() => {
        throw new Error('quota');
      });

      expect(() => saveNotes(storage, {})).not.toThrow();
    });
  });
});
