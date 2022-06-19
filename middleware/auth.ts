import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const key = process.env.bazaar_jwtPrivateKey;

if (!key) {
  console.error("FATAL_ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const token = req.headers["x-auth-token"] as string;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, key);
    req.body = decoded;
    await next(req, res);
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default handler;
