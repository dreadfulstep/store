'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: email,
        resetLink: `https://example.com/reset-password?token=exampleToken`,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('If that email exists in our system, a reset link will be sent shortly.');
    } else {
      setMessage(data.message || 'Something went wrong');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-a0">
      <div className="w-full max-w-md rounded-xl bg-surface-a0 p-8 shadow-xl border border-surface-a10">
        <h1 className="text-2xl font-bold text-center mb-4 text-transparent bg-gradient-to-r from-primary-a0 via-primary-a30 to-primary-a50 bg-clip-text drop-shadow-lg">
          Forgot Your Password?
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">Enter your email address to reset your password.</p>

        {message && <p className="text-sm text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border bg-surface-a20 text-light-a0 border-surface-a10 focus:border-primary-a50 focus:outline-none"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-4 w-full"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Remember your password?
          <div className="w-full flex justify-center">
            <Button variant="link" href="/login" >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
