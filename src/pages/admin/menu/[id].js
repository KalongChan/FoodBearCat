import Container from "@/UI/Container/Container";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "../../../UI/Modal/Modal";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import classes from "../add-menus.module.css";
import {Fragment, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Loading from "@/components/Loading/Loading";

const Menu = () => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const id = router.query.id;
  const [showModal, setShowModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let menuRes = await axios.get(`/api/menu/${id}`, {
        withCredentials: true,
      });
      menuRes = menuRes.data;
      setCurrentMenu(menuRes);
    } catch (e) {
      console.log(e);
    }

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

  const deleteMenu = async () => {
    try {
      const response = await axios.delete(`/api/menu/${currentMenu._id}`);
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
    toggleModal();
    router.push("/admin/menus");
  };

  const editHandler = async (values) => {
    try {
      const response = await axios.put(`/api/menu/${id}`, {...values});
      router.push("/admin/menus");
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
    name: currentMenu?.name,
    category: currentMenu?.category,
    description: currentMenu?.description,
    price: currentMenu?.price,
    image: currentMenu?.image,
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

  if (loading && session && session.admin) {
    return <Loading />;
  }

  if (!currentMenu && !loading && session && session.admin) {
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
              Are you sure want to delete <span>{`${currentMenu.name}`}</span> ?
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
                onClick={() => deleteMenu()}
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
              onClick={() => openModal({})}
              className={classes["delete-btn"]}
            >
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
  }
};

// export const getServerSideProps = async ({req, params}) => {
//   const id = params.id;
//   let menuRes = null;
//   let categoriesRes = null;

//   try {
//     menuRes = await axios.get(`/api/menu/${id}`, {
//       withCredentials: true,
//       headers: {
//         Cookie: req.headers.cookie,
//       },
//     });
//     menuRes = menuRes.data;
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     categoriesRes = await axios.get(`/api/categories`);
//     categoriesRes = categoriesRes.data;
//   } catch (e) {
//     if (e.response) {
//       console.log(e.response.status);
//       console.log(e.response.data.message);
//     } else {
//       console.log(e);
//     }
//   }

//   return {
//     props: {
//       selectedMenu: menuRes,
//       categories: categoriesRes,
//     },
//   };
// };

export default Menu;
