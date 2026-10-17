import { buildTotalLabel, formatTalkNumber, toTalkRow } from '@/lib/talks/transformers';

describe('transformers', () => {
  describe('formatTalkNumber', () => {
    it('should zero-pad the 1-based number', () => {
      expect(formatTalkNumber(0)).toBe('01');
      expect(formatTalkNumber(9)).toBe('10');
    });
  });

  describe('toTalkRow', () => {
    const talk = { id: 1, title: 'Palestra' };

    it('should mark the row as annotated when a note exists', () => {
      const row = toTalkRow(talk, { '1': { text: 'a', updatedAt: 1 } }, null);

      expect(row).toMatchObject({ id: 1, number: '02', title: 'Palestra', status: 'com anotação', active: false });
    });

    it('should mark the row as empty and active when selected', () => {
      const row = toTalkRow(talk, {}, 1);

      expect(row).toMatchObject({ status: 'sem anotação', active: true });
    });
  });

  describe('buildTotalLabel', () => {
    it('should return an empty string when nothing is annotated', () => {
      expect(buildTotalLabel(0, 8)).toBe('');
    });

    it('should describe annotated count over total', () => {
      expect(buildTotalLabel(3, 8)).toBe('3 de 8 palestras anotadas');
    });
  });
});
