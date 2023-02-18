import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import {getCsrfToken, signIn} from "next-auth/react";
import {useState} from "react";
import {Fade} from "react-awesome-reveal";

export default function SignIn() {
  const [register, setRegister] = useState(false);

  const registerMode = () => {
    console.log("toggle");
    setRegister(!register);
  };

  const loginHandler = async (values) => {
    signIn("credentials", {
      username: values.username,
      password: values.password,
    });
  };

  const registerHandler = async (values) => {
    // signIn("credentials", {
    //   username: values.username,
    //   password: values.password,
    // });
    console.log(values);
  };

  return (
    <Fade>
      {!register && (
        <Login loginHandler={loginHandler} registerMode={registerMode} />
      )}
      {register && (
        <Register
          registerHandler={registerHandler}
          registerMode={registerMode}
        />
      )}
    </Fade>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
