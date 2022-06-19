import { env } from "process";
import winston from "winston";
import "winston-mongodb";

if (env.MONGODB_URI)
  winston.add(
    new winston.transports.MongoDB({
      db: env.MONGODB_URI,
    })
  );
winston.add(new winston.transports.Console({ level: "error" }));

winston.add(new winston.transports.File({ filename: "logfile.log" }));

export function logger(err: Error) {
  winston.error(err.message, err);
}

export async function catcher(error: Error) {
  logger(error);
}
