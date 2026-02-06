import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComplaintById, updateComplaint } from "../utils/complaints";

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [remarks, setRemarks] = useState("");
  const [proofName, setProofName] = useState("");

  useEffect(() => {
    const found = getComplaintById(id);
    if (found) {
      setComplaint(found);
      setStatus(found.status || "Pending");
      setRemarks(found.remarks || "");
      setProofName(found.proofName || "");
    }
  }, [id]);

  const handleSave = () => {
    updateComplaint(id, {
      status,
      remarks,
      proofName,
      updatedAt: new Date().toISOString(),
    });
    navigate("/admin/complaints");
  };

  if (!complaint) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-semibold text-[#0A2540]">
            Complaint not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm">

        <h1 className="text-3xl font-semibold text-[#0A2540] mb-6">
          Complaint #{id}
        </h1>

        <p className="text-gray-600 mb-6">
          Issue: <strong>{complaint.title}</strong> <br />
          Location: {complaint.locationText || complaint.location || "-"} <br />
          Category: {complaint.category || "General"}
        </p>

        {/* STATUS UPDATE */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Update Status
          </label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        {/* REMARKS */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Admin Remarks
          </label>
          <textarea
            rows="3"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Action taken..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {/* PROOF */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Upload Proof
          </label>
          <input
            type="file"
            onChange={(e) =>
              setProofName(e.target.files?.[0]?.name || "")
            }
          />
          {proofName && (
            <p className="text-sm text-gray-500 mt-2">{proofName}</p>
          )}
        </div>

        <button
          onClick={handleSave}
          className="bg-[#2EC4B6] text-[#0A2540] px-8 py-3 rounded-full font-medium"
        >
          Save Update
        </button>

      </div>
    </div>
  );
};

export default AdminComplaintDetail;
