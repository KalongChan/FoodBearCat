import Container from "@/UI/Container/Container";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import Modal from "../../../UI/Modal/Modal";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import classes from "../add-menus.module.css";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

const addAccount = ({account}) => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (account) => {
    setCurrentAccount(account);
    toggleModal();
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`/api/account/${currentAccount.id}`);
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
    toggleModal();
    router.push("/admin/accounts");
  };

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

  let initialValues = {
    account: account?.username,
    // password: "",
    type: account?.type,
  };

  if (!account) {
    return <h1 style={{textAlign: "center"}}>404 No Item Found </h1>;
  }

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

  if (session && session.admin) {
    return (
      <Container>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <h2>
              Are you sure want to delete{" "}
              <span>{`${currentAccount.account}`}</span> ?
            </h2>
            <div style={{whiteSpace: "nowrap"}}>
              <button
                className={classes["sub-btn"]}
                onClick={() => toggleModal()}
              >
                Cancel
              </button>
              <button
                className={classes["delete-btn"]}
                onClick={() => deleteAccount()}
              >
                Confirm
              </button>
            </div>
          </Modal>
        )}
        <div className={classes["form-wrapper"]}>
          <div className={classes["form-header"]}>
            <div className={classes["form-title"]}>Edit Menu</div>
            <button
              onClick={() =>
                openModal({id: account._id, account: account.username})
              }
              className={classes["delete-btn"]}
            >
              Delete
            </button>
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
                      &lt; Return To Accounts
                    </div>
                    <button type="submit" className={classes["edit-btn"]}>
                      Edit
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
export default addAccount;

export const getServerSideProps = async ({req, params}) => {
  const id = params.id;
  let account = null;

  try {
    account = await axios.get(`/api/account/${id}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    account = account.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data.message);
    } else {
      console.log(e);
    }
  }

  return {
    props: {
      account: account,
    },
  };
};
