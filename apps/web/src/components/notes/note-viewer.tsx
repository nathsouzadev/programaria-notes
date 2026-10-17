import { Icon } from '@programaria/ui/icon';
import type { KeyboardEvent } from 'react';
import type { Note } from '@/models/note';
import styles from './note-viewer.module.css';

interface NoteViewerProps {
  note: Note | null;
  updatedLabel: string;
  onUnlock: () => void;
}

/** Locked note block. The whole surface unlocks the editor on click/Enter/Space. */
export function NoteViewer({ note, updatedLabel, onUnlock }: NoteViewerProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onUnlock();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Editar anotação"
      onClick={onUnlock}
      onKeyDown={handleKeyDown}
      className={styles.block}
    >
      {note ? (
        <p className={styles.text}>{note.text}</p>
      ) : (
        <div className={styles.empty}>
          <span className={styles.braces}>{'{ }'}</span>
          <span className={styles.hint}>Clique aqui para começar a anotar</span>
        </div>
      )}
      <div className={styles.footer}>
        <span className={styles.meta}>{updatedLabel}</span>
        <span className={styles.meta}>
          <Icon name="lock" size={16} /> bloqueado · clique para editar
        </span>
      </div>
    </div>
  );
}
