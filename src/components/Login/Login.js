import {Formik, Form, Field} from "formik";
import classes from "./Login.module.css";
import {RiAccountBoxFill, RiLockPasswordFill} from "react-icons/ri";

let initialValues = {
  username: "",
  password: "",
};

const Login = (props) => {
  const registerForm = [
    {type: "username", label: "Username"},
    {type: "password", label: "Password"},
  ];
  return (
    <div className={classes.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          props.loginHandler(values);
        }}
      >
        <Form>
          <div className={classes["form-container"]}>
            <div className={classes.title}>Login</div>

            <div className={classes["form-item"]}>
              <div className={classes["error-message"]}></div>
              <div className={classes["form-row"]}>
                <label htmlFor="username">
                  <RiAccountBoxFill />
                </label>
                <Field
                  type="input"
                  className={classes.input}
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className={classes["form-item"]}>
              <div className={classes["error-message"]}></div>
              <div className={classes["form-row"]}>
                <label htmlFor="password">
                  <RiLockPasswordFill />
                </label>

                <Field
                  type="password"
                  className={classes.input}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className={classes.btns}>
              <button type="submit">Login</button>
            </div>
            <div className={classes.register}>
              Not a member?
              <span onClick={props.registerMode}>Sign up now</span>{" "}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default Login;
