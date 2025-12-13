import { NextApiRequest, NextApiResponse } from "next";

type NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";

const withHttpMethod = (
  handler: NextApiHandler,
  allowedMethod: HttpMethod | HttpMethod[]
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const allowedMethods = Array.isArray(allowedMethod)
      ? allowedMethod
      : [allowedMethod];

    if (!req.method || !allowedMethods.includes(req.method as HttpMethod)) {
      return res.status(405).json({
        success: false,
        error: {
          message: `Method ${req.method} Not Allowed`,
          allowedMethods,
        },
      });
    }

    return await handler(req, res);
  };
};

export default withHttpMethod;
