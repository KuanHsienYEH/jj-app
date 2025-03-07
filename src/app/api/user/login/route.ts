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
    console.log("🔍 查詢到的使用者: ", user);

    if (!user) {
      console.error("❌ 使用者不存在");
      return NextResponse.json({ status: "error", message: "Invalid username or password." }, { status: 400 });
    }

    // ✅ 比對密碼
    console.log("🔍 比對密碼中...");
    const isPasswordValid = await bcrypt.compare(pwd, user.password);
    console.log("✅ 密碼比對結果: ", isPasswordValid);

    if (!isPasswordValid) {
      console.error("❌ 密碼錯誤");
      return NextResponse.json({ status: "error", message: "Invalid username or password." }, { status: 400 });
    }

    // ✅ 產生 JWT Token
    console.log("🔍 產生 JWT Token...");
    const token = generateAuthToken({ userId: user._id.toString(), username: user.username });
    console.log("✅ 產生的 Token: ", token);

    return NextResponse.json({ status: "success", message: "Login successful.", data: { token } }, { status: 200 });
  } catch (error) {
    console.error("❌ 登入失敗:", error);
    return NextResponse.json({ status: "error", message: "Login failed. Please try again." }, { status: 500 });
  }
});
