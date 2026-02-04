export default function TableRow({ project, active, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer hover:bg-blue-100 ${
        active ? "bg-blue-200" : ""
      }`}
    >
      <td className="p-2">{project.projectName}</td>
      <td>{project.latitude}</td>
      <td>{project.longitude}</td>
      <td>{project.status}</td>
      <td>{project.lastUpdated}</td>
    </tr>
  );
}
