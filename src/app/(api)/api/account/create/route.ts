import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function POST(req: NextRequest) {
  const { fullName, email, password, turnstileToken } = await req.json();
  console.log(fullName, email, password);

  if (!turnstileToken) {
    return NextResponse.json({ message: 'Turnstile token is required.' }, { status: 400 });
  }

  const ip = req.headers.get('CF-Connecting-IP') || req.headers.get('ip');

  const secret = process.env.CLOUDFLARE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ message: 'Turnstile secret key is missing.' }, { status: 500 });
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secret as string,
        response: turnstileToken,
        ...(ip && { remoteip: ip }),
      }),
    });

    const data = await response.json() as { success: boolean, 'error-codes'?: string[] };

    if (!data.success) {
      return NextResponse.json({ message: 'Turnstile verification failed.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    // MY LOGIC HERE TO ADD TO DB

    return NextResponse.json({ message: 'Account created successfully!' }, { status: 200 });

    } catch (dbError) {
      console.error('Error inserting into DB:', dbError);
      return NextResponse.json({ message: 'Database error occurred.' }, { status: 500 });
    } finally {
    }
}
