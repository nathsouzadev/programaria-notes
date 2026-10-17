export interface Talk {
  id: number;
  title: string;
}

/** UI-row shape consumed by the talk list. */
export interface TalkRow {
  id: number;
  number: string;
  title: string;
  status: string;
  active: boolean;
}
