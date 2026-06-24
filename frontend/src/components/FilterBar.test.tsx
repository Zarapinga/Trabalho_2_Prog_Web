import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar from "./FilterBar";

describe("FilterBar Component", () => {
  it("should render children correctly", () => {
    render(
      <FilterBar>
        <div>Test Child</div>
      </FilterBar>,
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should render clear button when onClear is provided and showClear is true", () => {
    const handleClear = vi.fn();

    render(
      <FilterBar onClear={handleClear} showClear={true}>
        <div>Filters</div>
      </FilterBar>,
    );

    expect(
      screen.getByRole("button", { name: /limpar filtros/i }),
    ).toBeInTheDocument();
  });

  it("should disable clear button when showClear is false", () => {
    const handleClear = vi.fn();

    render(
      <FilterBar onClear={handleClear} showClear={false}>
        <div>Filters</div>
      </FilterBar>,
    );

    const button = screen.getByRole("button", { name: /limpar filtros/i });
    expect(button).toBeDisabled();
  });

  it("should call onClear when button is clicked", async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(
      <FilterBar onClear={handleClear} showClear={true}>
        <div>Filters</div>
      </FilterBar>,
    );

    const button = screen.getByRole("button", { name: /limpar filtros/i });
    await user.click(button);

    expect(handleClear).toHaveBeenCalledOnce();
  });

  it("should not render clear button when onClear is not provided", () => {
    render(
      <FilterBar>
        <div>Filters</div>
      </FilterBar>,
    );

    expect(
      screen.queryByRole("button", { name: /limpar filtros/i }),
    ).not.toBeInTheDocument();
  });
});
