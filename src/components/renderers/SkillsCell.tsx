import type { CustomCellRendererProps } from "ag-grid-react";

const TAG_COLORS = [
  {
    bg: "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.35)",
    text: "#818cf8",
  },
  {
    bg: "rgba(20,184,166,0.15)",
    border: "rgba(20,184,166,0.35)",
    text: "#2dd4bf",
  },
  {
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.35)",
    text: "#fbbf24",
  },
];

export const SkillsCell = ({ value }: CustomCellRendererProps) => {
  const skills: string[] = Array.isArray(value) ? value : [];

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        flexWrap: "nowrap",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {skills.slice(0, 2).map((skill, i) => {
        const c = TAG_COLORS[i % TAG_COLORS.length];
        return (
          <span
            key={skill}
            style={{
              padding: "1px 7px",
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.02em",
              background: c.bg,
              border: `1px solid ${c.border}`,
              color: c.text,
              whiteSpace: "nowrap",
            }}
          >
            {skill}
          </span>
        );
      })}
      {skills.length > 2 && (
        <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 500 }}>
          +{skills.length - 2}
        </span>
      )}
    </div>
  );
};
