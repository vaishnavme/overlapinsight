import { NextApiRequest, NextApiResponse } from "next";
import fundService from "@/service/fund.service";
import withCors from "@/service/middleware/withCors";
import withHttpMethod from "@/service/middleware/withHttpMethod";

const handler = (req: NextApiRequest, resp: NextApiResponse) => {
  const { query, limit = 15 } = req.query;

  try {
    const funds = fundService.getFundsList({
      query: query as string,
      limit: Number(limit),
    });

    resp.status(200).send({
      success: true,
      data: funds,
    });
  } catch {
    resp.status(500).send({
      success: false,
      error: {
        message: "Failed to fetch funds",
      },
    });
  }
};

export default withCors(withHttpMethod(handler, "GET"));
