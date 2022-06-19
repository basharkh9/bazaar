import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import { User, validateUser } from "../../models/user";
import _ from "lodash";
import bcrypt from "bcrypt";
import { ResponseFuncs } from "../../utils/types";
import { logger } from "../../lib/error";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const catcher = (error: Error) => {
    logger(error);
    res.status(400).json({ error });
  };
  await dbConnect();

  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      User.find()
        .then((user) => {
          res.json(user);
        })
        .catch(catcher);
      // res.json(await User.find().catch(catcher));
    },

    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).send("User already registered.");

      user = new User(_.pick(req.body, ["name", "email", "password"]));
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save().catch(catcher);

      const token = user.generateAuthToken();
      res
        .setHeader("x-auth-token", token)
        .json(_.pick(user, ["_id", "name", "email"]));
    },
  };

  const response = handleCase[method];

  if (response) await response(req, res);
  else res.status(400).json({ error: `Method ${method} is not allowed` });
};

export default handler;
