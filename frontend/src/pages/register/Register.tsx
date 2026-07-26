import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, User, Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { registerUser } from "../../services/authService.js";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [backendError, setBackendError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation error when user types
    if (validationErrors[e.target.name as keyof typeof validationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: undefined,
      });
    }
    if (backendError) setBackendError(null);
  };

  const validate = () => {
    const errors: { name?: string; email?: string; password?: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      await registerUser(formData);
      // On success, redirect to login page
      navigate("/login");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setBackendError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-sky-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-300/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-300/40 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(216,180,248,0.4)] border border-white/80"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-400 via-pink-300 to-sky-200 flex items-center justify-center shadow-md border border-white/80 group-hover:scale-105 transition-transform">
              <span className="text-purple-950 font-bold text-xl select-none">✦</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-950 via-slate-800 to-purple-900 bg-clip-text text-transparent">
              SwipeShop
            </span>
          </Link>
          <h2 className="text-2xl font-black text-purple-950 tracking-tight">Create Account</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Join the AI-powered shopping discovery network
          </p>
        </div>

        {/* Backend Error Banner */}
        {backendError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-xs font-semibold"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{backendError}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full pl-10 pr-4 py-2.5 bg-white/80 border text-xs font-semibold rounded-2xl outline-none transition-all ${
                  validationErrors.name
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-purple-200/80 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                }`}
              />
            </div>
            {validationErrors.name && (
              <p className="text-[11px] font-semibold text-rose-500 mt-1 ml-1">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-white/80 border text-xs font-semibold rounded-2xl outline-none transition-all ${
                  validationErrors.email
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-purple-200/80 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                }`}
              />
            </div>
            {validationErrors.email && (
              <p className="text-[11px] font-semibold text-rose-500 mt-1 ml-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 bg-white/80 border text-xs font-semibold rounded-2xl outline-none transition-all ${
                  validationErrors.password
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-purple-200/80 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                }`}
              />
            </div>
            {validationErrors.password && (
              <p className="text-[11px] font-semibold text-rose-500 mt-1 ml-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Sign Up Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 pt-4 border-t border-purple-100">
          <p className="text-xs font-semibold text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-700 font-extrabold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
