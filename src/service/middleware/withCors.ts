import { NextApiRequest, NextApiResponse } from "next";
import config from "@/lib/config";

type NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

const withCors = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const allowedOrigin = config.FE_URL as string;

    const origin = req.headers.referer;

    if (!origin || !origin.startsWith(allowedOrigin)) {
      res.status(403).json({
        success: false,
        error: {
          message: "CORS policy: Origin not allowed",
        },
      });
      return;
    }

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    // Preflight
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return handler(req, res);
  };
};

export default withCors;
