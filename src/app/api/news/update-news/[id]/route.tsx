import { NextRequest, NextResponse } from "next/server";
import { withDB, withMethod } from "@/lib/middleware";
import { authMiddleware } from "@/lib/authMiddleware";
import { updateNews } from "@/controllers/newsController";

export const PUT = withDB(
  withMethod(["PUT"], authMiddleware(async (req: NextRequest) => {
    try {
      const urlParts = req.nextUrl.pathname.split("/");
      const id = urlParts[urlParts.length - 1];
      
      if (!id) {
        return NextResponse.json({ status: "error", message: "新聞 ID 是必要的" }, { status: 400 });
      }
      
      // ✅ 解析 FormData
      const formData = await req.formData();
      const newsData = JSON.parse(formData.get("data") as string);
      const newImageFile = formData.get("file") as File | null; // ✅ 取得新圖片

      if (!newsData.title || !newsData.content) {
        return NextResponse.json({ status: "error", message: "缺少標題或內容" }, { status: 400 });
      }

      // ✅ **更新新聞**
      const response = await updateNews({ _id: id, ...newsData, newImageFile });

      if (response.status === "error") {
        return NextResponse.json(response, { status: 400 });
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("❌ 更新 API 錯誤:", error);
      return NextResponse.json(
        { status: "error", message: "內部伺服器錯誤", error: (error as Error).message },
        { status: 500 }
      )
    }
  }))
);
