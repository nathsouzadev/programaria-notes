import { fireEvent, render, screen } from '@testing-library/react';
import { TalkList } from '@/components/notes/talk-list';

const talks = [
  { id: 0, number: '01', title: 'Primeira palestra', status: 'sem anotação', active: false },
  { id: 1, number: '02', title: 'Segunda palestra', status: 'com anotação', active: true },
];

describe('TalkList', () => {
  const onSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render one button per talk with number, title and status', () => {
    render(<TalkList talks={talks} onSelect={onSelect} />);

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /01 Primeira palestra sem anotação/ })).toBeInTheDocument();
  });

  it('should mark the active talk with aria-current', () => {
    render(<TalkList talks={talks} onSelect={onSelect} />);

    expect(screen.getByRole('button', { name: /Segunda palestra/ })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: /Primeira palestra/ })).not.toHaveAttribute('aria-current');
  });

  it('should call onSelect with the talk id on click', () => {
    render(<TalkList talks={talks} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: /Segunda palestra/ }));

    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
