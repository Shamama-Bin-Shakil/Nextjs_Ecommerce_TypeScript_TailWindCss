import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "../../../../../utils/checkAuth";
import prisma from "../../../../../prisma";

export async function GET(request: NextRequest) {
  try {
    const userId: any = await checkAuth();

    const result = await prisma.orders.findMany({
      where: {
        userId: userId.id,
      },
    });

    console.log(result);

    return NextResponse.json({
      success: true,
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
