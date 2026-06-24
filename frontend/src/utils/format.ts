/**
 * Utilitários de formatação e transformação de dados
 */

/**
 * Converte um objeto { label: contagem } (formato do endpoint de estatísticas)
 * para o array que o Recharts espera: [{ name, value }].
 * @param obj - Objeto com labels e valores
 * @returns Array formatado para gráficos
 */
export function toChartData(
  obj: Record<string, number> | undefined,
): { name: string; value: number }[] {
  if (!obj) return [];
  return Object.entries(obj).map(([name, value]) => ({ name, value }));
}

/**
 * Cria um mapa id -> objeto a partir de uma lista, para resolver FKs por id.
 * Útil para cache de lookup rápido
 * @param items - Array de itens com id
 * @returns Map indexado por id
 */
export function indexById<T extends { id: number }>(
  items: T[],
): Map<number, T> {
  return new Map(items.map((item) => [item.id, item]));
}

/**
 * Filtra uma lista por um termo em campos textuais (busca client-side).
 * A busca é case-insensitive e ignora espaços em branco extras
 * @param items - Array de itens
 * @param term - Termo de busca
 * @param fields - Campos a buscar
 * @returns Array filtrado
 */
export function filterByText<T>(
  items: T[],
  term: string,
  fields: (keyof T)[],
): T[] {
  const q = term.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) =>
    fields.some((f) =>
      String(item[f] ?? "")
        .toLowerCase()
        .includes(q),
    ),
  );
}
