const MyComplaints = () => {
  const complaints =
    JSON.parse(localStorage.getItem("complaints")) || [];

  return (
    <div className="min-h-screen px-10 py-20 bg-gray-50">
      <h2 className="text-4xl font-semibold text-[#0A2540] mb-12">
        My Complaints
      </h2>

      <div className="grid gap-6">
        {complaints.length === 0 && (
          <p className="text-gray-500">No complaints yet.</p>
        )}

        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="text-gray-600 mt-2">{c.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              📍 {c.location}
            </p>

            <span className="inline-block mt-4 px-4 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComplaints;
