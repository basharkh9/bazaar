// this code runs only on server
import { Product } from "../models/product";
export async function getProducts() {
  const products = await Product.find();
  return products;
}
