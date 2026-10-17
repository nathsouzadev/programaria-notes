import { Button } from '@programaria/ui/button';
import { Icon } from '@programaria/ui/icon';
import type { KeyboardEvent } from 'react';
import styles from './note-editor.module.css';

interface NoteEditorProps {
  draft: string;
  hasNote: boolean;
  confirming: boolean;
  onDraftChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onAskRemove: () => void;
  onCancelRemove: () => void;
  onRemove: () => void;
}

export function NoteEditor({
  draft,
  hasNote,
  confirming,
  onDraftChange,
  onSave,
  onCancel,
  onAskRemove,
  onCancelRemove,
  onRemove,
}: NoteEditorProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') onSave();
    if (event.key === 'Escape') onCancel();
  };

  return (
    <div className={styles.editor}>
      <textarea
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder="Escreva sua anotação…"
        aria-label="Anotação"
        className={styles.textarea}
      />
      <div className={styles.footer}>
        <span className={styles.hint}>⌘/ctrl + enter para salvar · esc para cancelar</span>
        <div className={styles.actions}>
          {hasNote && !confirming && (
            <Button variant="danger" onClick={onAskRemove}>
              <Icon name="delete" size={18} /> excluir
            </Button>
          )}
          {hasNote && confirming && (
            <>
              <Button variant="danger-solid" onClick={onRemove}>
                confirmar exclusão
              </Button>
              <Button variant="ghost" onClick={onCancelRemove}>
                não
              </Button>
            </>
          )}
          <Button variant="outline" onClick={onCancel}>
            cancelar
          </Button>
          <Button variant="primary" onClick={onSave}>
            salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
