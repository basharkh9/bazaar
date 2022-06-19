import type { NextPage } from "next";
import { useState } from "react";
import dbConnect from "../lib/dbConnect";
import { getProducts } from "../lib/mongodb";

const Home: NextPage = (props: any) => {
  const [products, setProducts] = useState(props.products);
  return (
    <div>
      <ul>
        <div className="grid">
          {products.map((p: any) => (
            <li key={p._id}>
              <div className="card">
                <img src={p.imgurl} alt="Avatar" />
                <div className="card-actions">
                  <div className="container-row space-between v-center">
                    <h4>{p.title}</h4>
                    <div>Price: {p.price}$</div>
                  </div>
                  <div className="container-row h-center">
                    <button className="card-button"> add to cart</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  await dbConnect();
  const result = await getProducts();
  const products = JSON.parse(JSON.stringify(result));
  return { props: { products } };
}
