import type { ColDef, ColGroupDef } from "ag-grid-community";
import type { Employee } from "../../types/employee";
import { StatusCell } from "../renderers/StatusCell";
import { PerformanceCell } from "../renderers/PerformanceCell";
import { SkillsCell } from "../renderers/SkillsCell";

// Formatter reused across salary fields
const currencyFormatter = (value: number) =>
  value != null ? `$${value.toLocaleString()}` : "";

export const getColumnDefs = (): (
  | ColDef<Employee>
  | ColGroupDef<Employee>
)[] => [
  {
    // Row grouping column — hidden from display; AG Grid uses it internally
    field: "department",
    rowGroup: true,
    hide: true,
  },
  {
    headerName: "Employee",
    // valueGetter computes full name — avoids storing derived data
    valueGetter: (p) =>
      p.data ? `${p.data.firstName} ${p.data.lastName}` : "",
    filter: "agTextColumnFilter",
    floatingFilter: true,
    minWidth: 160,
    pinned: "left",
  },
  {
    field: "position",
    headerName: "Position",
    filter: "agTextColumnFilter",
    floatingFilter: true,
    minWidth: 160,
  },
  {
    field: "location",
    headerName: "Location",
    filter: "agTextColumnFilter",
    floatingFilter: true,
    minWidth: 130,
  },
  {
    field: "salary",
    headerName: "Salary",
    // aggFunc sum aggregates grouped rows — Community-compatible
    aggFunc: "sum",
    valueFormatter: (p) => currencyFormatter(p.value as number),
    filter: "agNumberColumnFilter",
    floatingFilter: true,
    minWidth: 130,
    type: "numericColumn",
  },
  {
    field: "performanceRating",
    headerName: "Performance",
    cellRenderer: PerformanceCell,
    filter: "agNumberColumnFilter",
    floatingFilter: true,
    minWidth: 160,
    // Comparator ensures numeric sort on custom renderer column
    comparator: (a, b) => a - b,
  },
  {
    field: "projectsCompleted",
    headerName: "Projects",
    aggFunc: "sum",
    filter: "agNumberColumnFilter",
    floatingFilter: true,
    minWidth: 110,
    type: "numericColumn",
  },
  {
    field: "isActive",
    headerName: "Status",
    cellRenderer: StatusCell,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    minWidth: 110,
    // filterValueGetter maps boolean → string for text filter usability
    filterValueGetter: (p) => (p.data?.isActive ? "Active" : "Inactive"),
  },
  {
    field: "skills",
    headerName: "Skills",
    cellRenderer: SkillsCell,
    sortable: false,
    filter: false,
    minWidth: 200,
  },
  {
    field: "hireDate",
    headerName: "Hire Date",
    filter: "agDateColumnFilter",
    floatingFilter: true,
    minWidth: 130,
  },
  {
    field: "manager",
    headerName: "Manager",
    filter: "agTextColumnFilter",
    floatingFilter: true,
    minWidth: 150,
    valueFormatter: (p) => p.value ?? "—",
  },
];
