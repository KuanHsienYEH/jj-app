import { NextResponse } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { getJob } from "../../../../controllers/jobsController";
import { ApiResponse } from "../../../../types/api";

export const GET = withDB(withMethod(["GET"], async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const response = await getJob(id || "");
  return NextResponse.json(response, {
    status: response.status === "error" ? (response.message === "Job not found" ? 404 : 400) : 200,
  });
}));