import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtSend } from "../../../../utils/jwtSend";
import { checkAuth } from "../../../../utils/checkAuth";
import prisma from "../../../../prisma";

// export type SendRegisterData = {
//   email: string;
//   password: string;
// };

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    const userId: any = await checkAuth();

    console.log(req);

    const result = await prisma.orders.create({
      data: {
        userId: userId.id,
        shippingInfo: {
          address: req.address,
          city: req.city,
          province: req.province,
          street: req.street,
        },
        OrderItems: req.product,
        paymentMethod: req.paymentMethod,
        paymentStatus: req.paymentStatus,
        totalPrice: req.subTotal,
      },
    });

    // console.log(result);

    return NextResponse.json({
      success: true,
      message: "Order Place Successfully",
      order: result,
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
