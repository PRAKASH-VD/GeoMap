import { List, useListRef } from "react-window";
import { useEffect, useRef, useState } from "react";

const toCsvValue = (value) => {
  const text = String(value ?? "");
  if (text.includes("\"") || text.includes(",") || text.includes("\n")) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }
  return text;
};

const exportCsv = (rows) => {
  const headers = ["Project Name", "Latitude", "Longitude", "Status", "Last Updated"];
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      [
        toCsvValue(row.projectName),
        toCsvValue(row.latitude),
        toCsvValue(row.longitude),
        toCsvValue(row.status),
        toCsvValue(row.lastUpdated)
      ].join(",")
    )
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "projects.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const Row = ({ index, style, rows, selectedId, onSelect, ariaAttributes }) => {
  const project = rows[index];

  return (
    <div
      style={style}
      {...ariaAttributes}
      onClick={() => onSelect(project.id)}
      className={`grid grid-cols-5 px-3 py-2 cursor-pointer border-b text-slate-900 dark:text-slate-100
        hover:bg-blue-100 dark:hover:bg-gray-700
        ${project.id === selectedId ? "bg-blue-200 dark:bg-gray-600" : ""}`}
    >
      <div>{project.projectName}</div>
      <div>{project.latitude}</div>
      <div>{project.longitude}</div>
      <div>{project.status}</div>
      <div>{project.lastUpdated}</div>
    </div>
  );
};

const DataTable = ({
  data,
  selectedId,
  onSelect,
  status,
  setStatus,
  statuses,
  exportFilteredData,
  exportAllData,
  page,
  pageCount,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportScope, setExportScope] = useState("filtered");
  const dropdownRef = useRef(null);
  const listRef = useListRef();
  const [jumpValue, setJumpValue] = useState(String(page));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setJumpValue(String(page));
  }, [page]);

  useEffect(() => {
    if (!selectedId) return;
    const index = data.findIndex((row) => row.id === selectedId);
    if (index === -1) return;
    listRef.current?.scrollToRow({ index, behavior: "smooth", align: "center" });
  }, [data, selectedId, listRef]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-[70vh]">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-3 py-2 bg-linear-to-r from-blue-500 to-indigo-500 text-white">
        <div className="grid grid-cols-5 w-full items-center text-center font-semibold">
          <div>Project</div>
          <div>Lat</div>
          <div>Lng</div>
          <div>Status</div>
          <div>Updated</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border border-white/30 bg-white/10 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setExportScope("filtered")}
              className={`rounded-md px-2.5 py-1 font-medium transition ${
                exportScope === "filtered"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Filtered
            </button>
            <button
              type="button"
              onClick={() => setExportScope("all")}
              className={`rounded-md px-2.5 py-1 font-medium transition ${
                exportScope === "all"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              All Data
            </button>
          </div>
          <button
            type="button"
            onClick={() =>
              exportCsv(exportScope === "all" ? exportAllData : exportFilteredData)
            }
            className="rounded-md border border-white/40 bg-white/15 px-3 py-1 text-sm font-medium text-white transition hover:bg-white/25"
          >
            Export CSV
          </button>
          <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-md bg-white/20 px-3 py-1 text-sm font-medium text-white transition hover:bg-white/30"
          >
            <span>{status}</span>
            <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
          </button>
          {isOpen && (
            <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white text-sm text-slate-800 shadow-lg">
              {statuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setStatus(s);
                    setIsOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left transition hover:bg-slate-100 ${
                    s === status ? "bg-slate-50 font-semibold" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Virtualized Rows */}
      <List
        style={{ height: 500, width: "100%" }}
        rowCount={data.length}
        rowHeight={45}
        rowComponent={Row}
        rowProps={{ rows: data, selectedId, onSelect }}
        listRef={listRef}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60 px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
        <div>
          Showing <span className="font-semibold text-slate-900 dark:text-white">{data.length}</span> of{" "}
          <span className="font-semibold text-slate-900 dark:text-white">{total}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Prev
          </button>
          <span>
            Page <span className="font-semibold text-slate-900 dark:text-white">{page}</span> / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(pageCount, page + 1))}
            className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Next
          </button>
          <label className="flex items-center gap-2">
            <span>Rows</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-800 outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span>Jump</span>
            <input
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                const target = Number(jumpValue);
                if (Number.isNaN(target)) return;
                const next = Math.min(Math.max(target, 1), pageCount);
                onPageChange(next);
              }}
              className="w-16 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-800 outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              inputMode="numeric"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              const target = Number(jumpValue);
              if (Number.isNaN(target)) return;
              const next = Math.min(Math.max(target, 1), pageCount);
              onPageChange(next);
            }}
            className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
