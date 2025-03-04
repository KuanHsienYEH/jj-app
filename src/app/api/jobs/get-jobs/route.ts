import { NextResponse } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { getJobs } from "../../../../controllers/jobsController";
import { ApiResponse } from "../../../../types/api";

export const GET = withDB(withMethod(["GET"], async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const number = url.searchParams.get("number");
    console.log("Fetching jobs with number:", number);
    const response = await getJobs(number || undefined);
    console.log("Response from getJobs:", response);
    return NextResponse.json(response, {
      status: response.status === "error" ? 400 : 200,
    });
  } catch (error) {
    console.error("Error in GET /api/jobs/get-jobs:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}));