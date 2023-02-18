import Container from "@/UI/Container/Container";
import {Formik, Form, Field} from "formik";
import {useRouter} from "next/router";
import {Fragment, useEffect} from "react";
import * as Yup from "yup";
import classes from "./add-menus.module.css";
import axios from "axios";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";

const addMenu = () => {
  const {data: session, status} = useSession();
  const router = useRouter();

  let initialValues = {
    account: "",
    password: "",
    type: "",
  };

  const menuSchema = Yup.object().shape({
    account: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
  });

  const menuForm = [
    {type: "account", label: "Name"},
    {type: "password", label: "Password"},
    {type: "type", label: "User Type"},
  ];

  const submitHandler = async (values) => {
    try {
      const response = await axios.post("/api/add-account", {
        ...values,
      });
      router.push("accounts");
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (!session.admin) {
      router.push("/");
      return;
    }
  }, [session]);

  if (session && session.admin) {
    return (
      <Container>
        <div className={classes["form-wrapper"]}>
          <h2>Contact information</h2>
          <div className={classes.form}>
            <Formik
              initialValues={initialValues}
              validationSchema={menuSchema}
              onSubmit={submitHandler}
            >
              {({errors, touched}) => (
                <Form>
                  <div
                    className={`${classes["form-item"]}
               ${errors.account && touched.account ? classes.error : ""}`}
                  >
                    <label htmlFor="account">User Name</label>

                    <Field
                      className={classes.input}
                      name="account"
                      id="account"
                    />
                    {errors.account && touched.account ? (
                      <div className={classes["error-message"]}>
                        {errors.account}
                      </div>
                    ) : null}
                  </div>

                  <div
                    className={`${classes["form-item"]}
               ${errors.password && touched.password ? classes.error : ""}`}
                  >
                    <label htmlFor="password">Password</label>

                    <Field
                      type="password"
                      className={classes.input}
                      name="password"
                      id="password"
                    />
                    {errors.password && touched.password ? (
                      <div className={classes["error-message"]}>
                        {errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div
                    className={`${classes["form-item"]}
               ${errors.type && touched.type ? classes.error : ""}`}
                  >
                    <label htmlFor="type">User Type</label>

                    <Field
                      as="select"
                      className={classes.input}
                      name="type"
                      id="type"
                    >
                      <option value="">Select a Type</option>
                      <option value="Admin" key="Admin">
                        Admin
                      </option>
                      <option value="User" key="User">
                        User
                      </option>
                    </Field>
                    {errors.type && touched.type ? (
                      <div className={classes["error-message"]} id="type">
                        {errors.type}
                      </div>
                    ) : null}
                  </div>

                  <div className={classes.btns}>
                    <div className={classes.back} onClick={() => router.back()}>
                      &lt; Return To Menu
                    </div>
                    <button type="submit" className={classes["edit-btn"]}>
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    );
  }
};
export default addMenu;
