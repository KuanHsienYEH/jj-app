import { NextRequest, NextResponse } from "next/server";
import { withDB, withMethod } from "@/lib/middleware";
import { authMiddleware } from "@/lib/authMiddleware";
import { updateJob } from "@/controllers/jobsController";

export const PUT = authMiddleware(withDB(withMethod(["PUT"], async (req: NextRequest) => {
  try {
    // ✅ 確保 `id` 來自 URL，而不是 `req.json()`
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json({ status: "error", message: "職缺 ID 是必要的" }, { status: 400 });
    }

    const jobData = await req.json();
    if (!jobData.jobTitle || !jobData.jobDetail) {
      return NextResponse.json({ status: "error", message: "缺少必要的職缺資訊" }, { status: 400 });
    }

    // ✅ 傳遞 `_id`
    const response = await updateJob({ _id: id, ...jobData });

    return NextResponse.json(response, {
      status: response.status === "error" ? (response.message === "Job not found" ? 404 : 400) : 200,
    });
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("❌ 更新 API 錯誤:", error);
    return NextResponse.json(
      { status: "error", message: "內部伺服器錯誤", error: errorMessage },
      { status: 500 }
    );
  }
})));
