// Interfaces espelhando os serializers do backend Django REST Framework.
// IMPORTANTE: as chaves estrangeiras (FK) são serializadas como ID numérico,
// não como objetos aninhados.

export interface UnidadeAcademica {
  id: number;
  nome: string;
  sigla: string;
}

export interface Departamento {
  id: number;
  nome: string;
  sigla: string;
  unidade_academica: number; // FK -> UnidadeAcademica
}

export interface Curso {
  id: number;
  nome: string;
  sigla: string;
  codigo: string;
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  curso: number; // FK -> Curso
}

export interface Professor {
  id: number;
  nome: string;
  departamento: number; // FK -> Departamento
}

export type TccStatus = '0' | '1' | '2' | '3';
export type TccTipo =
  | 'MONOGRAFIA'
  | 'RELATORIO_ESTAGIO'
  | 'RELATORIO_TECNICO'
  | 'ARTIGO';
export type TccIdioma = 'PT' | 'EN';

export interface TCC {
  id: number;
  titulo: string;
  resumo: string;
  palavras_chave: string;
  tipo: TccTipo;
  idioma: TccIdioma;

  aluno: number; // FK -> Aluno
  orientador: number; // FK -> Professor
  coorientador: number | null; // FK opcional -> Professor

  presidente: number; // FK -> Professor
  primeiro_membro: number; // FK -> Professor
  segundo_membro: number; // FK -> Professor

  semestre_letivo_defesa: string | null;
  status: TccStatus;
  arquivo: string | null; // caminho relativo do arquivo (ex.: /media/tccs/x.pdf)

  // Campos read-only fornecidos pelo serializer
  status_display: string;
  tipo_display: string;
  idioma_display: string;
}

// Payload para criar/editar TCC (sem campos read-only/id)
export interface TccPayload {
  titulo: string;
  resumo: string;
  palavras_chave: string;
  tipo: TccTipo | '';
  idioma: TccIdioma | '';
  aluno: number | '';
  orientador: number | '';
  coorientador: number | '';
  presidente: number | '';
  primeiro_membro: number | '';
  segundo_membro: number | '';
  semestre_letivo_defesa: string;
  status: TccStatus;
  arquivo?: File | null;
}

export interface Estatisticas {
  total_geral: number;
  por_status: Record<string, number>;
  por_tipo: Record<string, number>;
  por_idioma: Record<string, number>;
  por_semestre: Record<string, number>;
  por_orientador: Record<string, number>;
  por_coorientador: Record<string, number>;
  por_curso: Record<string, number>;
  por_departamento: Record<string, number>;
  por_unidade_academica: Record<string, number>;
}

// Opções de choices espelhando o models.py do backend
export const TIPO_OPTIONS: { value: TccTipo; label: string }[] = [
  { value: 'MONOGRAFIA', label: 'Monografia' },
  { value: 'RELATORIO_ESTAGIO', label: 'Relatório de Estágio' },
  { value: 'RELATORIO_TECNICO', label: 'Relatório Técnico' },
  { value: 'ARTIGO', label: 'Artigo' },
];

export const IDIOMA_OPTIONS: { value: TccIdioma; label: string }[] = [
  { value: 'PT', label: 'Português' },
  { value: 'EN', label: 'Inglês' },
];

export const STATUS_OPTIONS: { value: TccStatus; label: string }[] = [
  { value: '0', label: 'Em Elaboração' },
  { value: '1', label: 'Enviado' },
  { value: '2', label: 'Aprovado' },
  { value: '3', label: 'Reprovado' },
];

export const SEMESTRE_OPTIONS: string[] = [
  '2020/1', '2020/2',
  '2021/1', '2021/2',
  '2022/1', '2022/2',
  '2023/1', '2023/2',
  '2024/1', '2024/2',
  '2025/1', '2025/2',
  '2026/1',
];
