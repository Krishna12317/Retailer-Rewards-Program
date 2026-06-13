import React from "react";

export default function EmptyState({ title, description }) {
  return (
    <div className="state-container fade-in" id="empty-results-ui">
      <div className="state-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="8" x2="14" y2="14" />
          <line x1="14" y1="8" x2="8" y2="14" />
        </svg>
      </div>
      <h3 className="state-title">{title || "No Matches Found"}</h3>
      <p className="state-desc">
        {description || "We couldn't locate any records matching your search query. Try adjusting your spelling or customer identifier criteria."}
      </p>
    </div>
  );
}
