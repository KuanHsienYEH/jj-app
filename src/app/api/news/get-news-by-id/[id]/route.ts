import { NextResponse, NextRequest } from "next/server";
import { withDB, withMethod } from "../../../../../lib/middleware";
import { getNewsById } from "../../../../../controllers/newsController";
import { ApiResponse } from "../../../../../types/api";

export const GET = withDB(
  withMethod(["GET"], async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;

      if (!id) {
        return NextResponse.json(
          { status: "error", message: "News ID is required" },
          { status: 400 }
        );
      }

      const response: ApiResponse = await getNewsById(id);

      if (response.status === "error") {
        return NextResponse.json(response, { status: 404 });
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("Error in GET /api/news/get-news-by-id/[id]:", error);
      return NextResponse.json(
        { status: "error", message: "Internal server error" },
        { status: 500 }
      );
    }
  })
);