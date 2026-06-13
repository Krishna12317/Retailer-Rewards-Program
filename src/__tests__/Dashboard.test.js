import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard/Dashboard";

describe("Dashboard Component", () => {
  it("renders correctly with provided stats", () => {
    const mockStats = {
      totalCustomers: 15,
      totalTransactions: 42,
      totalRewardPoints: 12500,
    };

    render(<Dashboard stats={mockStats} />);

    // Check headings/labels are rendered
    expect(screen.getByText("Total Customers")).toBeDefined();
    expect(screen.getByText("Total Transactions")).toBeDefined();
    expect(screen.getByText("Total Reward Points")).toBeDefined();

    // Check specific values are rendered
    expect(screen.getByText("15")).toBeDefined();
    expect(screen.getByText("42")).toBeDefined();
    expect(screen.getByText("12,500")).toBeDefined(); // Formatted via toLocaleString()
  });
});
