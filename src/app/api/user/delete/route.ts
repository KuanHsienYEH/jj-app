import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { withDB } from "@/lib/middleware";

export const DELETE = withDB(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ status: "error", message: "User ID is required." }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json({ status: "error", message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ status: "success", message: "User deleted successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to delete user." }, { status: 500 });
  }
});
