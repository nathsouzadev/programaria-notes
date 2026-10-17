import { fireEvent, render, screen } from '@testing-library/react';
import { NotesWorkspace } from '@/components/notes/notes-workspace';
import type { UseNotesResult } from '@/hooks/use-notes';

const mockUseNotes = jest.fn();
const mockUseNarrow = jest.fn();
jest.mock('@/hooks/use-notes', () => ({ useNotes: () => mockUseNotes() }));
jest.mock('@/hooks/use-narrow', () => ({ useNarrow: () => mockUseNarrow() }));

function makeNotesResult(overrides: Partial<UseNotesResult> = {}): UseNotesResult {
  return {
    talks: [{ id: 0, number: '01', title: 'Primeira palestra', status: 'sem anotação', active: false }],
    totalLabel: '',
    selected: null,
    selectedNumber: '',
    note: null,
    updatedLabel: '',
    editing: false,
    draft: '',
    confirming: false,
    select: jest.fn(),
    back: jest.fn(),
    unlock: jest.fn(),
    changeDraft: jest.fn(),
    save: jest.fn(),
    cancel: jest.fn(),
    askRemove: jest.fn(),
    cancelRemove: jest.fn(),
    remove: jest.fn(),
    ...overrides,
  };
}

const selectedTalk = { id: 0, title: 'Primeira palestra' };

describe('NotesWorkspace', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNarrow.mockReturnValue(false);
  });

  it('should render the header and the empty selection state', () => {
    mockUseNotes.mockReturnValue(makeNotesResult({ totalLabel: '1 de 8 palestras anotadas' }));

    render(<NotesWorkspace />);

    expect(screen.getByText('1 de 8 palestras anotadas')).toBeInTheDocument();
    expect(screen.getByText('selecione uma palestra')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Lista de palestras' })).toBeInTheDocument();
  });

  it('should render the selected talk with the locked note', () => {
    mockUseNotes.mockReturnValue(makeNotesResult({ selected: selectedTalk, selectedNumber: '01' }));

    render(<NotesWorkspace />);

    expect(screen.getByRole('heading', { level: 1, name: 'Primeira palestra' })).toBeInTheDocument();
    expect(screen.getByText(/palestra 01/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Editar anotação' })).toBeInTheDocument();
  });

  it('should render the editor when editing', () => {
    mockUseNotes.mockReturnValue(makeNotesResult({ selected: selectedTalk, selectedNumber: '01', editing: true }));

    render(<NotesWorkspace />);

    expect(screen.getByRole('textbox', { name: 'Anotação' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Editar anotação' })).not.toBeInTheDocument();
  });

  it('should hide the list and show the back button on narrow screens with a selection', () => {
    mockUseNarrow.mockReturnValue(true);
    const notes = makeNotesResult({ selected: selectedTalk, selectedNumber: '01' });
    mockUseNotes.mockReturnValue(notes);

    render(<NotesWorkspace />);

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /palestras/ }));
    expect(notes.back).toHaveBeenCalledTimes(1);
  });

  it('should keep the list visible on narrow screens without a selection', () => {
    mockUseNarrow.mockReturnValue(true);
    mockUseNotes.mockReturnValue(makeNotesResult());

    render(<NotesWorkspace />);

    expect(screen.getByRole('complementary', { name: 'Lista de palestras' })).toBeInTheDocument();
  });
});
