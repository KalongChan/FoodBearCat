import Container from "@/UI/Container/Container";
import {Formik, Form, Field} from "formik";
import {useRouter} from "next/router";
import {Fragment, useEffect, useState} from "react";
import * as Yup from "yup";
import classes from "./add-menus.module.css";
import axios from "axios";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";
import Loading from "@/components/Loading/Loading";

const AddMenu = () => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      let categoriesRes = await axios.get(`/api/categories`);
      categoriesRes = categoriesRes.data;
      setCategories(categoriesRes);
    } catch (e) {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data.message);
      } else {
        console.log(e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let initialValues = {
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  };

  const menuSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Required"),
    image: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*\.(jpg|jpeg|png))$/,
        "Only accepts .jpg / .jpeg / .png Files"
      )
      .required("Required"),
  });

  const menuForm = [
    {type: "name", label: "Name"},
    {type: "category", label: "Category"},
    {type: "description", label: "Description"},
    {type: "price", label: "Price"},
    {type: "image", label: "Image URL (400*400)"},
  ];

  const submitHandler = async (values) => {
    try {
      const response = await axios.post("/api/add-menu", {...values});
      router.push("menus");
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

  if (loading && session && session.admin) {
    return <Loading />;
  }

  if (session && session.admin) {
    return (
      <Container>
        <div className={classes["form-wrapper"]}>
          <h2>Add Menu</h2>
          <div className={classes.form}>
            <Formik
              initialValues={initialValues}
              validationSchema={menuSchema}
              onSubmit={submitHandler}
            >
              {({errors, touched}) => (
                <Form>
                  {menuForm.map((item, index) =>
                    item.type === "category" ? (
                      <Fragment key={index + "_category"}>
                        <div
                          className={`${classes["form-item"]}
               ${errors[item.type] && touched[item.type] ? classes.error : ""}`}
                        >
                          <label htmlFor={item.type}>{item.label}</label>

                          <Field
                            as="select"
                            className={classes.input}
                            name={item.type}
                            id={item.type}
                          >
                            <option value="">Select a Category</option>
                            {categories?.map((category) => (
                              <option value={category.name} key={category.name}>
                                {category.name}{" "}
                              </option>
                            ))}
                          </Field>
                          {errors[item.type] && touched[item.type] ? (
                            <div
                              className={classes["error-message"]}
                              id={item.type}
                            >
                              {errors[item.type]}
                            </div>
                          ) : null}
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment key={index + "_others"}>
                        <div
                          className={`${classes["form-item"]}
               ${errors[item.type] && touched[item.type] ? classes.error : ""}`}
                        >
                          <label htmlFor={item.type}>{item.label}</label>

                          <Field
                            className={classes.input}
                            name={item.type}
                            id={item.type}
                          />
                          {errors[item.type] && touched[item.type] ? (
                            <div className={classes["error-message"]}>
                              {errors[item.type]}
                            </div>
                          ) : null}
                        </div>
                      </Fragment>
                    )
                  )}

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
export default AddMenu;
