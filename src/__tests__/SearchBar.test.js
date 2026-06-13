import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar/SearchBar";

describe("SearchBar Component", () => {
  it("renders search input and sort dropdown correctly with defaults", () => {
    render(
      <SearchBar
        searchQuery=""
        onSearchChange={vi.fn()}
        sortBy="name"
        onSortChange={vi.fn()}
        onReset={vi.fn()}
      />
    );

    // Verify search input is present with correct placeholder
    const searchInput = screen.getByPlaceholderText("Search by ID or Name...");
    expect(searchInput).toBeDefined();
    expect(searchInput.value).toBe("");

    // Verify dropdown is present
    const sortDropdown = screen.getByLabelText("Sort rewards list");
    expect(sortDropdown).toBeDefined();
    expect(sortDropdown.value).toBe("name");
  });

  it("calls onSearchChange when user types in the search query input", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        searchQuery=""
        onSearchChange={handleSearchChange}
        sortBy="name"
        onSortChange={vi.fn()}
        onReset={vi.fn()}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search by ID or Name...");
    fireEvent.change(searchInput, { target: { value: "Alice" } });

    expect(handleSearchChange).toHaveBeenCalledWith("Alice");
  });

  it("calls onSortChange when user changes the selected sorting criteria", () => {
    const handleSortChange = vi.fn();
    render(
      <SearchBar
        searchQuery=""
        onSearchChange={vi.fn()}
        sortBy="name"
        onSortChange={handleSortChange}
        onReset={vi.fn()}
      />
    );

    const sortDropdown = screen.getByLabelText("Sort rewards list");
    fireEvent.change(sortDropdown, { target: { value: "rewards" } });

    expect(handleSortChange).toHaveBeenCalledWith("rewards");
  });

  it("renders and calls onReset when search query is active or sorting is changed", () => {
    const handleReset = vi.fn();
    
    // With non-empty search query
    const { rerender } = render(
      <SearchBar
        searchQuery="C1"
        onSearchChange={vi.fn()}
        sortBy="name"
        onSortChange={vi.fn()}
        onReset={handleReset}
      />
    );

    const resetBtn = screen.getByRole("button", { name: /Reset/i });
    expect(resetBtn).toBeDefined();

    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);

    // With non-default sortBy
    rerender(
      <SearchBar
        searchQuery=""
        onSearchChange={vi.fn()}
        sortBy="id"
        onSortChange={vi.fn()}
        onReset={handleReset}
      />
    );

    expect(screen.getByRole("button", { name: /Reset/i })).toBeDefined();
  });
});
