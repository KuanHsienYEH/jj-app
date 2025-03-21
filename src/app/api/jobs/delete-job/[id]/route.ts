import { NextRequest, NextResponse } from "next/server";
import { withDB, withMethod } from "@/lib/middleware";
import { authMiddleware } from "@/lib/authMiddleware";
import { deleteJob } from "@/controllers/jobsController";

export const DELETE = authMiddleware(withDB(withMethod(["DELETE"], async (req: NextRequest) => {
  try {
    // 從 URL 中解析出最後一個片段作為 id
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json({ status: "error", message: "Job ID is required" }, { status: 400 });
    }

    const response = await deleteJob(id);

    return NextResponse.json(response, {
      status: response.status === "error"
        ? (response.message === "Job not found" ? 404 : 400)
        : 200,
    });
  } catch (error: any) {
    console.error("Delete job API error:", error);
    return NextResponse.json({ status: "error", message: "Internal Server Error", error: error.message }, { status: 500 });
  }
})));
