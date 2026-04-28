import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  type GridApi,
  type GridReadyEvent,
  type RowClassParams,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";

import type { Employee } from "../../types/employee";
import { getColumnDefs } from "./columnDefs";

// Register all Community modules once at module level (AG Grid v33+)
ModuleRegistry.registerModules([AllCommunityModule]);

interface EmployeeGridProps {
  employees: Employee[];
  loading: boolean;
}

export const EmployeeGrid = ({ employees, loading }: EmployeeGridProps) => {
  const gridApiRef = useRef<GridApi | null>(null);
  console.log("employees", employees);
  const onGridReady = useCallback((e: GridReadyEvent) => {
    gridApiRef.current = e.api;
    e.api.sizeColumnsToFit();
  }, []);

  // Subtle striping on non-grouped rows for readability
  const getRowClass = (params: RowClassParams<Employee>) =>
    !params.node.group &&
    params.node.rowIndex != null &&
    params.node.rowIndex % 2 === 1
      ? "ag-row-alt"
      : "";

  const columnDefs = getColumnDefs();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        height: "100%",
      }}
    >
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
          // Pinned summary row
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
