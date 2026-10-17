import { MonoLabel } from '@/components/ui/mono-label';
import type { TalkRow } from '@/models/talk';
import styles from './talk-list.module.css';

interface TalkListProps {
  talks: TalkRow[];
  onSelect: (talkId: number) => void;
}

export function TalkList({ talks, onSelect }: TalkListProps) {
  return (
    <aside className={styles.aside} aria-label="Lista de palestras">
      <MonoLabel className={styles.heading}>palestras</MonoLabel>
      {talks.map((talk) => (
        // Native <button>: the whole multi-region card is the clickable surface (card exception).
        <button
          key={talk.id}
          type="button"
          onClick={() => onSelect(talk.id)}
          aria-current={talk.active ? 'true' : undefined}
          className={[styles.card, talk.active ? styles.cardActive : ''].join(' ')}
        >
          <span className={styles.number}>{talk.number}</span>
          <span className={styles.body}>
            <span className={styles.title}>{talk.title}</span>
            <span className={styles.status}>{talk.status}</span>
          </span>
        </button>
      ))}
    </aside>
  );
}
