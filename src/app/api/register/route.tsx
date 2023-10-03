import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
import cloudinary from "cloudinary";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtSend } from "../../../../utils/jwtSend";

export type SendRegisterData = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export async function POST(request: NextRequest) {
  try {
    const req: SendRegisterData = await request.json();

    const salt: string = bcrypt.genSaltSync(10);
    const hash: string = await bcrypt.hash(req.password, salt);

    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
      secure: true,
    });

    const uploadDetail = await cloudinary.v2.uploader.upload(req.avatar, {
      folder: "NewEcommerce",
    });

    const data = await prisma.users.create({
      data: {
        name: req.name,
        email: req.email,
        password: hash,
        createAt: new Date(),
        avatar: {
          public_id: uploadDetail.public_id,
          url: uploadDetail.url,
        },
      },
    });

    const token = jwtSend(data.id);

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
    });

    data.password = "";

    return NextResponse.json({
      success: true,
      message: "Account Create Successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "INTERNAL SERVER ERROR",
      error: error,
    });
  }
}
