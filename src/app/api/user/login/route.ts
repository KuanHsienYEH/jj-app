import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateAuthToken } from "@/lib/authService";
import User from "@/models/User";
import { withDB } from "@/lib/middleware";

export const POST = withDB(async (req: NextRequest) => {
  try {
    const { username, pwd } = await req.json();
    console.log("🟡 收到登入請求: ", { username, pwd });

    // ✅ 檢查使用者是否存在
    const user = await User.findOne({ username });
    if (!user) {
      console.error("❌ 使用者不存在");
      return NextResponse.json({ status: "error", message: "Invalid username or password." }, { status: 400 });
    }

    // ✅ 比對密碼
    const isPasswordValid = await bcrypt.compare(pwd, user.password);
    if (!isPasswordValid) {
      console.error("❌ 密碼錯誤");
      return NextResponse.json({ status: "error", message: "Invalid username or password." }, { status: 400 });
    }

    // ✅ 產生 JWT Token
    const token = generateAuthToken({ userId: user._id.toString(), username: user.username });

    // ✅ 設置 HttpOnly Cookie
    const response = NextResponse.json({ status: "success", message: "Login successful." });

    response.cookies.set("token", token, {
      httpOnly: true, // JavaScript 不能讀取
      secure: process.env.NODE_ENV === "production", // 只在 HTTPS 生效
      sameSite: "strict", // 防止 CSRF
      path: "/", // Cookie 適用於整個網站
      maxAge: 60 * 60 * 24 * 7, // 7 天過期
    });

    return response;
  } catch (error) {
    console.error("❌ 登入失敗:", error);
    return NextResponse.json({ status: "error", message: "Login failed. Please try again." }, { status: 500 });
  }
});
