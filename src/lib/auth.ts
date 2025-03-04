import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export function authMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: "error", message: "No token provided" });
    }

    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN as string) as { _id: string };
      (req as any).user = user;
      return await handler(req, res);
    } catch (err) {
      return res.status(403).json({ status: "error", message: "Invalid token" });
    }
  };
}