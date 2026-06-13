import React from "react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-container error fade-in" id="error-boundary-ui">
      <div className="state-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      </div>
      <h3 className="state-title">An Error Occurred</h3>
      <p className="state-desc">
        {message || "We encountered an issue pulling the transactional database snapshots. Please try again."}
      </p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} id="retry-fetch-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-xs animate-spin-slow">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
          Retry Fetching
        </button>
      )}
    </div>
  );
}
