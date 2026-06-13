import React, { useState, useMemo } from "react";
import { useRewards } from "./hooks/useRewards";
import { customers } from "./constants/customers";
import Dashboard from "./components/Dashboard/Dashboard";
import SearchBar from "./components/SearchBar/SearchBar";
import RewardsTable from "./components/RewardsTable/RewardsTable";
import CustomerDetails from "./components/CustomerDetails/CustomerDetails";
import Loader from "./components/Loader/Loader";
import ErrorState from "./components/ErrorState/ErrorState";
import EmptyState from "./components/EmptyState/EmptyState";

export default function App() {
  const {
    customerRewards,
    totalStats,
    loading,
    error,
    retry
  } = useRewards();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const enrichedRewards = useMemo(() => {
    if (!customerRewards) return [];
    
    return customerRewards.map((item) => ({
      ...item,
      customerName: customers[item.customerID] || "Unknown Customer"
    }));
  }, [customerRewards]);

  const processedCustomerRewards = useMemo(() => {
    const filtered = enrichedRewards.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      
      const idMatch = item.customerID.toLowerCase().includes(query);
      const nameMatch = item.customerName.toLowerCase().includes(query);
      return idMatch || nameMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.customerName.localeCompare(b.customerName);
      } else if (sortBy === "id") {
        return a.customerID.localeCompare(b.customerID);
      } else if (sortBy === "rewards") {
        return b.totalRewards - a.totalRewards;
      }
      return 0;
    });
  }, [enrichedRewards, searchQuery, sortBy]);

  const handleSortToggle = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortBy("name");
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={retry} />;
    }

    if (processedCustomerRewards.length === 0) {
      return (
        <>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleResetFilters}
          />
          <EmptyState
            title="No Results Found"
            description={`We couldn't find any customers fitting the search query: "${searchQuery}". Try searching by IDs (e.g. "C1") or names.`}
          />
        </>
      );
    }

    return (
      <div className="dashboard-wrapper">
        <Dashboard stats={totalStats} />
        
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleResetFilters}
        />

        <div className="rewards-table-wrapper">
          <RewardsTable
            customersData={processedCustomerRewards}
            sortBy={sortBy}
            onSortToggle={handleSortToggle}
            onSelectCustomer={setSelectedCustomer}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="app-container" id="app-root-shell">
      <header className="page-header" id="main-navigation-header">
        <div>
          <h1 className="page-title">
            Retailer Rewards Program
          </h1>
          <p className="page-subtitle">
            Calculate and view customer reward points earned over a three-month period.
          </p>
        </div>
      </header>

      <main id="primary-layout-card-canvas">
        {renderContent()}
      </main>

      {selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
