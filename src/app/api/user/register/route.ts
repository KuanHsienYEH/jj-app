import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { withDB } from "@/lib/middleware";

export const POST = withDB(async (req: NextRequest) => {
  try {
    const { username, pwd, confirmPassword } = await req.json();

    // ✅ Validate fields
    if (!username || !pwd || !confirmPassword) {
      return NextResponse.json({ status: "error", message: "All fields are required." }, { status: 400 });
    }

    // ✅ Check if passwords match
    if (pwd !== confirmPassword) {
      return NextResponse.json({ status: "error", message: "Passwords do not match." }, { status: 400 });
    }

    // ✅ Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ status: "error", message: "Username already exists." }, { status: 400 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // ✅ Create user and return full user object
    const newUser = await User.create({ username, password: hashedPassword });

    return NextResponse.json({ status: "success", message: "User registered successfully.", user: { _id: newUser._id, username: newUser.username } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Registration failed." }, { status: 500 });
  }
});
