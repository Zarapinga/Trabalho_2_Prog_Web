/**
 * Funções utilitárias para tratamento de erros na API
 */

/**
 * Tipos de erro da API
 */
export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Extrai mensagem de erro de uma resposta axios
 * @param error - Erro da requisição
 * @returns Objeto com status e mensagem
 */
export function getErrorMessage(error: unknown): ApiError {
  // Axios error with response
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object"
  ) {
    const response = error.response as Record<string, unknown>;
    const status = response.status as number;
    const data = response.data as Record<string, unknown>;

    // Tenta extrair mensagem de diferentes formatos
    const message =
      (typeof data?.message === "string" && data.message) ||
      (typeof data?.error === "string" && data.error) ||
      (Array.isArray(data?.errors) &&
        typeof data.errors[0] === "string" &&
        data.errors[0]) ||
      "Erro na requisição";

    return {
      status,
      message,
      details: data,
    };
  }

  // Axios error without response
  if (error && typeof error === "object" && "message" in error) {
    const err = error as { message: string };
    return {
      status: 0,
      message: err.message || "Erro desconhecido",
    };
  }

  // Generic error
  return {
    status: 0,
    message: "Erro desconhecido",
  };
}

/**
 * Mensagens amigáveis para erros comuns
 */
export function getUserFriendlyMessage(error: ApiError): string {
  switch (error.status) {
    case 400:
      return "Dados inválidos. Verifique os campos e tente novamente.";
    case 401:
      return "Você não está autenticado. Faça login novamente.";
    case 403:
      return "Você não tem permissão para realizar esta ação.";
    case 404:
      return "O recurso solicitado não foi encontrado.";
    case 409:
      return "Há um conflito com os dados existentes. Verifique e tente novamente.";
    case 500:
      return "Erro no servidor. Tente novamente mais tarde.";
    case 503:
      return "Serviço indisponível. Tente novamente mais tarde.";
    default:
      return error.message || "Ocorreu um erro. Tente novamente.";
  }
}
