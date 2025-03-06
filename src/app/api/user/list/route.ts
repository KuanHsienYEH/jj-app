import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { withDB } from "@/lib/middleware";

export const GET = withDB(async (_req: NextRequest) => {
  try {
    const users = await User.find();
    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to fetch users" }, { status: 500 });
  }
});
