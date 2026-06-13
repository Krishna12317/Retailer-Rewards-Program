import React from "react";

export default function SearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onReset
}) {
  return (
    <div className="search-bar-wrapper fade-in" id="filter-controls-dock">
      <div className="search-input-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="input-control search-input"
          placeholder="Search by ID or Name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search by Customer ID or Name"
          id="criteria-search-input"
        />
      </div>

      <div className="sort-select-container">
        <label htmlFor="sort-criteria" className="metric-label mr-sm">
          Sort By:
        </label>
        <select
          id="sort-criteria"
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort rewards list"
        >
          <option value="name">Customer Name</option>
          <option value="id">Customer ID</option>
          <option value="rewards">Total Rewards</option>
        </select>

        {(searchQuery || sortBy !== "name") && (
          <button
            className="btn btn-outline btn-reset"
            onClick={onReset}
            title="Reset active query and sorts"
            id="clear-filters-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
