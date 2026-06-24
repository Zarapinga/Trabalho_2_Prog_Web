/**
 * Validadores para formulários
 */

/**
 * Valida se um campo obrigatório está preenchido
 * @param value - Valor do campo
 * @returns Mensagem de erro ou null se válido
 */
export function validateRequired(
  value: string | number | null | undefined,
): string | null {
  if (value === "" || value === null || value === undefined) {
    return "Campo obrigatório";
  }
  return null;
}

/**
 * Valida o comprimento mínimo de um texto
 * @param value - Valor do campo
 * @param minLength - Comprimento mínimo
 * @returns Mensagem de erro ou null se válido
 */
export function validateMinLength(
  value: string,
  minLength: number,
): string | null {
  if (value.trim().length < minLength) {
    return `Mínimo ${minLength} caracteres`;
  }
  return null;
}

/**
 * Valida o comprimento máximo de um texto
 * @param value - Valor do campo
 * @param maxLength - Comprimento máximo
 * @returns Mensagem de erro ou null se válido
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
): string | null {
  if (value.length > maxLength) {
    return `Máximo ${maxLength} caracteres`;
  }
  return null;
}

/**
 * Valida um resumo (mínimo de palavras)
 * @param value - Valor do campo
 * @param minWords - Mínimo de palavras
 * @returns Mensagem de erro ou null se válido
 */
export function validateMinWords(
  value: string,
  minWords: number,
): string | null {
  const words = value
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  if (words.length < minWords) {
    return `Mínimo ${minWords} palavras`;
  }
  return null;
}

/**
 * Valida se um valor foi selecionado em um select
 * @param value - Valor do campo
 * @returns Mensagem de erro ou null se válido
 */
export function validateSelect(value: string | number): string | null {
  if (value === "" || value === 0) {
    return "Selecione uma opção";
  }
  return null;
}

/**
 * Valida um formulário completo
 * @param form - Objeto com dados do formulário
 * @param rules - Regras de validação
 * @returns Objeto com erros encontrados
 */
export function validateForm<T extends Record<string, unknown>>(
  form: T,
  rules: Partial<Record<keyof T, (value: unknown) => string | null>>,
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  Object.entries(rules).forEach(([key, rule]) => {
    if (rule) {
      const error = rule(form[key as keyof T]);
      if (error) {
        errors[key as keyof T] = error;
      }
    }
  });

  return errors;
}
