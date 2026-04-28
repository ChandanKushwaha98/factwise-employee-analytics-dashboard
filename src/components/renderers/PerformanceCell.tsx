import type { CustomCellRendererProps } from "ag-grid-react";

export const PerformanceCell = ({ value }: CustomCellRendererProps) => {
  const rating = typeof value === "number" ? value : 0;
  const pct = (rating / 5) * 100;

  const color =
    rating >= 4.5
      ? "#22c55e"
      : rating >= 4.0
        ? "#3b82f6"
        : rating >= 3.5
          ? "#f59e0b"
          : "#ef4444";

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}
    >
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 3,
            background: color,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color, minWidth: 28 }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
