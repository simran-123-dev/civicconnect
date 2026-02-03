import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RaiseIssue = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push({
      id: Date.now(),
      ...form,
      status: "Pending",
    });

    localStorage.setItem("complaints", JSON.stringify(complaints));
    navigate("/my-complaints");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-lg max-w-xl w-full"
      >
        <h2 className="text-3xl font-semibold mb-8 text-[#0A2540]">
          Raise a Civic Issue
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          required
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl border"
        />

        <textarea
          name="description"
          placeholder="Describe the issue"
          required
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl border h-32"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          onChange={handleChange}
          className="w-full mb-6 p-4 rounded-xl border"
        />

        <button className="w-full bg-[#2EC4B6] text-[#0A2540] py-4 rounded-full text-lg font-medium">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default RaiseIssue;
