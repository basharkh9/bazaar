import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Joi from "joi";
const key = process.env.bazaar_jwtPrivateKey;
if (!key) {
  console.error("FATAL_ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL_ERROR: jwtPrivateKey is not defined.");
//
// }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, key);
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export interface UserResource {
  name: string;
  email: string;
  password: string;
  isAdmin?: string;
}

export function validateUser(user: UserResource) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}
