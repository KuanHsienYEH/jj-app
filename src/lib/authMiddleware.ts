import { NextResponse, NextRequest } from "next/server";
import { verifyAuthToken } from "./authService";

export function authMiddleware(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { status: "error", message: "Unauthorized: Missing token" },
          { status: 401 }
        );
      }

      // ✅ Extract and verify token
      const token = authHeader.split(" ")[1];
      const user = verifyAuthToken(token);

      if (!user) {
        return NextResponse.json(
          { status: "error", message: "Unauthorized: Invalid token" },
          { status: 401 }
        );
      }

      // ✅ Attach user info to request for later use
      req.headers.set("userId", user.userId);
      req.headers.set("email", user.username);

      return handler(req);
      
    } catch (error) {
      console.error("❌ AuthMiddleware Error:", error);
      return NextResponse.json(
        { status: "error", message: "Authentication failed" },
        { status: 500 }
      );
    }
  };
}
