/**
 * Constantes compartilhadas da aplicação
 */

/**
 * Limites de caracteres para campos
 */
export const CHAR_LIMITS = {
  NOME_MIN: 3,
  NOME_MAX: 255,
  MATRICULA_MIN: 4,
  MATRICULA_MAX: 50,
  TITULO_MIN: 5,
  TITULO_MAX: 255,
  RESUMO_MIN: 20,
  RESUMO_MAX: 5000,
  PALAVRAS_CHAVE_MIN: 5,
  PALAVRAS_CHAVE_MAX: 255,
  CODIGO_MIN: 3,
  CODIGO_MAX: 50,
  SIGLA_MAX: 10,
};

/**
 * Limites de palavras para campos
 */
export const WORD_LIMITS = {
  RESUMO_MIN: 20,
};

/**
 * Timeouts para requisições
 */
export const API_TIMEOUTS = {
  DEFAULT: 30000,
  UPLOAD: 60000,
};

/**
 * Mensagens de validação
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: "Campo obrigatório",
  MIN_LENGTH: (min: number) => `Mínimo ${min} caracteres`,
  MAX_LENGTH: (max: number) => `Máximo ${max} caracteres`,
  MIN_WORDS: (min: number) => `Mínimo ${min} palavras`,
  INVALID_FORMAT: "Formato inválido",
  LOAD_ERROR: "Erro ao carregar dados",
  SAVE_ERROR: "Erro ao salvar dados",
  DELETE_ERROR: "Erro ao deletar item",
};

/**
 * Status HTTP esperados
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
