import { useParams } from "react-router-dom";

const AdminComplaintDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm">

        <h1 className="text-3xl font-semibold text-[#0A2540] mb-6">
          Complaint #{id}
        </h1>

        <p className="text-gray-600 mb-6">
          Issue: <strong>Broken Road</strong> <br />
          Location: Sector 21
        </p>

        {/* STATUS UPDATE */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Update Status
          </label>
          <select className="w-full border rounded-lg px-4 py-2">
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
          />
        </div>

        {/* PROOF */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Upload Proof
          </label>
          <input type="file" />
        </div>

        <button className="bg-[#2EC4B6] text-[#0A2540] px-8 py-3 rounded-full font-medium">
          Save Update
        </button>

      </div>
    </div>
  );
};

export default AdminComplaintDetail;
