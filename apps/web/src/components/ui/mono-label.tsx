import type { ReactNode } from 'react';
import styles from './mono-label.module.css';

interface MonoLabelProps {
  children: ReactNode;
  className?: string;
}

/** Small monospace label wrapped in braces: `{ palestras }`. */
export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span className={[styles.label, className].filter(Boolean).join(' ')}>
      <span className={styles.brace}>{'{ '}</span>
      {children}
      <span className={styles.brace}>{' }'}</span>
    </span>
  );
}
