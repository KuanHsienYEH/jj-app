import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string; // Ensure this is set in `.env`
const TOKEN_EXPIRY = "1h"; // Token expires in 1 hour

interface AuthPayload {
  userId: string;
  email: string;
}

// ✅ Generate a JWT token
export function generateAuthToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// ✅ Verify and decode a JWT token
export function verifyAuthToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    console.error("❌ Invalid Token:", error);
    return null;
  }
}
