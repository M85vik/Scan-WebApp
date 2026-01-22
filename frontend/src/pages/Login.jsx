import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await login({ email, password });
      loginUser(res.token);
      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-bg rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Sign in to continue
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mt-6 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="mt-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full bg-primary hover:bg-black text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

     
      </div>
    </div>
  );
}
