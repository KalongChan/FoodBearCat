import Container from "@/UI/Container/Container";
import {Formik, Form, Field} from "formik";
import {useRouter} from "next/router";
import * as Yup from "yup";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import {toast} from "react-toastify";

import classes from "../add-menus.module.css";

const addAccount = ({account}) => {
  const router = useRouter();

  if (!account) {
    return <h1 style={{textAlign: "center"}}>404 No Item Found </h1>;
  }

  let initialValues = {
    account: account.account,
    // password: "",
    type: account.type,
  };

  const menuSchema = Yup.object().shape({
    account: Yup.string().required("Required"),
    // password: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
  });

  const menuForm = [
    {type: "name", label: "Name"},
    // {type: "password", label: "Password"},
    {type: "type", label: "User Type"},
  ];

  const submitHandler = async (values) => {
    try {
      const response = await axios.put(`/api/account/${account._id}`, {
        ...values,
      });
      router.push("/admin/accounts");
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`/api/account/${account._id}`);
      router.push("/admin/accounts");
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <div className={classes["form-wrapper"]}>
        <div className={classes["form-header"]}>
          <h2>Edit Account</h2>
          <button onClick={deleteHandler}>Delete</button>
        </div>
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

                {/* <div
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
              </div> */}

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
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};
export default addAccount;

export const getStaticPaths = async () => {
  let accounts = null;

  try {
    accounts = await axios.get("/api/accounts");
    accounts = accounts.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data.message);
    } else {
      console.log(e);
    }
  }

  return {
    fallback: "blocking",
    paths: accounts.map((menu) => ({params: {id: menu._id.toString()}})),
  };
};

export async function getStaticProps(context) {
  const id = context.params.id;
  let account = null;

  try {
    account = await axios.get(`/api/account/${id}`);
    account = account.data;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      account: account,
    },
  };
}
