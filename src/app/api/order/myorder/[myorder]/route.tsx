import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "../../../../../../utils/checkAuth";
import prisma from "../../../../../../prisma";

export async function GET(request: NextRequest, {params}:any) {
  try {
    const userId: any = await checkAuth();

    const result = await prisma.orders.findFirst({
      where: {
        id: params.myorder,
      },
    });


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
