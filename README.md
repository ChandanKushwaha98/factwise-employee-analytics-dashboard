# Employee Workforce Analytics Dashboard

A scalable frontend analytics dashboard built using React, TypeScript, Vite, and AG Grid Community.

Built as part of the FactWise Frontend Dashboard assessment.

---

## Overview

This application visualizes employee data through interactive grid capabilities, grouped reporting, KPI summaries, and enterprise-inspired features implemented using AG Grid Community.

The solution is structured to demonstrate:

- AG Grid expertise  
- Scalable frontend architecture  
- Product-oriented UX decisions  
- Practical engineering trade-offs  

---

## Features

### Grid Capabilities
- Client-side AG Grid row model
- Department-level row grouping
- Salary and project aggregation
- Sorting, filtering and quick search
- Pagination
- Multi-row selection

### Analytics
- KPI summary cards
- Total employee count
- Active employee count
- Average salary
- Average performance rating

### Advanced Interactions
- Saved views (persisted column/filter state)
- Pinned summary row
- CSV export
- Column visibility chooser

### Custom Cell Renderers
- Status chips
- Performance progress bars
- Skills tags + tooltips

---

## Architecture Decisions

### Why Client-Side Row Model
Chosen intentionally per assessment requirement while preserving a migration path toward Infinite or Server-Side Row Models for larger datasets.

### Future Migration Path
For larger datasets (50k+ rows), this could migrate to:

- Infinite Row Model
- Server-Side Row Model
- Paginated API-backed data source

without changing column definitions or renderers.

### Why AG Grid Community
Implemented advanced capabilities using Community edition while avoiding licensed-only Enterprise features.

### Why Lightweight TypeScript
Focused typing was used for:

- Data models
- Grid configuration
- Renderer contracts

while intentionally avoiding unnecessary abstraction.

---

## Trade-Offs

Included:

- Strong grid capabilities
- Scalable structure
- Enterprise-inspired UX patterns

Intentionally excluded:

- Backend APIs
- Authentication
- Charting libraries
- Redux / over-engineered global state

---

## Tech Stack

- React 19
- TypeScript
- Vite
- AG Grid Community

---

## Folder Structure

```bash
src/
 data/
 types/

 components/
   dashboard/
   grid/
   renderers/

 hooks/
