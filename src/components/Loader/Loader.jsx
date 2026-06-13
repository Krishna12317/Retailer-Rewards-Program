import React from "react";

export default function Loader() {
  return (
    <div className="dashboard-wrapper">
      <div className="grid-3 mb-xl">
        {[1, 2, 3].map((n) => (
          <div key={n} className="card flex-gap-md">
            <div className="skeleton w-loader-img"></div>
            <div className="flex-1">
              <div className="skeleton skeleton-text w-loader-title"></div>
              <div className="skeleton skeleton-text w-loader-subtitle"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-md mb-lg flex-between">
        <div className="skeleton w-loader-search"></div>
        <div className="skeleton w-loader-sort"></div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="skeleton w-loader-table-header"></div>
        {[1, 2, 3, 4, 5].map((idx) => (
          <div key={idx} className="loader-table-row">
            <div className="skeleton skeleton-text w-loader-cell-15"></div>
            <div className="skeleton skeleton-text w-loader-cell-25"></div>
            <div className="skeleton skeleton-text w-loader-cell-10"></div>
            <div className="skeleton skeleton-text w-loader-cell-10"></div>
            <div className="skeleton skeleton-text w-loader-cell-10"></div>
            <div className="skeleton skeleton-text w-loader-cell-15"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
