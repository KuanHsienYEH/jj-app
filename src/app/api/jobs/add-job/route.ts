import { NextResponse, NextRequest } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { authMiddleware } from "../../../../lib/authMiddleware";
import { addJob } from "../../../../controllers/jobsController";
import { ApiResponse } from "../../../../types/api";
export const POST = withDB(
  withMethod(["POST"], authMiddleware(async (req: NextRequest) => {
    try {
      const jobData = await req.json();
      console.log("接收到的資料:", jobData); // 添加日誌

      const requiredFields = [
        "jobTitle",
        "location",
        "salary",
        "requirement",
        "jobDetail",
        "jobType",
        "education",
        "seniority",
      ];
      const missingFields = requiredFields.filter((field) => !jobData[field]);

      if (missingFields.length > 0) {
        console.log("缺少的欄位:", missingFields); // 添加日誌
        return NextResponse.json(
          { status: "error", message: `Missing required fields: ${missingFields.join(", ")}` },
          { status: 400 }
        );
      }

      const newJobData = {
        ...jobData,
        createDate: new Date(jobData.createDate || Date.now()).toISOString(),
      };

      const response: ApiResponse = await addJob(newJobData);

      if (response.status === "error") {
        console.log("addJob 返回的錯誤:", response); // 添加日誌
        return NextResponse.json(response, { status: 400 });
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("❌ Error in POST /api/jobs/add-job:", error);
      return NextResponse.json(
        { status: "error", message: "Internal server error" },
        { status: 500 }
      );
    }
  }))
);