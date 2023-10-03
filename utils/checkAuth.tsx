import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../prisma/index";

export const checkAuth = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token === null) {
    return NextResponse.json({ succes: false, message: "Access Denied" });
  }

  const data = jwt.verify(token!, process.env.JWT_SECRET_KEY!);

  const userDetail = await prisma.users.findFirst({
    where: { id: String(data) },
    select: {
      email: true,
      name: true,
      avatar: true,
      createAt: true,
      id: true,
      resetPasswordToken: true,
      resetPasswordExpire: true,
    },
  });

  return userDetail;
};
