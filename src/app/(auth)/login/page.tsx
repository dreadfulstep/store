"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { Github, ArrowRight, User, Mail, Lock } from "lucide-react";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const generateUsername = (name: string) => {
    return name.toLowerCase().replace(/\s/g, "") + nanoid(4);
  };

  const nextStep = () => {
    if (step === 1 && fullName) {
      setUsername(generateUsername(fullName));
      setStep(2);
    } else if (step === 2 && email) {
      setStep(3);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-a0">
      <motion.div
        className="w-full max-w-md rounded-xl bg-surface-a10/20 border border-primary-a10/20 p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Progress Bar */}
        <div className="mb-6 h-2 w-full rounded-full bg-surface-a30/20">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-a0/60 to-primary-a50"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-a0 via-primary-a30 to-primary-a50 bg-clip-text text-transparent drop-shadow-lg mb-4 text-center">
          Create Account
        </h1>

        {/* Input Fields */}
        <div className="space-y-4">
          {step === 1 && (
            <motion.div>
              <p className="text-sm text-gray-400 mb-1">Full Name</p>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-a20/60 bg-surface-a0 text-light-a0 focus:border-primary-a40 focus:outline-none"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  type="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-a20/60 bg-surface-a0 text-light-a0 focus:border-primary-a40 focus:outline-none"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-a20/60 bg-surface-a0 text-light-a0 focus:border-primary-a40 focus:outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Next Button */}
        {step < 3 ? (
          <motion.button
            onClick={nextStep}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-a40/5 border border-primary-a10/80 py-2 text-light-a0 transition hover:bg-primary-a50/20"
          >
            Continue <ArrowRight size={18} />
          </motion.button>
        ) : (
          <motion.button
            className="mt-4 w-full rounded-lg bg-primary-a40 py-2 text-light-a0 transition hover:bg-primary-a50"
          >
            Create Account
          </motion.button>
        )}

        {/* Divider */}
        <div className="my-6 flex items-center gap-2">
          <div className="h-[1px] flex-grow bg-gray-600" />
          <p className="text-gray-400">or</p>
          <div className="h-[1px] flex-grow bg-gray-600" />
        </div>

        {/* GitHub Auth */}
        <motion.button
          onClick={() => console.log("github")}
          className="flex w-full items-center border border-primary-a10/60 justify-center gap-2 rounded-lg bg-surfaceTonal-a50/15 py-2 text-light-a0 transition hover:bg-surfaceTonal-a50/30"
        >
          <Github size={18} /> Sign up with GitHub
        </motion.button>

        {/* Already have an account? */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-primary-a40 hover:text-primary-a50 font-medium">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
