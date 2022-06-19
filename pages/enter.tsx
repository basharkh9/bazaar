import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../lib/context";
import { sendPostRequest } from "../lib/hooks";
import styles from "../styles/Enter.module.css";

const SERVER = process.env.SERVER;
const notify = (message: string) => toast(message);

export default function EnterPage() {
  const { user } = useContext<null | any>(UserContext);
  const router = useRouter();

  const [signup, setSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && SERVER) router.push(SERVER);
  }, [user, router]);

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: any = await sendPostRequest(
      `${SERVER}/api/user`,
      {
        name: name,
        email: email,
        password: password,
      },
      "json",
      true
    ).catch((e) => {
      console.log(e);
    });

    if (!res) {
      notify("Registeration Failed.");
      return;
    }
    notify("Registered Seccessfully.");
    localStorage.setItem("token", res.token);
    router.reload();
  };
  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await sendPostRequest(
      `${SERVER}/api/auth`,
      {
        email: email,
        password: password,
      },
      "text"
    ).catch((e) => {
      notify(e.message);
    });

    if (!token) {
      notify("Login Failed.");
      return;
    }

    localStorage.setItem("token", token);
    notify("Login Success.");
    router.reload();
  };

  return (
    <div className={`${styles.wrapper} ${styles.login}`}>
      <div className={styles.container}>
        <div className={styles["col-left"]}>
          <div className={styles["login-text"]}>
            <h2>Welcome!</h2>
            <p>Create your account. For Free!</p>
          </div>
        </div>

        <div className={styles["col-right"]}>
          {!user && (
            <div className={styles["login-form"]}>
              {(signup && <h2>Sign Up</h2>) || <h2>Log In</h2>}
              {(signup && (
                <form onSubmit={handleSignupSubmit}>
                  <p>
                    <label>
                      Your Full Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>
                      Username/Email address<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Username or Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>
                      Password<span>*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <input type="submit" value="Sign Up" />
                  </p>
                  <p>
                    <a
                      onClick={(e) => {
                        e.preventDefault;
                        setSignup(!signup);
                      }}
                      href="#"
                    >
                      You have account? Login here.
                    </a>
                  </p>
                </form>
              )) || (
                <form onSubmit={handleLoginSubmit}>
                  <p>
                    <label>
                      Email address<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>
                      Password<span>*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <input type="submit" value="Log In" />
                  </p>
                  <p>
                    <a
                      onClick={(e) => {
                        e.preventDefault;
                        setSignup(!signup);
                      }}
                      href="#"
                    >
                      You don&apos;t have an account? Register.
                    </a>
                  </p>
                </form>
              )}
            </div>
          )}

          {user && (
            <>
              <p>
                <Link href="/">
                  <a
                    onClick={(e) => {
                      localStorage.removeItem("token");
                    }}
                  >
                    Already logged in! click here to logout.
                  </a>
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
