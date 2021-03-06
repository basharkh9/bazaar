import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import { User } from "../../models/user";
import { ResponseFuncs } from "../../utils/types";
import auth from "../../middleware/auth";
import { logger } from "../../lib/error";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const catcher = (error: Error) => {
    logger(error);
    res.status(400).json({ error });
  };
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res.json(
        await User.findById(req.body._id).select("-password").catch(catcher)
      );
    },
  };

  const response = handleCase[method];

  if (response) await auth(req, res, response);
  else res.status(400).json({ error: `Method ${method} is not allowed` });
};

export default handler;
