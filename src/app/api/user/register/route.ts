import type { NextApiRequest, NextApiResponse } from "next";
import { withDB, withMethod } from "../../../../lib/middleware";
import User from "../../../../models/User";
import { ApiResponse } from "../../../../types/api";

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  const { email, pwd } = req.body.formObj as { email: string; pwd: string };
  try {
    await User.create({ email, pwd });
    res.status(200).json({ status: "ok", data: { res: "ok" } });
  } catch (err) {
    res.status(500).json({ status: "error", message: (err as Error).message });
  }
};

export default withDB(withMethod(["POST"], handler));