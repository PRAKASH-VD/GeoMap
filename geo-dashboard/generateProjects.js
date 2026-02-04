import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOTAL_RECORDS = 5000;

const statuses = ["Active", "Inactive", "Maintenance"];
const projectTypes = ["Solar Plant", "Wind Farm", "Hydro Station", "Grid Hub"];

// India geo boundaries
const LAT_MIN = 8.0;
const LAT_MAX = 37.0;
const LNG_MIN = 68.0;
const LNG_MAX = 97.0;

const projects = Array.from({ length: TOTAL_RECORDS }, (_, i) => {
  const id = i + 1;

  return {
    id,
    projectName: `${projectTypes[i % projectTypes.length]} ${id}`,
    latitude: +(LAT_MIN + Math.random() * (LAT_MAX - LAT_MIN)).toFixed(5),
    longitude: +(LNG_MIN + Math.random() * (LNG_MAX - LNG_MIN)).toFixed(5),
    status: statuses[i % statuses.length],
    lastUpdated: `2025-01-${String((i % 28) + 1).padStart(2, "0")}`
  };
});

const outputPath = path.join(__dirname, "projects.json");

fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));

console.log(`✅ Generated ${TOTAL_RECORDS} project records`);
console.log(`📄 File saved at: ${outputPath}`);
