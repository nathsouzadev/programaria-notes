import { formatDateTime, formatUpdatedAt } from '@/lib/format/date';

describe('date format', () => {
  const timestamp = new Date(2026, 9, 17, 14, 5).getTime();

  describe('formatDateTime', () => {
    it('should render day, short month and time separated by a dot', () => {
      expect(formatDateTime(timestamp)).toMatch(/^17 de out\.? · 14:05$/);
    });
  });

  describe('formatUpdatedAt', () => {
    it('should prefix with "atualizada"', () => {
      expect(formatUpdatedAt(timestamp)).toMatch(/^atualizada 17 de out\.? · 14:05$/);
    });
  });
});
