import { NextResponse } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { authMiddleware } from "../../../../lib/auth";
import { addJob } from "../../../../controllers/jobsController";
import { ApiResponse } from "../../../../types/api";

export const POST = withDB(withMethod(["POST"], authMiddleware(async (req: NextRequest) => {
  const jobData = await req.json() as {
    jobTitle: string;
    location: string;
    salary: string;
    requirement: string;
    benefit: string;
    jobDetail: string;
    jobType: string;
    createDate: string;
    education: string;
    seniority: string;
  };
  const response = await addJob(jobData);
  return NextResponse.json(response, {
    status: response.status === "error" ? 400 : 200,
  });
})));