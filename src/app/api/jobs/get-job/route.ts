import { NextResponse } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { getJobs } from "../../../../controllers/jobsController";
import { JobApiResponse } from "../../../../types/api";
import { NextRequest } from "next/server";

export const GET = withDB(withMethod(["GET"], async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const keyword = url.searchParams.get("keyword") || "";

    console.log(`Fetching jobs - Page: ${page}, Limit: ${limit}, Keyword: ${keyword}`);

    // 確保 page 和 limit 合法
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { status: "error", message: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    // 呼叫 getJobs 並傳入 page、limit 和 keyword
    const response: JobApiResponse = await getJobs(page, limit, keyword);

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
