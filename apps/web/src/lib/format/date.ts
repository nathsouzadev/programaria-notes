export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${day} · ${time}`;
}

export function formatUpdatedAt(timestamp: number): string {
  return `atualizada ${formatDateTime(timestamp)}`;
}
