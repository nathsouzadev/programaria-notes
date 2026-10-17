import { MonoLabel } from '@/components/ui/mono-label';
import styles from './app-header.module.css';

interface AppHeaderProps {
  totalLabel: string;
}

export function AppHeader({ totalLabel }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>
          progra<span className={styles.logoBraces}>{'{m}'}</span>aria
        </span>
        <MonoLabel>anotações</MonoLabel>
      </div>
      <span className={styles.total}>{totalLabel}</span>
    </header>
  );
}
