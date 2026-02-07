import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, clearToken } from "../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState(
    localStorage.getItem("role") || "user"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  useEffect(() => {
    setRole(localStorage.getItem("role") || "user");
    setIsLoggedIn(!!getToken());
  }, [location.pathname]);

  const handleLogout = () => {
    clearToken();
    localStorage.setItem("role", "user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0A2540] to-[#0F3D5E]">
      <div className="w-full px-12 h-24 flex items-center justify-between">

        {/* BRAND */}
        <span className="text-3xl md:text-4xl font-semibold text-white">
          CivicConnect
        </span>

        {/* NAV TABS */}
        <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full p-1">
          {role === "user" && isLoggedIn && (
            <>
              {[
                { to: "/", label: "Home" },
                { to: "/raise", label: "Report Issue" },
                { to: "/map", label: "Map View" },
                { to: "/my-complaints", label: "My Complaints" },
              ].map((tab) => (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  className={({ isActive }) =>
                    `px-6 py-2.5 rounded-full text-lg ${
                      isActive
                        ? "bg-white text-[#0A2540] font-semibold"
                        : "text-gray-200 hover:text-white"
                    }`
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </>
          )}

          {role === "admin" && isLoggedIn && (
            <>
              {[
                { to: "/admin", label: "Dashboard" },
                { to: "/admin/complaints", label: "Complaints" },
              ].map((tab) => (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  className={({ isActive }) =>
                    `px-6 py-2.5 rounded-full text-lg ${
                      isActive
                        ? "bg-white text-[#0A2540] font-semibold"
                        : "text-gray-200 hover:text-white"
                    }`
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </>
          )}
        </div>

        {/* ACTION BUTTON */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-white text-[#0A2540] px-7 py-3 rounded-full text-lg font-semibold hover:opacity-90"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-white text-[#2EC4B6] px-7 py-3 rounded-full text-lg font-semibold hover:opacity-90 inline-block"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
