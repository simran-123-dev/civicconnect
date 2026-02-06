export const getComplaints = () => {
  return JSON.parse(localStorage.getItem("complaints")) || [];
};

export const getMyComplaints = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return [];
  const allComplaints = getComplaints();
  return allComplaints.filter((c) => c.userId === userId);
};

export const getComplaintById = (id) => {
  return getComplaints().find((c) => String(c.id) === String(id));
};

export const saveComplaint = (complaint) => {
  const userId = localStorage.getItem("userId");
  const complaintWithUserId = { ...complaint, userId };
  const complaints = getComplaints();
  complaints.push(complaintWithUserId);
  localStorage.setItem("complaints", JSON.stringify(complaints));
};

export const updateComplaint = (id, updates) => {
  const complaints = getComplaints().map((c) =>
    String(c.id) === String(id) ? { ...c, ...updates, id: c.id } : c
  );
  localStorage.setItem("complaints", JSON.stringify(complaints));
  return complaints;
};

export const updateComplaintStatus = (id, status) => {
  updateComplaint(id, { status });
};
