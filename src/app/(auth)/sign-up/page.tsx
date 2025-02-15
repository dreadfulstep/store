"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight, User, Mail, Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateAndProceed = () => {
    setError("");

    if (step === 1 && !fullName.trim()) {
      setError("Please enter your full name.");
      fullNameRef.current?.focus();
      return;
    }
    if (step === 2 && !email.trim()) {
      setError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    if (step === 3 && password.length < 6) {
      setError("Password must be at least 6 characters long.");
      passwordRef.current?.focus();
      return;
    }

    if (step === 1) {
      setStep(2);
      setTimeout(() => emailRef.current?.focus(), 50);
    } else if (step === 2) {
      setStep(3);
      setTimeout(() => passwordRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      validateAndProceed();
    } else if (e.shiftKey && e.key === "Enter") {
      if (step > 1) setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-a0 relative">
      <Button
        onClick={() => router.push("/")}
        variant="link"
        className="absolute top-6 left-6 flex items-center gap-2 !text-gray-300 hover:!text-white transition !no-underline"
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </Button>

      <motion.div
        className="w-full max-w-md rounded-xl bg-surface-a10/20 border border-primary-a10/20 p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6 h-2 w-full rounded-full bg-surface-a30/20">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-a0/60 to-primary-a50"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-a0 via-primary-a30 to-primary-a50 bg-clip-text text-transparent drop-shadow-lg mb-4 text-center">
          Create Account
        </h1>

        {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}

        <div className="space-y-4">
          {step === 1 && (
            <motion.div>
              <p className="text-sm text-gray-400 mb-1">Full Name</p>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  ref={fullNameRef}
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-a20/60 bg-surface-a0 text-light-a0 focus:border-primary-a40 focus:outline-none"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div>
              <p className="text-sm text-gray-400 mb-1">Email Address</p>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-a20/60 bg-surface-a0 text-light-a0 focus:border-primary-a40 focus:outline-none"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div>
              <p className="text-sm text-gray-400 mb-1">Password</p>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-a20/60 bg-surface-a0 text-light-a0 focus:border-primary-a40 focus:outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </div>

        <Button
          onClick={validateAndProceed}
          variant="primary"
          className="mt-4 w-full"
        >
          {step < 3 ? <>Continue <ArrowRight size={18} /></> : "Create Account"}
        </Button>

        <div className="my-6 flex items-center gap-2">
          <div className="h-[1px] flex-grow bg-gray-600" />
          <p className="text-gray-400">or</p>
          <div className="h-[1px] flex-grow bg-gray-600" />
        </div>

        <Button
          onClick={() => console.log("github")}
          variant="secondary"
          className="flex w-full items-center justify-center gap-2"
        >
          <Github size={18} /> Sign up with GitHub
        </Button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Button variant="link" href="/login">
            Sign in
          </Button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
