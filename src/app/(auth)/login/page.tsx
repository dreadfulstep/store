"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Lock, ArrowLeft, Github, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/Button";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    console.log("Logging in with:", { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkAutoFill = () => {
      if (passwordInputRef.current?.value) {
        setPassword(passwordInputRef.current?.value);
      }
    };

    const timer = setTimeout(checkAutoFill, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-a0">
      <Button
        onClick={() => router.push("/")}
        variant="link"
        className="absolute top-6 left-6 flex items-center gap-2 !text-gray-300 hover:!text-white transition !no-underline"
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </Button>
      <div className="w-full max-w-md rounded-xl bg-surface-a0 p-8 shadow-xl border border-surface-a10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-a0 via-primary-a30 to-primary-a50 bg-clip-text text-transparent drop-shadow-lg mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">Sign in to your account to continue</p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-surface-a20 text-light-a0 border-surface-a10 focus:border-primary-a50 focus:outline-none"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <motion.input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full pl-10 pr-12 py-2 rounded-lg border bg-surface-a20 text-gray-400 border-surface-a10 focus:border-primary-a50 focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "#6d7280",
                }}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary-a50" defaultChecked /> Remember me?
            </label>
            <Button variant="link" href="/forgot-password">
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-4 w-full"
          >
            Sign In →
          </Button>
        </form>

        <div className="my-6 flex items-center gap-2">
          <div className="h-[1px] flex-grow bg-surface-a30" />
          <p className="text-gray-400">Or continue with</p>
          <div className="h-[1px] flex-grow bg-surface-a30" />
        </div>

        <Button
          onClick={() => console.log("GitHub login")}
          variant="secondary"
          className="flex w-full items-center justify-center gap-2"
        >
          <Github size={18} /> Continue with GitHub
        </Button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Button variant="link" href="/sign-up">
            Sign up
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
