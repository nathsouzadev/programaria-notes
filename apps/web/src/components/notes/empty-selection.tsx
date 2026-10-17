import styles from './empty-selection.module.css';

export function EmptySelection() {
  return (
    <div className={styles.empty}>
      <span className={styles.braces}>{'{ }'}</span>
      <span className={styles.title}>selecione uma palestra</span>
      <span className={styles.description}>
        Cada palestra tem um bloco de anotações, salvo neste navegador.
      </span>
    </div>
  );
}
