export const getComplaints = () => {
  return JSON.parse(localStorage.getItem("complaints")) || [];
};

export const saveComplaint = (complaint) => {
  const complaints = getComplaints();
  complaints.push(complaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));
};

export const updateComplaintStatus = (id, status) => {
  const complaints = getComplaints().map((c) =>
    c.id === id ? { ...c, status } : c
  );
  localStorage.setItem("complaints", JSON.stringify(complaints));
};
