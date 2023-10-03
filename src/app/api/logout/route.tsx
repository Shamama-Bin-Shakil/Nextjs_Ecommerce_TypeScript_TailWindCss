import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function POST(request: NextRequest) {
  request.cookies;

  cookies().delete({
    name: "token",
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ success: true, message: "logout successfully" });
}
