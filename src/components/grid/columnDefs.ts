import type { ColDef, ColGroupDef } from "ag-grid-community";
import type { Employee } from "../../types/employee";
import { PerformanceCell } from "../renderers/PerformanceCell";
import { SkillsCell } from "../renderers/SkillsCell";
import { StatusCell } from "../renderers/StatusCell";

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
    field: "isActive", // Keep original boolean for filtering logic
    headerName: "Status",
    // 1. Use valueGetter to convert boolean to string for the Grid's engine
    valueGetter: (params) => (params.data?.isActive ? "Active" : "Inactive"),

    // 2. Use your custom renderer for the visuals
    cellRenderer: StatusCell,

    // 3. Configure the filter to look for "Active" or "Inactive" strings
    filter: "agTextColumnFilter",
    floatingFilter: true,
    filterParams: {
      buttons: ["reset"],

      filterOptions: [
        {
          displayKey: "activeOnly",
          displayName: "Active",
          predicate: (_: unknown, cellValue: string) => cellValue === "Active",
          numberOfInputs: 0,
        },
        {
          displayKey: "inactiveOnly",
          displayName: "Inactive",
          predicate: (_: unknown, cellValue: string) =>
            cellValue === "Inactive",
          numberOfInputs: 0,
        },
      ],
      maxNumConditions: 1,
    },

    // 4. Critical for v31+: Disable automatic data type detection for this column
    cellDataType: false,
  },
  {
    field: "skills", // Keeps params.value as the original array for your SkillsCell
    headerName: "Skills",
    cellRenderer: SkillsCell,
    sortable: false,
    minWidth: 200,
    filter: "agTextColumnFilter",
    floatingFilter: true,

    // This ONLY affects the filter, not the cell rendering
    filterValueGetter: (params) => {
      return params.data?.skills ? params.data.skills.join(", ") : "";
    },
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
