import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { History, LogOut } from "lucide-react";

export default function Navbar() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-primary  backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <h1
            className="font-bold text-2xl tracking-tight cursor-pointer text-white hover:opacity-80 transition"
            onClick={() => navigate("/")}
          >
            ScanApp
          </h1>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/history")}
              className="flex items-center gap-1 text-xl font-medium text-white hover:text-bg transition"
            >
              <History size={16} />
              History
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1 text-xl font-medium text-white hover:text-red-600 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
