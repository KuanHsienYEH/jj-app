import { NextResponse } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { authMiddleware } from "../../../../lib/auth";
import { updateJob } from "../../../../controllers/jobsController";
import { ApiResponse } from "../../../../types/api";

export const PATCH = withDB(withMethod(["PATCH"], authMiddleware(async (req: NextRequest) => {
  const jobData = await req.json() as {
    _id: string;
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
  const response = await updateJob(jobData);
  return NextResponse.json(response, {
    status: response.status === "error" ? (response.message === "Job not found" ? 404 : 400) : 200,
  });
})));