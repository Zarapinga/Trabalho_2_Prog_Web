/**
 * Tipos genéricos para respostas de API e paginação
 */

/**
 * Resposta paginada da API
 * @template T - Tipo dos itens na lista
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Resposta genérica de sucesso
 * @template T - Tipo dos dados
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

/**
 * Resposta genérica de erro
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: Record<string, unknown>;
}

/**
 * Resultado que pode ser sucesso ou erro
 * @template T - Tipo dos dados de sucesso
 */
export type ApiResult<T> = ApiSuccess<T> | ApiErrorResponse;

/**
 * Estado de uma operação assíncrona
 * @template T - Tipo dos dados
 */
export interface AsyncState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}

/**
 * Factory para criar estado inicial async
 */
export function createInitialAsyncState<T>(): AsyncState<T> {
  return {
    loading: false,
    data: null,
    error: null,
  };
}

/**
 * Factory para criar estado de carregamento
 */
export function createLoadingState<T>(current?: T | null): AsyncState<T> {
  return {
    loading: true,
    data: current ?? null,
    error: null,
  };
}

/**
 * Factory para criar estado de sucesso
 */
export function createSuccessState<T>(data: T): AsyncState<T> {
  return {
    loading: false,
    data,
    error: null,
  };
}

/**
 * Factory para criar estado de erro
 */
export function createErrorState<T>(
  error: string,
  current?: T | null,
): AsyncState<T> {
  return {
    loading: false,
    data: current ?? null,
    error,
  };
}
