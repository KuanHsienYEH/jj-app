import { NextRequest, NextResponse } from "next/server";
import { withDB, withMethod } from "@/lib/middleware";
import { authMiddleware } from "@/lib/authMiddleware";
import { deleteNews, getNewsById } from "@/controllers/newsController";

export const DELETE = withDB(
  withMethod(["DELETE"], authMiddleware(async (req: NextRequest) => {
    try {
      // ✅ 從 `req.nextUrl.pathname` 取得 ID
      const urlParts = req.nextUrl.pathname.split("/");
      const id = urlParts[urlParts.length - 1]; // 取得動態路由中的 `id`

      if (!id) {
        return NextResponse.json({ status: "error", message: "新聞 ID 是必要的" }, { status: 400 });
      }

      console.log(`🟢 嘗試刪除新聞 ID: ${id}`);

      // ✅ **先確認新聞是否存在**
      const news = await getNewsById(id);
      if (!news || news.status === "error") {
        console.error(`❌ 找不到新聞: ${id}`);
        return NextResponse.json({ status: "error", message: "News not found" }, { status: 404 });
      }

      // ✅ **刪除新聞**
      const response = await deleteNews(id);
      if (response.status === "error") {
        return NextResponse.json(response, { status: 400 });
      }

      console.log(`✅ 新聞刪除成功: ${id}`);

      return NextResponse.json({ status: "success", message: "新聞刪除成功" }, { status: 200 });
    } catch (error) {
      console.error("❌ DELETE /api/news/delete-news/[id] 發生錯誤:", error);
      return NextResponse.json({ status: "error", message: "內部伺服器錯誤" }, { status: 500 });
    }
  }))
);
