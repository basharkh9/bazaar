import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

// export interface UserResource {
//   name: string;
//   email: string;
//   password: string;
//   isAdmin?: string;
// }

// export function validateUser(user: UserResource) {
//   const schema = Joi.object({
//     name: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required(),
//   });

//   return schema.validate(user);
// }
