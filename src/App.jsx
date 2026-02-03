import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

import Home from "./pages/Home";
import RaiseIssue from "./pages/RaiseIssue";
import MapDashboard from "./pages/MapDashboard";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/raise" element={<RaiseIssue />} />
        <Route path="/map" element={<MapDashboard />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
