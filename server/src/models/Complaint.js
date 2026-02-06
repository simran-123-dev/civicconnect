const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    locationText: { type: String, required: true },
    town: { type: String, required: true },
    coords: {
      type: [Number],
      validate: {
        validator: (value) => !value || value.length === 2,
        message: "coords must be [lat, lng]",
      },
      default: undefined,
    },
    category: { type: String, default: "General" },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    remarks: { type: String, default: "" },
    proofName: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
