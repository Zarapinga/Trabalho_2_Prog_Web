import { describe, it, expect } from "vitest";
import {
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateMinWords,
  validateSelect,
  validateForm,
} from "./validators";

describe("validateRequired", () => {
  it("should return error for empty string", () => {
    expect(validateRequired("")).toBe("Campo obrigatório");
  });

  it("should return error for null", () => {
    expect(validateRequired(null)).toBe("Campo obrigatório");
  });

  it("should return error for undefined", () => {
    expect(validateRequired(undefined)).toBe("Campo obrigatório");
  });

  it("should return null for valid string", () => {
    expect(validateRequired("valid")).toBeNull();
  });

  it("should return null for valid number", () => {
    expect(validateRequired(42)).toBeNull();
  });
});

describe("validateMinLength", () => {
  it("should return error when text is too short", () => {
    expect(validateMinLength("hi", 3)).toBe("Mínimo 3 caracteres");
  });

  it("should return null when text meets minimum length", () => {
    expect(validateMinLength("hello", 3)).toBeNull();
  });

  it("should return null when text exceeds minimum length", () => {
    expect(validateMinLength("hello world", 3)).toBeNull();
  });
});

describe("validateMaxLength", () => {
  it("should return error when text is too long", () => {
    expect(validateMaxLength("hello world", 5)).toBe("Máximo 5 caracteres");
  });

  it("should return null when text meets maximum length", () => {
    expect(validateMaxLength("hello", 5)).toBeNull();
  });

  it("should return null when text is shorter than maximum", () => {
    expect(validateMaxLength("hi", 5)).toBeNull();
  });
});

describe("validateMinWords", () => {
  it("should return error when words are too few", () => {
    expect(validateMinWords("hello world", 3)).toBe("Mínimo 3 palavras");
  });

  it("should return null when words meet minimum", () => {
    expect(validateMinWords("hello world test", 3)).toBeNull();
  });

  it("should return null when words exceed minimum", () => {
    expect(validateMinWords("hello world test string", 3)).toBeNull();
  });

  it("should handle whitespace correctly", () => {
    expect(validateMinWords("  hello   world   test  ", 3)).toBeNull();
  });
});

describe("validateSelect", () => {
  it("should return error for empty string", () => {
    expect(validateSelect("")).toBe("Selecione uma opção");
  });

  it("should return error for zero", () => {
    expect(validateSelect(0)).toBe("Selecione uma opção");
  });

  it("should return null for non-empty string", () => {
    expect(validateSelect("option1")).toBeNull();
  });

  it("should return null for positive number", () => {
    expect(validateSelect(1)).toBeNull();
  });
});

describe("validateForm", () => {
  it("should validate multiple fields", () => {
    const form = { name: "", email: "test@example.com" };
    const rules = {
      name: (v: unknown) => validateRequired(v as string),
      email: (v: unknown) => validateRequired(v as string),
    };

    const errors = validateForm(form, rules);

    expect(errors.name).toBe("Campo obrigatório");
    expect(errors.email).toBeUndefined();
  });

  it("should return empty object when all validations pass", () => {
    const form = { name: "John", age: 30 };
    const rules = {
      name: (v: unknown) => validateRequired(v as string),
      age: (v: unknown) => validateRequired(v as number),
    };

    const errors = validateForm(form, rules);

    expect(Object.keys(errors)).toHaveLength(0);
  });
});
