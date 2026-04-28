import {
  type GridApi,
  type GridReadyEvent,
  type RowClassParams,
  AllCommunityModule,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";

import type { Employee } from "../../types/employee";
import { useGridState } from "../hooks/useGridState";
import { getColumnDefs } from "./columnDefs";
import { GridToolbar } from "./GridToolbar";

// Register all Community modules once at module level (AG Grid v33+)
ModuleRegistry.registerModules([AllCommunityModule]);

interface EmployeeGridProps {
  employees: Employee[];
  loading: boolean;
}

// Pinned bottom row shows aggregated totals across ALL employees (ungrouped total)
const buildPinnedRow = (employees: Employee[]) => ({
  firstName: "TOTAL",
  lastName: "",
  salary: employees.reduce((s, e) => s + e.salary, 0),
  // projectsCompleted: employees.reduce((s, e) => s + e.projectsCompleted, 0),
  isActive: "null",
  skills: [],
  performanceRating: employees.length
    ? Number(
        (
          employees.reduce((sum, e) => sum + e.performanceRating, 0) /
          employees.length
        ).toFixed(1),
      )
    : 0,
  department: "",
  position: "",
  location: "",
});

export const EmployeeGrid = ({ employees, loading }: EmployeeGridProps) => {
  const gridApiRef = useRef<GridApi | null>(null);

  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const [quickFilter, setQuickFilter] = useState("");

  const { saveView, loadView, clearView } = useGridState(gridApiRef);

  const onGridReady = useCallback((e: GridReadyEvent) => {
    gridApiRef.current = e.api;

    // Put API into state for rendering use
    setGridApi(e.api);

    e.api.sizeColumnsToFit();
  }, []);

  const handleExport = useCallback(() => {
    gridApiRef.current?.exportDataAsCsv({
      fileName: `workforce-export-${new Date().toISOString().slice(0, 10)}.csv`,
    });
  }, []);

  // Subtle striping on non-grouped rows for readability
  const getRowClass = (params: RowClassParams<Employee>) =>
    !params.node.group &&
    params.node.rowIndex != null &&
    params.node.rowIndex % 2 === 1
      ? "ag-row-alt"
      : "";

  const columnDefs = getColumnDefs();
  const pinnedRow = buildPinnedRow(employees);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        height: "100%",
      }}
    >
      <GridToolbar
        quickFilter={quickFilter}
        onQuickFilterChange={setQuickFilter}
        onSaveView={() => saveView()}
        onLoadView={() => loadView()}
        onClearView={() => clearView()}
        onExport={handleExport}
        gridApi={gridApi}
        columnDefs={columnDefs}
      />

      <div className="ag-theme-custom" style={{ flex: 1, minHeight: 0 }}>
        <AgGridReact<Employee>
          rowData={employees}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          // Grouping
          groupDisplayType="groupRows"
          groupDefaultExpanded={1}
          // Row selection
          rowSelection={{ mode: "multiRow", checkboxes: true }}
          // Pagination — keeps DOM count manageable as dataset grows
          pagination
          paginationPageSize={15}
          paginationPageSizeSelector={[10, 15, 25, 50]}
          // Quick filter wired from toolbar
          quickFilterText={quickFilter}
          // Pinned summary row
          pinnedBottomRowData={[pinnedRow]}
          // Default column behavior
          defaultColDef={{
            sortable: true,
            resizable: true,
            minWidth: 80,
            flex: 1,
          }}
          // Subtle row styling
          getRowClass={getRowClass}
          // Loading overlay
          loading={loading}
          animateRows={true}
        />
      </div>
    </div>
  );
};
