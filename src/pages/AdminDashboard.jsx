import { useState } from "react";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState(
    JSON.parse(localStorage.getItem("complaints")) || []
  );

  const markResolved = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: "Resolved" } : c
    );
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen px-10 py-20 bg-gray-50">
      <h2 className="text-4xl font-semibold text-[#0A2540] mb-12">
        Admin Dashboard
      </h2>

      <div className="grid gap-6">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white p-6 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.location}</p>
              <span className="text-sm">{c.status}</span>
            </div>

            {c.status !== "Resolved" && (
              <button
                onClick={() => markResolved(c.id)}
                className="bg-green-500 text-white px-5 py-2 rounded-full"
              >
                Mark Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
