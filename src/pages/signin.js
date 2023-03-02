import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import axios from "axios";
import {getCsrfToken, signIn} from "next-auth/react";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";
import Fade from "react-reveal/Fade";

export default function SignIn() {
  const router = useRouter();
  const [register, setRegister] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const registerMode = () => {
    setRegister(!register);
  };

  const loginHandler = async (values) => {
    const response = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (!response.ok) {
      if (response.status === 401) {
        return setLoginError("Incorrect Username or Password");
      }
      if (response.status === 500) {
        return setLoginError("Internal Server Error");
      }
    }
    router.push("/");
  };

  const registerHandler = async (values) => {
    try {
      const response = await axios.post("/api/add-account", {
        username: values.username,
        password: values.password,
        type: "User",
      });
      await signIn("credentials", {
        username: values.username,
        password: values.password,
      });
      router.push("/");
    } catch (e) {
      const errorMessage = `${e.response.data.message}`;
      setRegisterError(errorMessage);
    }
  };

  return (
    <Fragment>
      <Fade>
        {!register && (
          <Login
            loginHandler={loginHandler}
            registerMode={registerMode}
            loginError={loginError}
          />
        )}
      </Fade>
      <Fade>
        {register && (
          <Register
            registerHandler={registerHandler}
            registerMode={registerMode}
            registerError={registerError}
          />
        )}
      </Fade>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
