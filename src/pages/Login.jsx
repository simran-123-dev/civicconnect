import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-sm">

        <h2 className="text-3xl font-semibold text-[#0A2540] mb-2">
          Welcome back
        </h2>
        <p className="text-gray-500 mb-8">
          Login to report and track civic issues
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="user@email.com"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        {/* USER LOGIN */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#2EC4B6] text-[#0A2540] py-3 rounded-full font-medium mb-4 hover:opacity-90"
        >
          Login as User
        </button>

        {/* ADMIN LOGIN */}
        <button
          onClick={() => navigate("/admin")}
          className="w-full border border-[#0A2540] text-[#0A2540] py-3 rounded-full font-medium hover:bg-gray-50"
        >
          Login as Admin
        </button>

      </div>
    </div>
  );
};

export default Login;
