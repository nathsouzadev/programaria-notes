import type { Talk } from '@/models/talk';

const TITLES = [
  'Além do Prompt: o que aprendemos testando Spec-Driven Development no Grupo Boticário',
  'Painel Soberania Digital: impactos sociais e ambientais do avanço da IA',
  'A Era dos Agentes: como humanos, liderança e Inteligência Artificial estão redesenhando o futuro do trabalho',
  'Do feed ao Chatbot: como proteger nossa saúde mental e social das arquiteturas de vício',
  'Decifrando entrevistas técnicas',
  'Da ideia ao produto: usando IA para construir aplicações escaláveis com senso crítico',
  'IA para impulsionar os processos seletivos',
  'Tecnologias para o Bem Comum: o que existe além das Big Techs',
];

export const TALKS: Talk[] = TITLES.map((title, id) => ({ id, title }));

export function findTalk(id: number): Talk | null {
  return TALKS.find((talk) => talk.id === id) ?? null;
}
