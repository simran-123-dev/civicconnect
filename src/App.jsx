import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import RaiseIssue from "./pages/RaiseIssue";
import MapDashboard from "./pages/MapDashboard";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminComplaintDetail from "./pages/AdminComplaintDetail";
import ComplaintDetail from "./pages/ComplaintDetail";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/raise" element={<RaiseIssue />} />
        <Route path="/map" element={<MapDashboard />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminComplaintDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/complaints/:id" element={<ComplaintDetail />} />
      </Routes>
    </div>
  );
}

export default App;
