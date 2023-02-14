import Container from "@/UI/Container/Container";
import {Formik, Form, Field} from "formik";
import {useRouter} from "next/router";
import {Fragment} from "react";
import * as Yup from "yup";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import {toast} from "react-toastify";

import classes from "../add-menus.module.css";

const Menu = ({selectedMenu, categories}) => {
  const router = useRouter();
  const id = router.query.id;

  if (!selectedMenu) {
    return <h1 style={{textAlign: "center"}}>404 No Item Found </h1>;
  }

  let initialValues = {
    name: selectedMenu.name,
    category: selectedMenu.category,
    description: selectedMenu.description,
    price: selectedMenu.price,
    image: selectedMenu.image,
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

  const editHandler = async (values) => {
    try {
      const response = await axios.put(`/api/menu/${id}`, {...values});
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`/api/menu/${id}`);
      if (response.status === 200) {
        router.push("/admin/menus");
        toast.success(response.data.message);
      }
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }

    // const response = await axios.delete(`/api/menu/${id}`);
    // if (response.status === 200) {
    //   alert(response.data.message);
    //   router.push("/admin/menus");
    // }
  };

  return (
    <Container>
      <div className={classes["form-wrapper"]}>
        <div className={classes["form-header"]}>
          <div className={classes["form-title"]}>Edit Menu</div>
          <button onClick={deleteHandler} className={classes["delete-btn"]}>
            Delete
          </button>
        </div>
        <div className={classes.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={menuSchema}
            onSubmit={editHandler}
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
                          {categories.map((category) => (
                            <option value={category.name} key={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </Field>
                        {errors[item.type] && touched[item.type] ? (
                          <div className={classes["error-message"]}>
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
                    &lt; Return To Menus
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
};

export const getStaticPaths = async () => {
  let menus = await axios.get("/api/menus");
  menus = menus.data;

  return {
    fallback: "blocking",
    paths: menus.map((menu) => ({params: {id: menu._id.toString()}})),
  };
};

export async function getStaticProps(context) {
  const id = context.params.id;
  let menuRes = null;
  let categoriesRes = null;

  try {
    menuRes = await axios.get(`/api/menu/${id}`);
    menuRes = menuRes.data;
  } catch (e) {
    console.log(e);
  }

  try {
    categoriesRes = await axios.get(`/api/categories`);
    categoriesRes = categoriesRes.data;
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
      selectedMenu: menuRes,
      categories: categoriesRes,
    },
  };
}

export default Menu;
