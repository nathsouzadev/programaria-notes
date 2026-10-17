import { countNotes, getNote, removeNote, upsertNote } from '@/lib/notes/notes';

describe('notes', () => {
  describe('getNote', () => {
    it('should return the note for the talk id', () => {
      const note = { text: 'x', updatedAt: 1 };

      expect(getNote({ '3': note }, 3)).toEqual(note);
    });

    it('should return null when the talk has no note', () => {
      expect(getNote({}, 3)).toBeNull();
    });
  });

  describe('upsertNote', () => {
    it('should store the trimmed text with the given timestamp', () => {
      const result = upsertNote({}, 2, '  olá  ', 123);

      expect(result).toEqual({ '2': { text: 'olá', updatedAt: 123 } });
    });

    it('should remove the note when the text is blank', () => {
      const result = upsertNote({ '2': { text: 'a', updatedAt: 1 } }, 2, '   ', 5);

      expect(result).toEqual({});
    });

    it('should not mutate the input map', () => {
      const input = {};

      upsertNote(input, 1, 'a', 1);

      expect(input).toEqual({});
    });
  });

  describe('removeNote', () => {
    it('should remove only the given talk note', () => {
      const notes = { '1': { text: 'a', updatedAt: 1 }, '2': { text: 'b', updatedAt: 2 } };

      expect(removeNote(notes, 1)).toEqual({ '2': { text: 'b', updatedAt: 2 } });
    });
  });

  describe('countNotes', () => {
    it('should count stored notes', () => {
      expect(countNotes({ '1': { text: 'a', updatedAt: 1 }, '5': { text: 'b', updatedAt: 2 } })).toBe(2);
    });
  });
});
