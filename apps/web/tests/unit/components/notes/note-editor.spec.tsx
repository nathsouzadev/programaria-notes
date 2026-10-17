import { fireEvent, render, screen } from '@testing-library/react';
import { NoteEditor } from '@/components/notes/note-editor';

const handlers = {
  onDraftChange: jest.fn(),
  onSave: jest.fn(),
  onCancel: jest.fn(),
  onAskRemove: jest.fn(),
  onCancelRemove: jest.fn(),
  onRemove: jest.fn(),
};

function renderEditor(props: Partial<{ draft: string; hasNote: boolean; confirming: boolean }> = {}) {
  return render(<NoteEditor draft="" hasNote={false} confirming={false} {...handlers} {...props} />);
}

describe('NoteEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the draft in a focused textarea', () => {
    renderEditor({ draft: 'texto' });

    const textarea = screen.getByRole('textbox', { name: 'Anotação' });
    expect(textarea).toHaveValue('texto');
    expect(textarea).toHaveFocus();
  });

  it('should propagate draft changes', () => {
    renderEditor();

    fireEvent.change(screen.getByRole('textbox', { name: 'Anotação' }), { target: { value: 'novo' } });

    expect(handlers.onDraftChange).toHaveBeenCalledWith('novo');
  });

  it('should save on ctrl/meta + enter and cancel on escape', () => {
    renderEditor();
    const textarea = screen.getByRole('textbox', { name: 'Anotação' });

    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    fireEvent.keyDown(textarea, { key: 'Enter', metaKey: true });
    fireEvent.keyDown(textarea, { key: 'Escape' });

    expect(handlers.onSave).toHaveBeenCalledTimes(2);
    expect(handlers.onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call save and cancel from the buttons', () => {
    renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'salvar' }));
    fireEvent.click(screen.getByRole('button', { name: 'cancelar' }));

    expect(handlers.onSave).toHaveBeenCalledTimes(1);
    expect(handlers.onCancel).toHaveBeenCalledTimes(1);
  });

  it('should hide the delete action when there is no note', () => {
    renderEditor({ hasNote: false });

    expect(screen.queryByRole('button', { name: /excluir/ })).not.toBeInTheDocument();
  });

  it('should ask for confirmation before removing', () => {
    renderEditor({ hasNote: true });

    fireEvent.click(screen.getByRole('button', { name: /excluir/ }));

    expect(handlers.onAskRemove).toHaveBeenCalledTimes(1);
  });

  it('should show confirm and deny actions while confirming', () => {
    renderEditor({ hasNote: true, confirming: true });

    fireEvent.click(screen.getByRole('button', { name: 'confirmar exclusão' }));
    fireEvent.click(screen.getByRole('button', { name: 'não' }));

    expect(handlers.onRemove).toHaveBeenCalledTimes(1);
    expect(handlers.onCancelRemove).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('button', { name: /^excluir$/ })).not.toBeInTheDocument();
  });
});
