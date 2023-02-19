import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import classes from "./Register.module.css";
import {RiAccountBoxFill, RiLockPasswordFill} from "react-icons/ri";
import {MdPassword} from "react-icons/md";

let initialValues = {
  username: "",
  password: "",
};

const Register = (props) => {
  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  });

  const registerForm = [
    {type: "username", label: "Username"},
    {type: "password", label: "Password"},
    {type: "confirmPassword", label: "Confirm Password"},
  ];
  return (
    <div className={classes.form}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          props.registerHandler(values);
        }}
      >
        {({errors, touched}) => (
          <Form>
            <div className={classes["form-container"]}>
              <div className={classes.title}>Register</div>
              <div className={classes["form-item"]}>
                <div className={classes["error-message"]}>
                  {errors.username && touched.username
                    ? errors.username
                    : props.error}
                </div>

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
                <div className={classes["error-message"]}>
                  {errors.password && touched.password ? errors.password : ""}
                </div>
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

              <div className={classes["form-item"]}>
                <div className={classes["error-message"]}>
                  {errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""}
                </div>
                <div className={classes["form-row"]}>
                  <label htmlFor="password">
                    <MdPassword />
                  </label>

                  <Field
                    type="password"
                    className={classes.input}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className={classes.btns}>
                <button type="submit">Register</button>
              </div>
              <div className={classes.register}>
                Got an account?
                <span onClick={props.registerMode}>Login here</span>{" "}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Register;
