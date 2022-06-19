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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </UserContext.Provider>
  );
}

export default MyApp;
