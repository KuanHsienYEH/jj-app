import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateAuthToken } from "@/lib/authService";
import User from "@/models/User";
import { withDB } from "@/lib/middleware";

export const POST = withDB(async (req: NextRequest) => {
  try {
    const { username, pwd } = await req.json();

    // ✅ Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ status: "error", message: "Invalid username or password." }, { status: 400 });
    }

    // ✅ Compare hashed password
    const isPasswordValid = await bcrypt.compare(pwd, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ status: "error", message: "Invalid username or password." }, { status: 400 });
    }

    // ✅ Generate JWT token
    const token = generateAuthToken({ userId: user._id, username: user.username });

    return NextResponse.json({ status: "success", message: "Login successful.", data: { token } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Login failed. Please try again." }, { status: 500 });
  }
});
