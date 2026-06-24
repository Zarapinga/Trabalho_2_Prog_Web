import { useCallback, useState } from 'react';
import type { AsyncState } from '../api/types';
import {
  createInitialAsyncState,
  createLoadingState,
  createSuccessState,
  createErrorState,
} from '../api/types';
import { getErrorMessage, getUserFriendlyMessage } from '../utils/errorHandler';

/**
 * Hook para gerenciar estado de uma operação assíncrona
 * @template T - Tipo dos dados
 * @param initialData - Dados iniciais (opcional)
 * @returns Estado da operação e função para executar
 */
export function useAsync<T>(initialData?: T) {
  const [state, setState] = useState<AsyncState<T>>(
    initialData
      ? { loading: false, data: initialData, error: null }
      : createInitialAsyncState<T>()
  );

  /**
   * Executa uma função assíncrona e atualiza o estado
   */
  const execute = useCallback(
    async (fn: () => Promise<T>) => {
      setState(createLoadingState(state.data));
      try {
        const result = await fn();
        setState(createSuccessState(result));
        return result;
      } catch (error) {
        const apiError = getErrorMessage(error);
        const friendlyMessage = getUserFriendlyMessage(apiError);
        setState(createErrorState(friendlyMessage, state.data));
        throw error;
      }
    },
    [state.data]
  );

  /**
   * Reseta o estado para o inicial
   */
  const reset = useCallback(() => {
    setState(initialData ? { loading: false, data: initialData, error: null } : createInitialAsyncState<T>());
  }, [initialData]);

  return { ...state, execute, reset };
}

/**
 * Hook para gerenciar estado de uma lista com carregamento
 * @template T - Tipo dos itens
 * @returns Estado da lista e funções de manipulação
 */
export function useAsyncList<T>() {
  const [state, setState] = useState<AsyncState<T[]>>(
    createInitialAsyncState<T[]>()
  );

  const load = useCallback(async (fn: () => Promise<T[]>) => {
    setState(createLoadingState(state.data));
    try {
      const result = await fn();
      setState(createSuccessState(result));
      return result;
    } catch (error) {
      const apiError = getErrorMessage(error);
      const friendlyMessage = getUserFriendlyMessage(apiError);
      setState(createErrorState(friendlyMessage, state.data));
      throw error;
    }
  }, [state.data]);

  const append = useCallback((items: T[]) => {
    setState(state => ({
      ...state,
      data: state.data ? [...state.data, ...items] : items,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(createInitialAsyncState<T[]>());
  }, []);

  return { ...state, load, append, reset };
}
