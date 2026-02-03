import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ ROLE INIT DIRECT FROM localStorage
  const [role, setRole] = useState(
    localStorage.getItem("role") || "user"
  );

  const switchToAdmin = () => {
    localStorage.setItem("role", "admin");
    setRole("admin");
    navigate("/admin");
  };

  const logout = () => {
    localStorage.setItem("role", "user");
    setRole("user");
    navigate("/");
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
          {role === "user" && (
            <>
              {[
                { to: "/", label: "home" },
                { to: "/raise", label: "report issue" },
                { to: "/map", label: "map view" },
                { to: "/my-complaints", label: "my complaints" },
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

          {role === "admin" && (
            <>
              {[
                { to: "/admin", label: "dashboard" },
                { to: "/admin/complaints", label: "complaints" },
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
        {role === "user" ? (
          <button
            onClick={switchToAdmin}
            className="bg-white text-[#2EC4B6] px-7 py-3 rounded-full text-lg font-semibold"
          >
            admin login
          </button>
        ) : (
          <button
            onClick={logout}
            className="bg-white text-[#0A2540] px-7 py-3 rounded-full text-lg font-semibold"
          >
            logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
