import Container from "@/UI/Container/Container";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "../../../UI/Modal/Modal";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import classes from "../add-menus.module.css";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Loading from "@/components/Loading/Loading";

const Account = () => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const id = router.query.id;
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let accountRes = await axios.get(`/api/account/${id}`, {
        withCredentials: true,
      });
      accountRes = accountRes.data;
      setCurrentAccount(accountRes);
      console.log(accountRes);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = () => {
    toggleModal();
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`/api/account/${currentAccount._id}`);
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
      const response = await axios.put(`/api/account/${currentAccount._id}`, {
        ...values,
      });
      console.log(values);
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
    username: currentAccount?.username,
    // password: "",
    type: currentAccount?.type,
  };

  const menuSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    // password: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
  });

  const menuForm = [
    {type: "name", label: "Name"},
    // {type: "password", label: "Password"},
    {type: "type", label: "User Type"},
  ];

  if (loading && session && session.admin) {
    return <Loading />;
  }

  if (!currentAccount && !loading && session && session.admin) {
    return (
      <h1 style={{textAlign: "center", marginTop: "80px"}}>
        404 No Item Found{" "}
      </h1>
    );
  }

  if (session && session.admin) {
    return (
      <Container>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <h2>
              Are you sure want to delete{" "}
              <span>{`${currentAccount.username}`}</span> ?
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
            <div className={classes["form-title"]}>Edit Account</div>
            <button
              onClick={() =>
                openModal({
                  id: currentAccount._id,
                  username: currentAccount.username,
                })
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
               ${errors.username && touched.username ? classes.error : ""}`}
                  >
                    <label htmlFor="username">User Name</label>

                    <Field
                      className={classes.input}
                      name="username"
                      id="username"
                    />
                    {errors.username && touched.username ? (
                      <div className={classes["error-message"]}>
                        {errors.username}
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
export default Account;
