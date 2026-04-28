import type { Employee } from "../../types/employee";

interface MetricsCardsProps {
  employees: Employee[];
}

interface Metric {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent: string;
}

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const DollarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const MetricsCards = ({ employees }: MetricsCardsProps) => {
  const total = employees.length;
  const active = employees.filter((e) => e.isActive).length;
  const avgSalary = employees.reduce((s, e) => s + e.salary, 0) / total;
  const avgRating =
    employees.reduce((s, e) => s + e.performanceRating, 0) / total;

  const metrics: Metric[] = [
    {
      label: "Total Employees",
      value: total.toString(),
      sub: "Across all departments",
      icon: <UserIcon />,
      accent: "#6366f1",
    },
    {
      label: "Active Employees",
      value: active.toString(),
      sub: `${Math.round((active / total) * 100)}% of workforce`,
      icon: <CheckIcon />,
      accent: "#22c55e",
    },
    {
      label: "Avg. Salary",
      value: `$${Math.round(avgSalary).toLocaleString()}`,
      sub: "Company-wide average",
      icon: <DollarIcon />,
      accent: "#f59e0b",
    },
    {
      label: "Avg. Performance",
      value: avgRating.toFixed(2),
      sub: "Out of 5.0 rating scale",
      icon: <StarIcon />,
      accent: "#3b82f6",
    },
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((m) => (
        <div key={m.label} className="metric-card">
          <div
            className="metric-icon"
            style={{ color: m.accent, background: `${m.accent}18` }}
          >
            {m.icon}
          </div>
          <div className="metric-body">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value" style={{ color: m.accent }}>
              {m.value}
            </div>
            <div className="metric-sub">{m.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
