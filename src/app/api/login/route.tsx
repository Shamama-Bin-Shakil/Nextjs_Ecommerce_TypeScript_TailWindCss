import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
import cloudinary from "cloudinary";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtSend } from "../../../../utils/jwtSend";
import { checkAuth } from "../../../../utils/checkAuth";

export type SendRegisterData = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest, response: NextResponse) {
  
  const req: SendRegisterData = await request.json();

  const data = await prisma.users.findFirst({
    where: { email: req.email },
  });
  if (!data) {
    return NextResponse.json({
      success: false,
      message: "Invalid crediential",
    });
  }

  const isPasswordMatch = await bcrypt.compare(req.password, data?.password!);
  if (!isPasswordMatch) {
    return NextResponse.json({
      success: false,
      message: "Invalid crediential",
    });
  }

  const token = jwtSend(data?.id);

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });

  data.password = "";

  return NextResponse.json({
    success: true,
    message: "Login Successfully",
    data: data, 
    token,
  });
}
