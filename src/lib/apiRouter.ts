import type { NextApiRequest, NextApiResponse } from "next";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export class ApiRouter {
  private routes: { [key: string]: { [method: string]: Handler } } = {};

  get(path: string, handler: Handler) {
    this.routes[path] = { ...this.routes[path], GET: handler };
    return this;
  }

  post(path: string, handler: Handler) {
    this.routes[path] = { ...this.routes[path], POST: handler };
    return this;
  }

  patch(path: string, handler: Handler) {
    this.routes[path] = { ...this.routes[path], PATCH: handler };
    return this;
  }

  delete(path: string, handler: Handler) {
    this.routes[path] = { ...this.routes[path], DELETE: handler };
    return this;
  }

  handle() {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const path = req.url?.split("/api")[1] || "";
      const method = req.method || "";
      const handler = this.routes[path]?.[method];

      if (handler) {
        await handler(req, res);
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    };
  }
}