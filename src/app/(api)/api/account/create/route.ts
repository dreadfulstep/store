import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function POST(req: NextRequest) {
  const { fullName, email, password, turnstileToken } = await req.json();
  console.log(fullName,email,password)
  if (!turnstileToken) {
    return NextResponse.json({ message: "Turnstile token is required." }, { status: 400 });
  }

  const ip = req.headers.get('CF-Connecting-IP') || req.headers.get('ip');

  const secret = process.env.CLOUDFLARE_SECRET_KEY;
  
  if (!secret) {
    return NextResponse.json({ message: "Turnstile secret key is missing." }, { status: 500 });
  }

  // Log the turnstile token to check if it's passed correctly
  console.log("Turnstile Token: ", turnstileToken);

  try {
    // Verify the Turnstile token with Cloudflare
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secret as string,
        response: turnstileToken,
        ...(ip && { remoteip: ip })
      }),
    });

    const data = await response.json() as { success: boolean, 'error-codes'?: string[] };
    console.log("Turnstile Verification Response:", data);

    if (!data.success) {
      // Log error codes to give more context
      console.error("Turnstile verification failed:", data['error-codes']);
      return NextResponse.json({ message: "Turnstile verification failed." }, { status: 400 });
    }

    // Your logic to create the account after successful Turnstile verification
    return NextResponse.json({ message: "Account created successfully!" }, { status: 200 });
    
  } catch (error) {
    console.error("Error during Turnstile verification:", error);
    return NextResponse.json({ message: "Something went wrong during verification." }, { status: 500 });
  }
}
