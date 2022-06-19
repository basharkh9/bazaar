import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar() {
  const { user } = useContext<null | any>(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Bazaar</button>
          </Link>
        </li>
        {user && (
          <>
            <li>
              <Link href="/cart">
                <button className="btn-blue">Cart</button>
              </Link>
            </li>

            <li>
              <div className="container-row">
                <div className="container-column">
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                </div>
                <Link href="#">
                  <img src="https://picsum.photos/200/300?random=1" />
                </Link>
              </div>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link href="/enter">
                <button className="btn-blue">Log in</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
