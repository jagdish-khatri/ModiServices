"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TrendingUp, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Invalid username or password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl mx-auto mb-4"
            style={{ background: "#0d9488" }}
          >
            <TrendingUp className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-white">Modi Services Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage enquiries</p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl bg-white shadow-2xl p-8">
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2"
            >
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" aria-label="Admin login form">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Admin username"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="••••••••"
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ background: "#1e3a8a" }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-5 text-xs text-gray-400 text-center">
            This dashboard is for authorised Modi Services staff only.
          </p>
        </div>
      </div>
    </div>
  );
}
