# Geo Data Dashboard

React + Vite dashboard for spatial and tabular project data with synced table and map interactions.
Project Link: https://geo-maping.netlify.app/

## Setup
```bash
npm install
npm run dev
```

## Decisions Explained
- Used React functional components and hooks only for clarity and composability.
- Tailwind CSS v4 for fast UI iteration, with class-based dark mode enabled via `@custom-variant` in `src/index.css`.
- Virtualized the table using `react-window` (v2 API) to keep scrolling smooth with large datasets.
- Kept state local (no Redux) and centralized pagination + selection in `Dashboard` to synchronize UI.
- Leaflet + marker clustering for performant map rendering and clean spatial overview.

## Component Decomposition
- `src/pages/Dashboard.jsx`: orchestration of filters, pagination, selection, and derived data
- `src/components/table/DataTable.jsx`: virtualized table, export CSV, pagination controls
- `src/components/map/MapView.jsx`: Leaflet map + clustered markers
- `src/components/Analytics.jsx`: summary and aggregate UI
- `src/components/layout/Navbar.jsx` / `Footer.jsx`: layout and theming controls
- `src/hooks/*`: data fetching and filtering hooks

## Handling Large Datasets
- Virtualized list rendering with `react-window` to avoid DOM bloat.
- Client-side filtering + pagination reduces render work per update.
- Map uses marker clustering to keep performance stable with many points.

## Map + UI Synchronization
- Selecting a table row highlights the matching map marker.
- Clicking a marker updates the selected row and auto-scrolls into view.
- Pagination updates are coordinated so selection moves to the correct page when needed.

## Code Readability
- Clear separation of UI vs data logic.
- Simple, descriptive component names and props.
- Small helper utilities for CSV export and formatting.

## Evaluation Criteria Coverage
- Component decomposition: see section above.
- Handling large datasets: virtualized table + clustering.
- Map + UI synchronization: bidirectional selection + auto-scroll.
- Code readability: hooks + single-responsibility components.

## Screenshots / Recording
Add images or a short recording here:
- Full dashboard overview
- Filtered view + selected marker
- Pagination + export controls

## Time Spent
Honest estimate: ____ hours.

## GitHub Link
Add the repository URL here:
```
https://github.com/PRAKASH-VD/GeoMap
```
