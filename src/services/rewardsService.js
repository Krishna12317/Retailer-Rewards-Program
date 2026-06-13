import { transactions } from "../constants/transactions";

export const getTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...transactions]);
    }, 1500);
  });
};
