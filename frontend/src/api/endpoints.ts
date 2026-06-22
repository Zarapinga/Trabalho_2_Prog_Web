import { apiClient } from './client';
import type {
  Aluno,
  Curso,
  Departamento,
  Estatisticas,
  Professor,
  TCC,
  TccPayload,
  UnidadeAcademica,
} from '../types/models';

// Fábrica genérica de CRUD para um recurso REST do DRF.
function createResource<T>(path: string) {
  return {
    list: async (search?: string): Promise<T[]> => {
      const { data } = await apiClient.get<T[]>(`/${path}/`, {
        params: search ? { search } : undefined,
      });
      return data;
    },
    get: async (id: number): Promise<T> => {
      const { data } = await apiClient.get<T>(`/${path}/${id}/`);
      return data;
    },
    create: async (payload: Partial<T>): Promise<T> => {
      const { data } = await apiClient.post<T>(`/${path}/`, payload);
      return data;
    },
    update: async (id: number, payload: Partial<T>): Promise<T> => {
      const { data } = await apiClient.put<T>(`/${path}/${id}/`, payload);
      return data;
    },
    remove: async (id: number): Promise<void> => {
      await apiClient.delete(`/${path}/${id}/`);
    },
  };
}

export const unidadesApi = createResource<UnidadeAcademica>('unidades-academicas');
export const departamentosApi = createResource<Departamento>('departamentos');
export const cursosApi = createResource<Curso>('cursos');
export const alunosApi = createResource<Aluno>('alunos');
export const professoresApi = createResource<Professor>('professores');

// Monta um FormData a partir do payload do TCC. Necessário para upload de arquivo
// (multipart/form-data). O campo arquivo só é anexado se for um File novo.
function buildTccFormData(payload: TccPayload): FormData {
  const fd = new FormData();
  const entries: [string, unknown][] = [
    ['titulo', payload.titulo],
    ['resumo', payload.resumo],
    ['palavras_chave', payload.palavras_chave],
    ['tipo', payload.tipo],
    ['idioma', payload.idioma],
    ['aluno', payload.aluno],
    ['orientador', payload.orientador],
    ['coorientador', payload.coorientador],
    ['presidente', payload.presidente],
    ['primeiro_membro', payload.primeiro_membro],
    ['segundo_membro', payload.segundo_membro],
    ['semestre_letivo_defesa', payload.semestre_letivo_defesa],
    ['status', payload.status],
  ];

  for (const [key, value] of entries) {
    // Campos opcionais vazios não são enviados (evita erro de validação de FK).
    if (value === '' || value === null || value === undefined) continue;
    fd.append(key, String(value));
  }

  if (payload.arquivo instanceof File) {
    fd.append('arquivo', payload.arquivo);
  }

  return fd;
}

export const tccsApi = {
  list: async (search?: string): Promise<TCC[]> => {
    const { data } = await apiClient.get<TCC[]>('/tccs/', {
      params: search ? { search } : undefined,
    });
    return data;
  },
  get: async (id: number): Promise<TCC> => {
    const { data } = await apiClient.get<TCC>(`/tccs/${id}/`);
    return data;
  },
  create: async (payload: TccPayload): Promise<TCC> => {
    const { data } = await apiClient.post<TCC>('/tccs/', buildTccFormData(payload));
    return data;
  },
  update: async (id: number, payload: TccPayload): Promise<TCC> => {
    const { data } = await apiClient.put<TCC>(`/tccs/${id}/`, buildTccFormData(payload));
    return data;
  },
  // Atualização parcial — usada para alterar só o status pela listagem.
  patchStatus: async (id: number, status: string): Promise<TCC> => {
    const { data } = await apiClient.patch<TCC>(`/tccs/${id}/`, { status });
    return data;
  },
  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`/tccs/${id}/`);
  },
  estatisticas: async (): Promise<Estatisticas> => {
    const { data } = await apiClient.get<Estatisticas>('/tccs/estatisticas/');
    return data;
  },
};
