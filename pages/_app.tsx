import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useValidateUserToken } from "../lib/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const user = useValidateUserToken();

  return (
    <UserContext.Provider value={{ user: user }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
