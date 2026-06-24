import { describe, it, expect, vi } from "vitest";
import { getErrorMessage, getUserFriendlyMessage } from "./errorHandler";

describe("getErrorMessage", () => {
  it("should extract message from axios error response", () => {
    const error = {
      response: {
        status: 400,
        data: { message: "Invalid data" },
      },
    };

    const result = getErrorMessage(error);

    expect(result.status).toBe(400);
    expect(result.message).toBe("Invalid data");
  });

  it("should handle error field", () => {
    const error = {
      response: {
        status: 404,
        data: { error: "Not found" },
      },
    };

    const result = getErrorMessage(error);

    expect(result.message).toBe("Not found");
  });

  it("should handle errors array", () => {
    const error = {
      response: {
        status: 422,
        data: { errors: ["Field is required"] },
      },
    };

    const result = getErrorMessage(error);

    expect(result.message).toBe("Field is required");
  });

  it("should handle generic error message", () => {
    const error = new Error("Network error");
    const result = getErrorMessage(error);

    expect(result.message).toBe("Network error");
  });

  it("should return default message for unknown error", () => {
    const result = getErrorMessage(null);

    expect(result.message).toBe("Erro desconhecido");
  });
});

describe("getUserFriendlyMessage", () => {
  it("should return friendly message for 400 status", () => {
    const error = { status: 400, message: "Bad request" };
    const message = getUserFriendlyMessage(error);

    expect(message).toBe(
      "Dados inválidos. Verifique os campos e tente novamente.",
    );
  });

  it("should return friendly message for 401 status", () => {
    const error = { status: 401, message: "Unauthorized" };
    const message = getUserFriendlyMessage(error);

    expect(message).toBe("Você não está autenticado. Faça login novamente.");
  });

  it("should return friendly message for 403 status", () => {
    const error = { status: 403, message: "Forbidden" };
    const message = getUserFriendlyMessage(error);

    expect(message).toBe("Você não tem permissão para realizar esta ação.");
  });

  it("should return friendly message for 404 status", () => {
    const error = { status: 404, message: "Not found" };
    const message = getUserFriendlyMessage(error);

    expect(message).toBe("O recurso solicitado não foi encontrado.");
  });

  it("should return friendly message for 500 status", () => {
    const error = { status: 500, message: "Server error" };
    const message = getUserFriendlyMessage(error);

    expect(message).toBe("Erro no servidor. Tente novamente mais tarde.");
  });

  it("should return original message for unknown status", () => {
    const error = { status: 418, message: "Teapot" };
    const message = getUserFriendlyMessage(error);

    expect(message).toBe("Teapot");
  });
});
