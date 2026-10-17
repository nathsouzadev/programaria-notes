export interface Note {
  text: string;
  updatedAt: number;
}

/** Keyed by talk id (stringified, as stored in localStorage). */
export type NotesMap = Record<string, Note>;
