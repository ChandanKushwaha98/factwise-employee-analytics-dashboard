import type { ColDef, ColGroupDef, GridApi } from "ag-grid-community";
import { useState } from "react";

interface GridToolbarColumn extends ColDef {
  field: string;
}

interface GridToolbarProps {
  quickFilter: string;
  onQuickFilterChange: (v: string) => void;
  onSaveView: () => void;
  onLoadView: () => void;
  onClearView: () => void;
  onExport: () => void;
  gridApi: GridApi | null;
  columnDefs: (ColDef | ColGroupDef)[];
  onClearFilters: () => void;
  showClearButton: boolean;
}

export const GridToolbar = ({
  quickFilter,
  onQuickFilterChange,
  onSaveView,
  onLoadView,
  onClearView,
  onExport,
  gridApi,
  columnDefs,
  onClearFilters,
  showClearButton,
}: GridToolbarProps) => {
  const [showChooser, setShowChooser] = useState<boolean>(false);
  const [showViewMenu, setShowViewMenu] = useState<boolean>(false);

  // Extract leaf-level columns that have a field (group cols are skipped)
  const leafCols = columnDefs.filter(
    (c): c is GridToolbarColumn => "field" in c && typeof c.field === "string",
  );

  const toggleColumn = (field: string, visible: boolean) => {
    gridApi?.setColumnsVisible([field], visible);
  };

  const getColVisible = (field: string) =>
    gridApi?.getColumn(field)?.isVisible() ?? true;

  return (
    <div className="toolbar">
      {/* Quick Search */}
      <div className="toolbar-left">
        <div className="toolbar-search">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search employees..."
            value={quickFilter}
            onChange={(e) => onQuickFilterChange(e.target.value)}
            className="toolbar-input"
          />
          {quickFilter && (
            <button
              className="btn-icon"
              onClick={() => onQuickFilterChange("")}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <div className="">
          <button
            onClick={onClearFilters}
            className="btn-secondary"
            style={{ visibility: showClearButton ? "visible" : "hidden" }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="toolbar-actions">
        {/* Saved Views */}
        <div className="dropdown-wrapper">
          <button
            className="btn-secondary"
            onClick={() => setShowViewMenu(!showViewMenu)}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Views
          </button>
          {showViewMenu && (
            <div
              className="dropdown-menu"
              onMouseLeave={() => setShowViewMenu(false)}
            >
              <button
                className="dropdown-item"
                onClick={() => {
                  onSaveView();
                  setShowViewMenu(false);
                }}
              >
                Save current view
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  onLoadView();
                  setShowViewMenu(false);
                }}
              >
                Load saved view
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item danger"
                onClick={() => {
                  onClearView();
                  setShowViewMenu(false);
                }}
              >
                Reset view
              </button>
            </div>
          )}
        </div>

        {/* CSV Export */}
        <button className="btn-secondary" onClick={onExport}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV
        </button>

        {/* Column Chooser */}
        <div className="dropdown-wrapper">
          <button
            className="btn-secondary"
            onClick={() => setShowChooser(!showChooser)}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            Columns
          </button>
          {showChooser && gridApi && (
            <div
              className="dropdown-menu column-chooser"
              onMouseLeave={() => setShowChooser(false)}
            >
              <div className="dropdown-title">Toggle Columns</div>
              {leafCols.map((col) => {
                const field = col.field as string;
                return (
                  <label key={field} className="chooser-item">
                    <input
                      type="checkbox"
                      defaultChecked={getColVisible(field)}
                      onChange={(e) => toggleColumn(field, e.target.checked)}
                    />
                    <span>{col.headerName ?? field}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
