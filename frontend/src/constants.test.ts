import { describe, it, expect } from "vitest";
import {
  CHAR_LIMITS,
  WORD_LIMITS,
  API_TIMEOUTS,
  HTTP_STATUS,
} from "./constants";

describe("Constants", () => {
  describe("CHAR_LIMITS", () => {
    it("should define min and max character limits", () => {
      expect(CHAR_LIMITS.NOME_MIN).toBe(3);
      expect(CHAR_LIMITS.NOME_MAX).toBe(255);
    });

    it("should have symmetric limits for common fields", () => {
      expect(CHAR_LIMITS.TITULO_MAX).toBeGreaterThan(CHAR_LIMITS.TITULO_MIN);
      expect(CHAR_LIMITS.RESUMO_MAX).toBeGreaterThan(CHAR_LIMITS.RESUMO_MIN);
    });
  });

  describe("WORD_LIMITS", () => {
    it("should define word limits", () => {
      expect(WORD_LIMITS.RESUMO_MIN).toBe(20);
    });
  });

  describe("API_TIMEOUTS", () => {
    it("should define reasonable timeout values", () => {
      expect(API_TIMEOUTS.DEFAULT).toBeLessThan(API_TIMEOUTS.UPLOAD);
      expect(API_TIMEOUTS.DEFAULT).toBe(30000);
    });
  });

  describe("HTTP_STATUS", () => {
    it("should define standard HTTP status codes", () => {
      expect(HTTP_STATUS.OK).toBe(200);
      expect(HTTP_STATUS.CREATED).toBe(201);
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400);
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
      expect(HTTP_STATUS.SERVER_ERROR).toBe(500);
    });
  });
});
