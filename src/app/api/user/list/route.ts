import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { withDB } from "@/lib/middleware";
import { authMiddleware } from "@/lib/authMiddleware"; // Ensure only authenticated users can access

export const GET = withDB(authMiddleware(async (_req: NextRequest) => {
  try {
    const users = await User.find();
    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to fetch users" }, { status: 500 });
  }
}));
