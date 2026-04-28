import { useState, useEffect } from "react";
import { employees as rawData } from "./data/employees";
import type { Employee } from "./types/employee";
import { EmployeeGrid } from "./components/grid/EmployeeGrid";
import "./index.css";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate async data fetch — swap for real API call when backend exists
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployees(rawData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo-mark">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <div>
            <h1 className="app-title">Workforce Analytics</h1>
            <p className="app-subtitle">
              Employee performance &amp; compensation dashboard
            </p>
          </div>
        </div>
        <div className="header-right">
          <span className="header-badge">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      <main className="app-main">
        {loading && (
          <div className="metrics-skeleton">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}

        <div className="grid-panel">
          {employees.length === 0 && !loading ? (
            <div className="empty-state">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <p>No employee data found</p>
            </div>
          ) : (
            <EmployeeGrid employees={employees} loading={loading} />
          )}
        </div>
      </main>
    </div>
  );
}
