import { NextResponse, NextRequest } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { authMiddleware } from "../../../../lib/authMiddleware";
import { addJob } from "../../../../controllers/jobsController";
import { ApiResponse } from "../../../../types/api";

export const POST = withDB(withMethod(["POST"], authMiddleware(async (req: NextRequest) => {
  try {
    const jobData = await req.json();

    // ✅ Validate required fields
    const requiredFields = ["jobTitle", "location", "salary", "requirement", "benefit", "jobDetail", "jobType", "education", "seniority"];
    const missingFields = requiredFields.filter(field => !jobData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { status: "error", message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // ✅ Ensure `createDate` is correctly formatted
    const newJobData = {
      ...jobData,
      createDate: new Date(jobData.createDate || Date.now()).toISOString(),
    };

    // ✅ Call `addJob()` to add job to DB
    const response: ApiResponse = await addJob(newJobData);

    if (response.status === "error") {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error("❌ Error in POST /api/admin/add-job:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
})));
