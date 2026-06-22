// Converte um objeto { label: contagem } (formato do endpoint de estatísticas)
// para o array que o Recharts espera: [{ name, value }].
export function toChartData(
  obj: Record<string, number> | undefined,
): { name: string; value: number }[] {
  if (!obj) return [];
  return Object.entries(obj).map(([name, value]) => ({ name, value }));
}

// Cria um mapa id -> objeto a partir de uma lista, para resolver FKs por id.
export function indexById<T extends { id: number }>(items: T[]): Map<number, T> {
  return new Map(items.map((item) => [item.id, item]));
}

// Filtra uma lista por um termo em campos textuais (busca client-side).
export function filterByText<T>(
  items: T[],
  term: string,
  fields: (keyof T)[],
): T[] {
  const q = term.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) =>
    fields.some((f) => String(item[f] ?? '').toLowerCase().includes(q)),
  );
}
