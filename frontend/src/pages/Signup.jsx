import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signup({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-bg rounded-2xl shadow-xl p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Join us in just a few seconds
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mt-6 relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="mt-4 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
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
            value={password}
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
          {loading ? "Creating account..." : "Sign Up"}
        </button>



        {/* Footer */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

           <p className="text-center font-medium mt-2"> Please Give Server 60s to spin up.</p>
      </div>
    </div>
  );
}
