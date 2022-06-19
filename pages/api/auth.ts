import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import { User } from "../../models/user";
import _ from "lodash";
import bcrypt from "bcrypt";
import { ResponseFuncs } from "../../utils/types";
import Joi from "joi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const catcher = (error: Error) => res.status(400).json({ error });

  const handleCase: ResponseFuncs = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: req.body.email }).catch(catcher);
      if (!user) return res.status(400).send("Invalid email or password.");

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(400).send("Invalid email or password.");

      const token = user.generateAuthToken();

      res.send(token);
    },
  };

  const response = handleCase[method];

  if (response) await response(req, res).catch(catcher);
  else res.status(400).json({ error: `Method ${method} is not allowed` });
};

function validate(req: any) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

export default handler;
