import { NextRequest, NextResponse } from "next/server";
import { withDB, withMethod } from "@/lib/middleware";
import { authMiddleware } from "@/lib/authMiddleware";
import { addNews } from "@/controllers/newsController";

export const POST = withDB(
  withMethod(["POST"], authMiddleware(async (req: NextRequest) => {
    try {
      
      // ✅ 解析 FormData
      const formData = await req.formData();
      const newsData = JSON.parse(formData.get("data") as string);

      if (!newsData.title || !newsData.content) {
        return NextResponse.json({ status: "error", message: "缺少標題或內容" }, { status: 400 });
      }

      // ✅ **新增新聞**
      const response = await addNews({ ...newsData });

      if (response.status === "error") {
        return NextResponse.json(response, { status: 400 });
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("❌ 更新 API 錯誤:", error);
      return NextResponse.json({ status: "error", message: "內部伺服器錯誤", error: error.message }, { status: 500 });
    }
  }))
);
