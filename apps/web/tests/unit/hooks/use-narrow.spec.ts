import { act, renderHook } from '@testing-library/react';
import { NARROW_QUERY, useNarrow } from '@/hooks/use-narrow';

type Listener = (event: { matches: boolean }) => void;

describe('useNarrow', () => {
  let listeners: Listener[];
  let matches: boolean;

  beforeEach(() => {
    jest.clearAllMocks();
    listeners = [];
    matches = false;
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: jest.fn((_: string, listener: Listener) => void listeners.push(listener)),
      removeEventListener: jest.fn(),
    }));
  });

  it('should query the narrow breakpoint', () => {
    renderHook(() => useNarrow());

    expect(window.matchMedia).toHaveBeenCalledWith(NARROW_QUERY);
  });

  it('should start with the current media match', () => {
    matches = true;

    const { result } = renderHook(() => useNarrow());

    expect(result.current).toBe(true);
  });

  it('should update when the media query changes', () => {
    const { result } = renderHook(() => useNarrow());

    matches = true;
    act(() => listeners.forEach((listener) => listener({ matches: true })));

    expect(result.current).toBe(true);
  });
});
