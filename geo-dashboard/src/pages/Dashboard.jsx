import { useEffect, useMemo, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { useFilteredProjects } from "../hooks/useFilteredProjects";
import DataTable from "../components/table/DataTable";
import MapView from "../components/map/MapView";
import Analytics from "../components/Analytics";

export default function Dashboard() {
  const { projects } = useProjects();
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const statuses = useMemo(
    () => ["All", ...new Set(projects.map((item) => item.status))],
    [projects]
  );

  const filtered = useFilteredProjects(projects, status, "name");
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  useEffect(() => {
    setPage(1);
  }, [status, pageSize]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const handleSelect = (id) => {
    setSelectedId(id);
    const index = filtered.findIndex((item) => item.id === id);
    if (index === -1) return;
    const newPage = Math.floor(index / pageSize) + 1;
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4 p-4">
      <Analytics data={filtered} />
      <DataTable
        data={pagedData}
        selectedId={selectedId}
        onSelect={handleSelect}
        status={status}
        setStatus={setStatus}
        statuses={statuses}
        exportFilteredData={filtered}
        exportAllData={projects}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      <MapView
        data={pagedData}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
    </div>
  );
}
