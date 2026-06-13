import React from "react";

export default function Dashboard({ stats }) {
  const { totalCustomers, totalTransactions, totalRewardPoints } = stats;

  return (
    <div className="grid-3 mb-xl" id="kpi-dashboard-metrics">
      <div className="card metric-card fade-in" id="kpi-customers-card">
        <div>
          <div className="metric-label">Total Customers</div>
          <div className="metric-value">{totalCustomers}</div>
        </div>
      </div>

      <div className="card metric-card accent-warning fade-in" id="kpi-transactions-card">
        <div>
          <div className="metric-label">Total Transactions</div>
          <div className="metric-value">{totalTransactions}</div>
        </div>
      </div>

      <div className="card metric-card accent-success fade-in" id="kpi-points-card">
        <div>
          <div className="metric-label">Total Reward Points</div>
          <div className="metric-value text-success">
            {totalRewardPoints.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
