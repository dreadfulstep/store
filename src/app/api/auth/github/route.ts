import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const redirectUri = process.env.REDIRECT_URL || "http://localhost:3000/api/auth/callback/github";
  const clientId = process.env.GITHUB_CLIENT_ID!;
  const scope = "repo user";

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return NextResponse.redirect(githubAuthUrl);
}
