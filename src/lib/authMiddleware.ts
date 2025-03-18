import { NextResponse, NextRequest } from "next/server";
import { verifyAuthToken } from "./authService";

export function authMiddleware(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // ✅ 只允許從 `HttpOnly Cookie` 讀取 Token
      const token = req.cookies.get("token")?.value;

      if (!token) {
        return NextResponse.json(
          { status: "error", message: "Unauthorized: Missing token" },
          { status: 401 }
        );
      }

      // ✅ 驗證 JWT
      const user = verifyAuthToken(token);
      if (!user) {
        return NextResponse.json(
          { status: "error", message: "Unauthorized: Invalid token" },
          { status: 401 }
        );
      }

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
