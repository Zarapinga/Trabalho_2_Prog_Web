import { describe, it, expect } from "vitest";
import {
  createInitialAsyncState,
  createLoadingState,
  createSuccessState,
  createErrorState,
} from "./types";

describe("AsyncState factories", () => {
  describe("createInitialAsyncState", () => {
    it("should create initial state", () => {
      const state = createInitialAsyncState<string>();

      expect(state.loading).toBe(false);
      expect(state.data).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe("createLoadingState", () => {
    it("should create loading state without current data", () => {
      const state = createLoadingState<string>();

      expect(state.loading).toBe(true);
      expect(state.data).toBeNull();
      expect(state.error).toBeNull();
    });

    it("should create loading state with current data", () => {
      const state = createLoadingState<string>("previous");

      expect(state.loading).toBe(true);
      expect(state.data).toBe("previous");
      expect(state.error).toBeNull();
    });
  });

  describe("createSuccessState", () => {
    it("should create success state with data", () => {
      const state = createSuccessState<string>("success");

      expect(state.loading).toBe(false);
      expect(state.data).toBe("success");
      expect(state.error).toBeNull();
    });
  });

  describe("createErrorState", () => {
    it("should create error state without current data", () => {
      const state = createErrorState<string>("Something went wrong");

      expect(state.loading).toBe(false);
      expect(state.data).toBeNull();
      expect(state.error).toBe("Something went wrong");
    });

    it("should create error state with current data", () => {
      const state = createErrorState<string>("Error", "previous");

      expect(state.loading).toBe(false);
      expect(state.data).toBe("previous");
      expect(state.error).toBe("Error");
    });
  });
});
