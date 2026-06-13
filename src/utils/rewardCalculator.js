export const calculateRewardPoints = (amount) => {
  if (typeof amount !== "number" || isNaN(amount) || amount <= 50) {
    return 0;
  }
  
  const wholeDollars = Math.floor(amount);
  
  if (wholeDollars <= 100) {
    return wholeDollars - 50;
  }
  
  return 50 + (wholeDollars - 100) * 2;
};

export const calculateMonthlyRewards = (transactions) => {
  if (!Array.isArray(transactions)) return {};
  
  const monthlyTotals = {};
  
  transactions.forEach((tx) => {
    if (!tx || !tx.date) return;
    
    const dateObj = new Date(tx.date);
    const monthName = isNaN(dateObj.getTime())
      ? "Unknown"
      : dateObj.toLocaleString("default", { month: "long" });
      
    const points = calculateRewardPoints(tx.amount);
    monthlyTotals[monthName] = (monthlyTotals[monthName] || 0) + points;
  });
  
  return monthlyTotals;
};

export const calculateCustomerRewards = (transactions) => {
  if (!Array.isArray(transactions)) return [];
  
  const customerMap = {};
  
  transactions.forEach((tx) => {
    const { customerID, amount, date } = tx;
    if (!customerID) return;
    
    const points = calculateRewardPoints(amount);
    
    const dateObj = new Date(date);
    const monthName = isNaN(dateObj.getTime())
      ? "Unknown"
      : dateObj.toLocaleString("default", { month: "long" });
      
    if (!customerMap[customerID]) {
      customerMap[customerID] = {
        customerID,
        monthlyRewards: {},
        totalRewards: 0,
        transactions: []
      };
    }
    
    const customer = customerMap[customerID];
    customer.monthlyRewards[monthName] = (customer.monthlyRewards[monthName] || 0) + points;
    customer.totalRewards += points;
    customer.transactions.push({
      ...tx,
      points
    });
  });
  
  return Object.values(customerMap);
};

export const calculateTotalRewards = (transactions) => {
  if (!Array.isArray(transactions)) return 0;
  return transactions.reduce((sum, tx) => sum + calculateRewardPoints(tx?.amount || 0), 0);
};
