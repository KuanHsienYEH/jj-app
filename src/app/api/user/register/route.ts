import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { withDB } from "@/lib/middleware";

export const POST = withDB(async (req: NextRequest) => {
  try {
    const { username, pwd } = await req.json();

    console.log("Incoming Request Data:", { username, pwd });

    // ✅ Validate fields
    if (!username || !pwd) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ status: "error", message: "All fields are required." }, { status: 400 });
    }

    // ✅ Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error("❌ Username already exists:", username);
      return NextResponse.json({ status: "error", message: "Username already exists." }, { status: 400 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(pwd, 10);
    console.log("✅ Password hashed successfully");

    // ✅ Store `password` instead of `pwd`
    const newUser = await User.create({ username, password: hashedPassword });
    console.log("✅ User created successfully:", newUser);

    return NextResponse.json(
      { status: "success", message: "User registered successfully.", user: { _id: newUser._id, username: newUser.username } },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration Failed:", error);
    return NextResponse.json(
      { status: "error", message: "Registration failed." },
      { status: 500 }
    );
  }
});
