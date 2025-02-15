"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [validToken, setValidToken] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      const validateToken = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/validate-token?token=${token}`);
          const data = await response.json();
          if (data.valid) {
            setValidToken(true);
          } else {
            setValidToken(false);
            setError("Invalid or expired token.");
          }
        } catch {
          setError("Something went wrong. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      validateToken();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/login");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (validToken === null) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-a0">
      <div className="w-full max-w-md rounded-xl bg-surface-a0 p-8 shadow-xl border border-surface-a10">
        <h1 className="text-2xl font-bold text-center mb-4 text-transparent bg-gradient-to-r from-primary-a0 via-primary-a30 to-primary-a50 bg-clip-text drop-shadow-lg">
          Reset Your Password
        </h1>

        {validToken === false && <p className="text-sm text-center text-red-500 mb-4">{error}</p>}

        {validToken === true && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="w-full px-4 py-2 rounded-lg border bg-surface-a20 text-light-a0 border-surface-a10 focus:border-primary-a50 focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 rounded-lg border bg-surface-a20 text-light-a0 border-surface-a10 focus:border-primary-a50 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-4">
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}

        {validToken === false && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => router.push("/forgot-password")}
              variant="secondary"
              className="w-full"
            >
              Back to Forgot Password
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
