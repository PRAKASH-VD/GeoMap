import { useMemo } from "react";

export const useFilteredProjects = (projects = [], status, sortKey) => {
  return useMemo(() => {
    let data = Array.isArray(projects) ? [...projects] : [];

    if (status !== "All") {
      data = data.filter(p => p.status === status);
    }

    if (sortKey === "name") {
      data.sort((a, b) =>
        String(a.projectName ?? "").localeCompare(String(b.projectName ?? ""))
      );
    }

    return data;
  }, [projects, status, sortKey]);
};
