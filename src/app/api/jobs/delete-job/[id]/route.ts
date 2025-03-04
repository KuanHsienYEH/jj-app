import { NextResponse } from "next/server";
import { withDB, withMethod } from "../../../../../lib/middleware";
import { authMiddleware } from "../../../../../lib/auth";
import { deleteJob } from "../../../../../controllers/jobsController";
import { ApiResponse } from "../../../../../types/api";

export const DELETE = withDB(withMethod(["DELETE"], authMiddleware(async (req: NextRequest, { params }: { params: { id: string } }) => {
  const response = await deleteJob(params.id);
  return NextResponse.json(response, {
    status: response.status === "error" ? (response.message === "Job not found" ? 404 : 400) : 200,
  });
})));