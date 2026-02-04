import data from "../data/projects.json";

export const fetchProjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};
