import { describe, it, expect } from "vitest";
import { toChartData, indexById, filterByText } from "./format";

describe("toChartData", () => {
  it("should convert an object to chart data format", () => {
    const input = { Aprovado: 5, Reprovado: 3, "Em Elaboração": 2 };
    const result = toChartData(input);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ name: "Aprovado", value: 5 });
    expect(result).toContainEqual({ name: "Reprovado", value: 3 });
    expect(result).toContainEqual({ name: "Em Elaboração", value: 2 });
  });

  it("should return empty array for undefined input", () => {
    const result = toChartData(undefined);
    expect(result).toEqual([]);
  });

  it("should return empty array for empty object", () => {
    const result = toChartData({});
    expect(result).toEqual([]);
  });
});

describe("indexById", () => {
  it("should create a map indexed by id", () => {
    const items = [
      { id: 1, nome: "Alice" },
      { id: 2, nome: "Bob" },
      { id: 3, nome: "Charlie" },
    ];

    const result = indexById(items);

    expect(result.get(1)).toEqual({ id: 1, nome: "Alice" });
    expect(result.get(2)).toEqual({ id: 2, nome: "Bob" });
    expect(result.get(3)).toEqual({ id: 3, nome: "Charlie" });
  });

  it("should return an empty map for empty array", () => {
    const result = indexById([]);
    expect(result.size).toBe(0);
  });
});

describe("filterByText", () => {
  it("should filter items by text in specified fields", () => {
    const items = [
      { id: 1, nome: "Alice Silva" },
      { id: 2, nome: "Bob Santos" },
      { id: 3, nome: "Charlie Silva" },
    ];

    const result = filterByText(items, "silva", ["nome"]);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ id: 1, nome: "Alice Silva" });
    expect(result).toContainEqual({ id: 3, nome: "Charlie Silva" });
  });

  it("should be case-insensitive", () => {
    const items = [
      { id: 1, nome: "Alice Silva" },
      { id: 2, nome: "Bob Santos" },
    ];

    const result = filterByText(items, "ALICE", ["nome"]);

    expect(result).toHaveLength(1);
    expect(result[0].nome).toBe("Alice Silva");
  });

  it("should ignore empty search terms", () => {
    const items = [
      { id: 1, nome: "Alice" },
      { id: 2, nome: "Bob" },
    ];

    const result = filterByText(items, "   ", ["nome"]);

    expect(result).toHaveLength(2);
  });

  it("should search multiple fields", () => {
    const items = [
      { id: 1, nome: "Alice", email: "alice@example.com" },
      { id: 2, nome: "Bob", email: "bob@example.com" },
    ];

    const result = filterByText(items, "alice", ["nome", "email"]);

    expect(result).toHaveLength(1);
    expect(result[0].nome).toBe("Alice");
  });
});
