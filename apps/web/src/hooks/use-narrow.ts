import { useEffect, useState } from 'react';

export const NARROW_QUERY = '(max-width: 759px)';

export function useNarrow(): boolean {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(NARROW_QUERY);
    const update = () => setNarrow(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return narrow;
}
