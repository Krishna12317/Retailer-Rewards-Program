import React from "react";

export default function RewardsTable({
  customersData,
  sortBy,
  onSortToggle,
  onSelectCustomer
}) {
  const activeMonths = ["March", "April", "May"];

  const renderSortIndicator = (mode) => {
    if (sortBy === mode) {
      return <span className="ml-4px text-accent inline-block">▲</span>;
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-4px opacity-35">
        <path d="m21 16-4 4-4-4" />
        <path d="M17 20V4" />
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </svg>
    );
  };

  return (
    <div className="table-container fade-in" id="customer-rewards-table-block">
      <table className="data-table">
        <thead>
          <tr>
            <th
              className="cursor-pointer-th w-15-percent"
              onClick={() => onSortToggle("id")}
              title="Click to sort by ID"
            >
              <span className="flex-inline-center">
                ID
                {renderSortIndicator("id")}
              </span>
            </th>
            <th
              className="cursor-pointer-th w-25-percent"
              onClick={() => onSortToggle("name")}
              title="Click to sort by Name"
            >
              <span className="flex-inline-center">
                Customer Name
                {renderSortIndicator("name")}
              </span>
            </th>
            {activeMonths.map((m) => (
              <th key={m} className="text-right w-12-percent">
                {m}
              </th>
            ))}
            <th
              className="cursor-pointer-th text-right w-15-percent"
              onClick={() => onSortToggle("rewards")}
              title="Click to sort by Total Rewards"
            >
              <span className="flex-inline-center just-end w-full">
                Total Rewards
                {renderSortIndicator("rewards")}
              </span>
            </th>
            <th className="text-center w-13-percent">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customersData.map((row) => {
            const customerName = row.customerName || "Unknown Customer";
            return (
              <tr key={row.customerID} id={`row-${row.customerID}`}>
                <td className="font-mono font-semibold text-primary-light">
                  {row.customerID}
                </td>
                <td className="font-medium">{customerName}</td>
                {activeMonths.map((m) => {
                  const monthlyPoints = row.monthlyRewards[m] || 0;
                  return (
                    <td key={m} className="text-right font-semibold">
                      {monthlyPoints > 0 ? (
                        <span className="text-accent">{monthlyPoints.toLocaleString()}</span>
                      ) : (
                        <span className="text-muted opacity-40">0</span>
                      )}
                    </td>
                  );
                })}
                <td className="text-right font-bold text-accent">
                  {row.totalRewards.toLocaleString()} pts
                </td>
                <td className="text-center">
                  <button
                    className="row-trigger-btn"
                    onClick={() => onSelectCustomer(row)}
                    title={`View itemized ledger for ${customerName}`}
                    id={`action-btn-${row.customerID}`}
                  >
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
