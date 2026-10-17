'use client';

import { Button } from '@programaria/ui/button';
import { Icon } from '@programaria/ui/icon';
import { MonoLabel } from '@/components/ui/mono-label';
import { useNarrow } from '@/hooks/use-narrow';
import { useNotes } from '@/hooks/use-notes';
import { AppHeader } from './app-header';
import { EmptySelection } from './empty-selection';
import { NoteEditor } from './note-editor';
import { NoteViewer } from './note-viewer';
import { TalkList } from './talk-list';
import styles from './notes-workspace.module.css';

export function NotesWorkspace() {
  const narrow = useNarrow();
  const notes = useNotes();
  const hasSelection = notes.selected !== null;
  const showList = !narrow || !hasSelection;

  return (
    <div className={styles.shell}>
      <AppHeader totalLabel={notes.totalLabel} />
      <div className={[styles.grid, narrow ? styles.gridNarrow : ''].join(' ')}>
        {showList && <TalkList talks={notes.talks} onSelect={notes.select} />}
        <main className={styles.main}>
          {notes.selected ? (
            <div className={styles.detail}>
              {narrow && (
                <Button variant="link" onClick={notes.back} className={styles.back}>
                  <Icon name="arrow-back" size={20} /> palestras
                </Button>
              )}
              <div className={styles.titleBlock}>
                <MonoLabel>palestra {notes.selectedNumber}</MonoLabel>
                <h1 className={styles.title}>{notes.selected.title}</h1>
              </div>
              {notes.editing ? (
                <NoteEditor
                  draft={notes.draft}
                  hasNote={notes.note !== null}
                  confirming={notes.confirming}
                  onDraftChange={notes.changeDraft}
                  onSave={notes.save}
                  onCancel={notes.cancel}
                  onAskRemove={notes.askRemove}
                  onCancelRemove={notes.cancelRemove}
                  onRemove={notes.remove}
                />
              ) : (
                <NoteViewer note={notes.note} updatedLabel={notes.updatedLabel} onUnlock={notes.unlock} />
              )}
            </div>
          ) : (
            <EmptySelection />
          )}
        </main>
      </div>
    </div>
  );
}
