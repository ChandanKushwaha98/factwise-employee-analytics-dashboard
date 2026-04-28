import type { CustomCellRendererProps } from "ag-grid-react";

export const StatusCell = (params: CustomCellRendererProps) => {
  // Hide status for pinned summary row
  if (params.node?.rowPinned) {
    return null;
  }

  const active = params.value === true;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        background: active ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",

        color: active ? "#16a34a" : "#dc2626",

        border: `1px solid ${
          active ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"
        }`,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: active ? "#22c55e" : "#ef4444",
          flexShrink: 0,
        }}
      />

      {active ? "Active" : "Inactive"}
    </span>
  );
};
