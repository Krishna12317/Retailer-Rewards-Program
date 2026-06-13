import React, { useEffect } from "react";

export default function CustomerDetails({ customer, onClose }) {
  if (!customer) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop-overlay") {
      onClose();
    }
  };

  const transactionsList = customer.transactions || [];
  const totalSpend = transactionsList.reduce((sum, tx) => sum + tx.amount, 0);
  const avgSpend = transactionsList.length ? (totalSpend / transactionsList.length).toFixed(2) : 0;

  return (
    <div
      className="modal-backdrop"
      id="modal-backdrop-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content fade-in" id="customer-transactions-modal">
        <div className="modal-header">
          <div>
            <h2 className="modal-title-h2">
              Transaction Ledger
            </h2>
            <p className="page-subtitle modal-subtitle-sub">
              Viewing records for{" "}
              <strong className="modal-customer-highlight">
                {customer.customerName} ({customer.customerID})
              </strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
            id="close-modal-x-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-grid-3">
            <div className="modal-stat-column">
              <div className="modal-stat-label">Total Spent</div>
              <div className="modal-stat-val">${totalSpend.toLocaleString()}</div>
            </div>

            <div className="modal-stat-column-border">
              <div className="modal-stat-label">Avg Purchase</div>
              <div className="modal-stat-val">${avgSpend}</div>
            </div>

            <div className="modal-stat-column">
              <div className="modal-stat-label">Points Earned</div>
              <div className="modal-stat-val text-success">{customer.totalRewards} pts</div>
            </div>
          </div>

          <div className="table-container border-divider">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="font-size-xs">Transaction ID</th>
                  <th className="font-size-xs">Purchase Date</th>
                  <th className="font-size-xs text-right">Amount</th>
                  <th className="font-size-xs text-right">Rewards</th>
                </tr>
              </thead>
              <tbody>
                {transactionsList.map((tx) => (
                  <tr key={tx.transactionID}>
                    <td className="font-mono text-font-medium-85">
                      {tx.transactionID}
                    </td>
                    <td className="text-font-85">
                      {tx.date}
                    </td>
                    <td className="text-font-bold-85">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="text-right text-font-85">
                      {tx.points > 0 ? (
                        <span className="badge badge-success">+{tx.points} pts</span>
                      ) : (
                        <span className="badge badge-info zero-points-badge">
                          0 pts
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
