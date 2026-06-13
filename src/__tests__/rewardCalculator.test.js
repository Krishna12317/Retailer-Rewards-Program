import { describe, it, expect } from "vitest";
import {
  calculateRewardPoints,
  calculateMonthlyRewards,
  calculateCustomerRewards,
  calculateTotalRewards,
} from "../utils/rewardCalculator";

describe("rewardCalculator", () => {
  describe("calculateRewardPoints", () => {
    it("should return 0 points for purchases of $50 or less", () => {
      expect(calculateRewardPoints(45)).toBe(0);
      expect(calculateRewardPoints(50)).toBe(0);
      expect(calculateRewardPoints(0)).toBe(0);
      expect(calculateRewardPoints(-10)).toBe(0);
    });

    it("should calculate 1 point per dollar spent between $50 and $100", () => {
      expect(calculateRewardPoints(51)).toBe(1);
      expect(calculateRewardPoints(75)).toBe(25);
      expect(calculateRewardPoints(100)).toBe(50);
    });

    it("should calculate 2 points per dollar spent over $100, plus 50 points for the $50-$100 range", () => {
      // 101 spent -> 50 points (from 50 to 100) + 2 points (for the 1 dollar over 100) = 52
      expect(calculateRewardPoints(101)).toBe(52);
      // 120 spent -> 50 points + (20 * 2) = 90 points
      expect(calculateRewardPoints(120)).toBe(90);
    });

    it("should handle non-integer numbers by rounding down to the nearest whole dollar", () => {
      // $75.50 spent -> equivalent to $75 -> 25 points
      expect(calculateRewardPoints(75.5)).toBe(25);
      // $120.99 spent -> equivalent to $120 -> 90 points
      expect(calculateRewardPoints(120.99)).toBe(90);
    });

    it("should return 0 for invalid non-numeric inputs", () => {
      expect(calculateRewardPoints(null)).toBe(0);
      expect(calculateRewardPoints(undefined)).toBe(0);
      expect(calculateRewardPoints("120")).toBe(0);
    });
  });

  describe("calculateMonthlyRewards", () => {
    it("should group and sum reward points for transactions by calendar month", () => {
      const mockTxs = [
        { date: "2026-03-10", amount: 120 }, // 90 pts
        { date: "2026-03-25", amount: 75 },  // 25 pts
        { date: "2026-04-15", amount: 110 }, // 70 pts
        { date: "2026-05-02", amount: 40 },  // 0 pts
      ];

      const monthly = calculateMonthlyRewards(mockTxs);
      expect(monthly["March"]).toBe(115);
      expect(monthly["April"]).toBe(70);
      expect(monthly["May"]).toBe(0);
    });

    it("should return an empty object for empty or invalid list inputs", () => {
      expect(calculateMonthlyRewards([])).toEqual({});
      expect(calculateMonthlyRewards(null)).toEqual({});
    });
  });

  describe("calculateCustomerRewards", () => {
    it("should group transaction totals and month-by-month values per unique customer ID", () => {
      const mockTxs = [
        { customerID: "C1", customerName: "Alice", date: "2026-03-12", amount: 120 }, // 90 pts
        { customerID: "C1", customerName: "Alice", date: "2026-04-15", amount: 75 },  // 25 pts
        { customerID: "C2", customerName: "Bob", date: "2026-03-25", amount: 110 },   // 70 pts
      ];

      const customerRewards = calculateCustomerRewards(mockTxs);
      expect(customerRewards).toHaveLength(2);

      const alice = customerRewards.find(c => c.customerID === "C1");
      const bob = customerRewards.find(c => c.customerID === "C2");

      expect(alice).toBeDefined();
      expect(alice.totalRewards).toBe(115);
      expect(alice.monthlyRewards["March"]).toBe(90);
      expect(alice.monthlyRewards["April"]).toBe(25);

      expect(bob).toBeDefined();
      expect(bob.totalRewards).toBe(70);
      expect(bob.monthlyRewards["March"]).toBe(70);
    });
  });

  describe("calculateTotalRewards", () => {
    it("should sum up the grand total of all reward points across all customer transactions", () => {
      const mockTxs = [
        { amount: 120 }, // 90
        { amount: 75 },  // 25
        { amount: 110 }, // 70
      ];
      expect(calculateTotalRewards(mockTxs)).toBe(185);
    });

    it("should return 0 for empty or invalid transactions lists", () => {
      expect(calculateTotalRewards([])).toBe(0);
      expect(calculateTotalRewards(null)).toBe(0);
    });
  });
});
