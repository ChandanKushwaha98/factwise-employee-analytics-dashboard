import type { GridApi } from "ag-grid-community";
import type { RefObject } from "react";
import { useCallback } from "react";

const STORAGE_KEY = "workforce_grid_view";

interface SavedView {
  columnState: ReturnType<GridApi["getColumnState"]>;
  filterModel: ReturnType<GridApi["getFilterModel"]>;
}

export const useGridState = (gridApiRef: RefObject<GridApi | null>) => {
  const saveView = useCallback(() => {
    const api = gridApiRef.current;

    if (!api) return;

    const view: SavedView = {
      columnState: api.getColumnState(),
      filterModel: api.getFilterModel(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(view));
  }, [gridApiRef]);

  const loadView = useCallback(() => {
    const api = gridApiRef.current;

    if (!api) return;

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return;

    try {
      const view: SavedView = JSON.parse(raw);

      api.applyColumnState({
        state: view.columnState,
        applyOrder: true,
      });

      api.setFilterModel(view.filterModel);
    } catch {
      // Ignore corrupt storage
    }
  }, [gridApiRef]);

  const clearView = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);

    const api = gridApiRef.current;

    if (!api) return;

    api.resetColumnState();

    api.setFilterModel(null);
  }, [gridApiRef]);

  return {
    saveView,
    loadView,
    clearView,
  };
};
