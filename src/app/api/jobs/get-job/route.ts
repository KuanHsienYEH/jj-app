import { NextResponse } from "next/server";
import { withDB, withMethod } from "@/lib/middleware";
import { getJob } from "@/controllers/jobsController";
import { ApiResponse } from "@/types/api";
import { NextRequest } from "next/server";

export const GET = withDB(withMethod(["GET"], async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
     const id = url.searchParams.get("id") || "";

    const response: ApiResponse = await getJob(id);

    // 確保 response 格式正確
    if (!response || response.status !== "success" || !response.data) {
      return NextResponse.json(
        { status: "error", message: "Failed to fetch jobs" },
        { status: 500 }
      );
    }

    console.log("Response from getJobs:", response);

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error("Error in GET /api/jobs/get-jobs:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}));
