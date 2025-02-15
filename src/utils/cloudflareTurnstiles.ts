import fetch from 'node-fetch';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Function to verify the Turnstile token
 * @param token The token from the client-side Turnstile widget
 * @param secret The secret key from your Cloudflare Turnstile dashboard
 * @returns {Promise<boolean>} Returns a boolean indicating if the token verification is successful
 */
export const verifyTurnstileToken = async (token: string, secret: string): Promise<boolean> => {
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  interface TurnstileResponse {
    success: boolean;
    'error-codes'?: string[];
  }

  const data: TurnstileResponse = await response.json() as TurnstileResponse;

  if (data.success) {
    return true;
  } else {
    console.error('Turnstile verification failed:', data['error-codes']);
    return false;
  }
};

/**
 * Utility function to get the secret from environment variables
 * @returns {string} The secret key for Cloudflare Turnstile
 */
export const getTurnstileSecret = (): string => {
  const secret = process.env.CLOUDFLARE_SECRET_KEY;

  if (!secret) {
    throw new Error('Cloudflare Turnstile secret key not found in environment variables');
  }

  return secret;
};
