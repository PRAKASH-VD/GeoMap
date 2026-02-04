import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(res => {
      setProjects(res);
      setLoading(false);
    });
  }, []);

  return { projects, loading };
};
