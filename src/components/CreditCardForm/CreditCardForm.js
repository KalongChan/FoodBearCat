import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {Fragment, useRef} from "react";

import classes from "./CreditCardForm.module.css";

let initialValues = {
  fullName: "",
  expiryDate: "",
  expiryYear: "",
  cardNumber: "",
  ccv: "",
};

const CreditCardForm = (props) => {
  const ref = useRef();

  const CreditCartSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    expiryDate: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(2, "Must be exactly 2 digits")
      .max(2, "Must be exactly 2 digits"),
    expiryYear: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(4, "Must be exactly 4 digits")
      .max(4, "Must be exactly 4 digits"),
    cardNumber: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(16, "Must be exactly 16 digits")
      .max(16, "Must be exactly 16 digits"),
    ccv: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(3, "Must be exactly 3 digits")
      .max(3, "Must be exactly 3 digits"),
  });

  const creditCardForm = [
    {type: "fullName", label: "Full Name"},
    {type: "expiryDate", label: "Expiry date"},
    {type: "expiryYear", label: ""},
    {type: "cardNumber", label: "Card Number"},
    {type: "ccv", label: "CCV"},
  ];

  const backHandler = () => {
    initialValues = ref.current.values;
    props.backHandler();
  };

  return (
    <div className={classes.form}>
      <h2>Credit Card Information</h2>
      <Formik
        innerRef={ref}
        initialValues={initialValues}
        validationSchema={CreditCartSchema}
        onSubmit={(values) => {
          // same shape as initial values
          props.submitHandler(values);
        }}
      >
        {({errors, touched}) => (
          <Form>
            {creditCardForm.map((item) => (
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
              <div className={classes.back} onClick={backHandler}>
                &lt; Back To Last Step
              </div>
              <button type="submit">Next Step</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default CreditCardForm;
