import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/authService";

export async function GET(req: NextRequest) {
  try {
    // ✅ 從 Cookie 取得 Token
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ status: "error", message: "Not authenticated" }, { status: 401 });
    }

    // ✅ 驗證 Token
    const user = verifyAuthToken(token);
    if (!user) {
      return NextResponse.json({ status: "error", message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Authentication failed" }, { status: 500 });
  }
}
