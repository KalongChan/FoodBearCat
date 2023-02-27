import {Formik, Form, Field} from "formik";
import Link from "next/link";
import {Fragment, useEffect} from "react";
import * as Yup from "yup";
import classes from "./ContactInfoForm.module.css";

let initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
};

const ContactInformForm = (props) => {
  const ContactInformSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Required"),
  });

  const contactForm = [
    {type: "email", label: "Email"},
    {type: "firstName", label: "First Name"},
    {type: "lastName", label: "Last Name"},
    {type: "address", label: "Address"},
    {type: "phone", label: "Phone"},
  ];

  return (
    <div
      className={`${classes.form}
    ${props.isContactMountedBefore ? classes["form-animation"] : ""}
    `}
    >
      <h2>Contact information</h2>
      <Formik
        //Reset initialValues after leaving /checkout
        initialValues={
          props.isContactMountedBefore
            ? initialValues
            : {
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                phone: "",
              }
        }
        validationSchema={ContactInformSchema}
        onSubmit={(values) => {
          props.submitHandler(values);
          initialValues = values;
        }}
      >
        {({errors, touched}) => (
          <Form>
            {contactForm.map((item) => (
              <Fragment key={item.type}>
                <div
                  className={`${classes["form-item"]}
             ${errors[item.type] && touched[item.type] ? classes.error : ""}`}
                  key={item.type}
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
            ))}

            <div className={classes.btns}>
              <Link className={classes.back} href="/cart">
                &lt; Return To Cart
              </Link>
              <button type="submit">Next Step</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ContactInformForm;
