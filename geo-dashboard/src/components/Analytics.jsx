const Analytics = ({ data }) => {
  const total = data.length;
  const active = data.filter(p => p.status === "Active").length;
  const inactive = data.filter(p => p.status === "Inactive").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

      <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow">
        <h3>Total Projects</h3>
        <p className="text-2xl font-bold">{total}</p>
      </div>

      <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow">
        <h3>Active</h3>
        <p className="text-2xl font-bold">{active}</p>
      </div>

      <div className="bg-linear-to-r from-red-500 to-red-600 text-white p-4 rounded-xl shadow">
        <h3>Inactive</h3>
        <p className="text-2xl font-bold">{inactive}</p>
      </div>

    </div>
  );
};

export default Analytics;
