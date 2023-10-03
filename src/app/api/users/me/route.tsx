import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "../../../../../utils/checkAuth";

export async function GET(request: NextRequest) {
  try {
    const isCheck = await checkAuth();

    if (!isCheck) {
      return NextResponse.json({ success: false, msg: "Error" });
    }

    return NextResponse.json({
      success: true,
      msg: "User Detail Send",
      data: isCheck,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
}
