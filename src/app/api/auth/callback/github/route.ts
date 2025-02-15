import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code found in request" }, { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID!;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET!;
  const redirectUri = "http://localhost:3000/api/auth/callback/github";

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
  }

  const accessToken = tokenData.access_token;

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);

  response.cookies.set("github_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
