import { Navigate } from "react-router-dom";
import { getToken } from "../utils/api";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const token = getToken();
  const role = localStorage.getItem("role") || "user";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
