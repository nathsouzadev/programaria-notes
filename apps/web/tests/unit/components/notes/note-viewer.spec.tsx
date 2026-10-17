import { fireEvent, render, screen } from '@testing-library/react';
import { NoteViewer } from '@/components/notes/note-viewer';

describe('NoteViewer', () => {
  const onUnlock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show the empty hint when there is no note', () => {
    render(<NoteViewer note={null} updatedLabel="" onUnlock={onUnlock} />);

    expect(screen.getByText('Clique aqui para começar a anotar')).toBeInTheDocument();
    expect(screen.getByText(/bloqueado · clique para editar/)).toBeInTheDocument();
  });

  it('should show the note text and updated label', () => {
    render(
      <NoteViewer note={{ text: 'minha nota', updatedAt: 1 }} updatedLabel="atualizada hoje" onUnlock={onUnlock} />,
    );

    expect(screen.getByText('minha nota')).toBeInTheDocument();
    expect(screen.getByText('atualizada hoje')).toBeInTheDocument();
  });

  it('should unlock on click', () => {
    render(<NoteViewer note={null} updatedLabel="" onUnlock={onUnlock} />);

    fireEvent.click(screen.getByRole('button', { name: 'Editar anotação' }));

    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('should unlock on Enter and Space', () => {
    render(<NoteViewer note={null} updatedLabel="" onUnlock={onUnlock} />);
    const block = screen.getByRole('button', { name: 'Editar anotação' });

    fireEvent.keyDown(block, { key: 'Enter' });
    fireEvent.keyDown(block, { key: ' ' });

    expect(onUnlock).toHaveBeenCalledTimes(2);
  });

  it('should be focusable', () => {
    render(<NoteViewer note={null} updatedLabel="" onUnlock={onUnlock} />);

    expect(screen.getByRole('button', { name: 'Editar anotação' })).toHaveAttribute('tabindex', '0');
  });
});
