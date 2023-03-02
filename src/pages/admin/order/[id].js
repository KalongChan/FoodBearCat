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

const Orders = () => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const id = router.query.id;
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let orderRes = await axios.get(`/api/order/${id}`, {
        withCredentials: true,
      });
      orderRes = orderRes.data;
      setCurrentOrder(orderRes);
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

  const deleteOrder = async () => {
    try {
      const response = await axios.delete(`/api/order/${currentOrder._id}`);
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
    toggleModal();
    router.push("/admin/orders");
  };

  const submitHandler = async (values) => {
    try {
      const response = await axios.put(
        `/api/order/${currentOrder._id}`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/admin/orders");
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
    status: currentOrder?.status,
  };

  if (loading && session && session.admin) {
    return <Loading />;
  }

  if (!currentOrder && !loading && session && session.admin) {
    return (
      <h1 style={{textAlign: "center", marginTop: "80px"}}>
        404 No Item Found{" "}
      </h1>
    );
  }

  const orderSchema = Yup.object().shape({
    status: Yup.string().required("Required"),
  });

  const menuForm = [{status: "status", label: "Order Status"}];

  if (session && session.admin) {
    return (
      <Container>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <h2>
              Are you sure want to delete order{" "}
              <span>{`${currentOrder._id}`}</span> ?
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
                onClick={() => deleteOrder()}
              >
                Confirm
              </button>
            </div>
          </Modal>
        )}
        <div className={classes["form-wrapper"]}>
          <div className={classes["form-header"]}>
            <div className={classes["form-title"]}>Edit Order</div>
            <button
              onClick={() => openModal()}
              className={classes["delete-btn"]}
            >
              Delete
            </button>
          </div>
          <div className={classes.form}>
            <Formik
              initialValues={initialValues}
              validationSchema={orderSchema}
              onSubmit={submitHandler}
            >
              {({errors, touched}) => (
                <Form>
                  <div
                    className={`${classes["form-item"]}
               ${errors.status && touched.status ? classes.error : ""}`}
                  >
                    <label htmlFor="status">Order Status</label>

                    <Field
                      as="select"
                      className={classes.input}
                      name="status"
                      id="status"
                    >
                      <option value="">Select a Status</option>
                      <option value="Pending" key="Pending">
                        Pending
                      </option>
                      <option value="Delivering" key="Delivering">
                        Delivering
                      </option>
                      <option value="Arrived" key="Arrived">
                        Arrived
                      </option>
                    </Field>
                    {errors.status && touched.status ? (
                      <div className={classes["error-message"]} id="status">
                        {errors.status}
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
export default Orders;
