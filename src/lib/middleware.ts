import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "./db";

export function withDB(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      await connectDB();
      console.log("Database connected for API request:", req.url);
      return await handler(req);
    } catch (error) {
      console.error("Database connection error in middleware:", error);
      return NextResponse.json(
        { status: "error", message: "Database connection failed" },
        { status: 500 }
      );
    }
  };
}

export function withMethod(methods: string[], handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    if (!methods.includes(req.method)) {
      return NextResponse.json(
        { status: "error", message: "Method not allowed" },
        { status: 405 }
      );
    }
    return await handler(req);
  };
}