import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");  

    if (token === "valid-token") {
        return NextResponse.json({ valid: true }, { status: 200 });
    } else {
        return NextResponse.json({ valid: false }, { status: 400 });
    }
}