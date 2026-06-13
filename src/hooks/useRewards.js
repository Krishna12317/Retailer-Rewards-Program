import { useState, useEffect } from "react";
import { getTransactions } from "../services/rewardsService";
import { customers } from "../constants/customers";
import {
  calculateCustomerRewards,
  calculateTotalRewards
} from "../utils/rewardCalculator";

export const useRewards = () => {
  const [data, setData] = useState({
    transactions: [],
    customerRewards: [],
    totalStats: {
      totalCustomers: 0,
      totalTransactions: 0,
      totalRewardPoints: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRewardsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const txs = await getTransactions();
      
      const individualCustomerRewards = calculateCustomerRewards(txs);
      
      const totalRewardPoints = calculateTotalRewards(txs);
      
      const activeCustomerIDs = [...new Set(txs.map((t) => t.customerID))];
      const totalCustomers = activeCustomerIDs.length;

      setData({
        transactions: txs,
        customerRewards: individualCustomerRewards,
        totalStats: {
          totalCustomers,
          totalTransactions: txs.length,
          totalRewardPoints
        }
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching rewards:", err);
      setError("Failed to fetch transaction data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardsData();
  }, []);

  return {
    ...data,
    loading,
    error,
    retry: fetchRewardsData
  };
};
