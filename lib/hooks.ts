import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { catcher, logger } from "./error";

const serverAPI = process.env.SERVER + "/" + "api";

export async function sendPostRequest(
  baseURL: string,
  postData: any,
  responeType: string = "json",
  includeHeader = false
) {
  try {
    const res = await fetch(baseURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      res.text().then((message) => toast(message));
    }

    switch (responeType) {
      case "json":
        if (includeHeader)
          return fortmatResponse(res as Response, includeHeader);
        return await res?.json();
      case "text":
        return await res?.text();
      default:
        throw new Error("Response type unknown");
    }
  } catch (err) {
    console.error(err);
  }
}

const fortmatResponse = async (res: Response, includeHeader = false) => {
  if (!includeHeader) return JSON.stringify(res);

  return {
    token: res.headers.get("x-auth-token"),
    data: JSON.stringify(await res.json()),
  };
};

export async function getUserByToken(storedToken: string) {
  let initialuser = null;
  const serverAPI = process.env.SERVER + "/" + "api";

  if (storedToken) {
    initialuser = await fetch(`${serverAPI}/me`, {
      headers: new Headers({ "x-auth-token": storedToken }),
    });
  }

  return initialuser;
}

export function useValidateUserToken() {
  const [user, setUser] = useState(null);
  const [storedToken, setStoredToken] = useState<string | null>(null);

  useEffect(() => {
    setStoredToken(localStorage.getItem("token"));

    const fetchData = async () => {
      const user = await fetch(`${serverAPI}/me`, {
        headers: new Headers({ "x-auth-token": storedToken as string }),
      });
      if (user) setUser(await user.json());
    };
    if (storedToken) fetchData().catch(console.error);
    else setUser(null);
  }, [storedToken]);

  return user;
}
