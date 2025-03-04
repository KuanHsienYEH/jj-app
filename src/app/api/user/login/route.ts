import type { NextApiRequest, NextApiResponse } from "next";
import { withDB, withMethod } from "../../../../lib/middleware";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../../../../types/api";

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  const { email, pwd } = req.body as { email: string; pwd: string };
  const user = await User.findOne({ email, pwd });

  if (user) {
    const accessToken = jwt.sign(
      { _id: user._id.toString() },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "1 day" }
    );
    res.json({ status: "ok", data: { accessToken } });
  } else {
    res.json({ status: "error", message: "Invalid credentials", data: { user: false } });
  }
};

export default withDB(withMethod(["POST"], handler));