import { NextResponse, NextRequest } from "next/server";
import { withDB, withMethod } from "../../../../lib/middleware";
import { getNews } from "../../../../controllers/newsController";
import { NewsApiResponse } from "../../../../types/api";

export const GET = withDB(
  withMethod(["GET"], async (req: NextRequest) => {
    try {
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const limit = parseInt(url.searchParams.get("limit") || "10", 10);
      const keyword = url.searchParams.get("keyword") || "";

      if (page < 1 || limit < 1) {
        return NextResponse.json(
          { status: "error", message: "Invalid pagination parameters" },
          { status: 400 }
        );
      }

      const response: NewsApiResponse = await getNews(page, limit, keyword);

      if (!response || response.status !== "success" || !response.data) {
        return NextResponse.json(
          { status: "error", message: "Failed to fetch news" },
          { status: 500 }
        );
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("Error in GET /api/news/get-news:", error);
      return NextResponse.json(
        { status: "error", message: "Internal server error" },
        { status: 500 }
      );
    }
  })
);