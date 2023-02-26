import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {Fragment, useEffect, useState} from "react";

import classes from "./CreditCardForm.module.css";
import CreditCard from "../CreditCard/CreditCard";

let initialValues = {
  cardHolder: "",
  expiryDate: "",
  cardNumber: "",
  ccv: "",
};

let creditCardData = null;

const CreditCardForm = (props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ccv, setCcv] = useState("");
  const [flipCard, setFlipCard] = useState(false);

  const cardHolderHandler = (input) => {
    //Filter all non-letter character
    setCardHolder(input.replace(/[^A-Za-z\s]/g, ""));
  };

  const cardNumberHandler = (input) => {
    //Filter all non-digit character
    setCardNumber(input.replace(/[^\d]+/g, ""));
  };

  const expiryDateHandler = (input) => {
    //Filter all non-digit character
    setExpiryDate(input.replace(/[^\d]+/g, ""));
  };

  const ccvHandler = (input) => {
    //Filter all non-digit character
    setCcv(input.replace(/[^\d]+/g, ""));
  };

  const flipCardHandler = () => {
    setFlipCard(!flipCard);
  };

  const cardNumberFormatter = (value) => {
    //Add space after every 4th character
    return value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const expiryDateFormatter = (value) => {
    //Add forward slash after every 2nd character
    return value
      .replace(/[^\dA-Z]/g, "")
      .replace(/^(..)(?!$)|(..)(.)/g, "$1$3/")
      .trim();
  };

  useEffect(() => {
    setCardHolder(initialValues.cardHolder);
    setCardNumber(initialValues.cardNumber);
    setExpiryDate(initialValues.expiryDate);
    setCcv(initialValues.ccv);
  }, []);

  const CreditCardSchema = Yup.object().shape({
    cardHolder: Yup.string().required("Required"),
    expiryDate: Yup.string()
      .required("Required")
      .matches(/^[0-9\/]+$/, "Must be only digits")
      .min(5, "Must be MM/YY") //4digits + 1 forward slash
      .max(5, "Must be MM/YY"),
    cardNumber: Yup.string()
      .required("Required")
      .matches(/^[0-9\s]+$/, "Must be only digits")
      .min(19, "Must be exactly 16 digits")
      .max(19, "Must be exactly 16 digits"), //16digits + 3 spaces
    ccv: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(3, "Must be exactly 3 digits")
      .max(3, "Must be exactly 3 digits"),
  });

  const creditCardForm = [
    {type: "cardHolder", label: "Full Name"},
    {type: "expiryDate", label: "Expiry date"},
    {type: "cardNumber", label: "Card Number"},
    {type: "ccv", label: "CCV"},
  ];

  const backHandler = () => {
    initialValues = {
      cardHolder: cardHolder,
      expiryDate: expiryDate,
      cardNumber: cardNumber,
      ccv: ccv,
    };
    props.backHandler();
  };

  return (
    <div className={classes.form}>
      <h2>Credit Card Information</h2>

      <CreditCard
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        expiryDate={expiryDate}
        ccv={ccv}
        flipCard={flipCard}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={CreditCardSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          //Reset initialValues after submitting
          props.submitHandler(values);
          initialValues = {
            cardHolder: "",
            expiryDate: "",
            cardNumber: "",
            ccv: "",
          };
        }}
      >
        {({errors, touched, handleChange, handleBlur}) => (
          <Form>
            <Fragment>
              <div
                className={`${classes["form-item"]} }
             ${errors.cardHolder && touched.cardHolder ? classes.error : ""}`}
              >
                <label htmlFor="cardHolder">Full Name</label>
                <Field
                  className={classes.input}
                  name="cardHolder"
                  id="cardHolder"
                  value={cardHolder}
                  maxLength="20"
                  onChange={(e) => {
                    handleChange(e);
                    cardHolderHandler(e.target.value);
                  }}
                />
                {errors.cardHolder && touched.cardHolder ? (
                  <div className={classes["error-message"]}>
                    {errors.cardHolder}
                  </div>
                ) : null}
              </div>

              <div
                className={`${classes["form-item"]} }
             ${errors.cardNumber && touched.cardNumber ? classes.error : ""}`}
              >
                <label htmlFor="cardNumber">Card Number</label>
                <Field
                  className={classes.input}
                  name="cardNumber"
                  id="cardNumber"
                  value={cardNumberFormatter(cardNumber)}
                  maxLength="19"
                  onChange={(e) => {
                    handleChange(e);
                    cardNumberHandler(e.target.value);
                  }}
                />
                {errors.cardNumber && touched.cardNumber ? (
                  <div className={classes["error-message"]}>
                    {errors.cardNumber}
                  </div>
                ) : null}
              </div>

              <div className={classes["split-row"]}>
                <div
                  className={`${classes["form-item"]} ${classes["split-item"]} }
             ${errors.expiryDate && touched.expiryDate ? classes.error : ""}`}
                >
                  <label htmlFor="expiryDate">Expiry Date (DD/YY)</label>
                  <Field
                    className={classes.input}
                    name="expiryDate"
                    id="expiryDate"
                    value={expiryDateFormatter(expiryDate)}
                    maxLength="5"
                    onChange={(e) => {
                      handleChange(e);
                      expiryDateHandler(e.target.value);
                    }}
                  />
                  {errors.expiryDate && touched.expiryDate ? (
                    <div className={classes["error-message"]}>
                      {errors.expiryDate}
                    </div>
                  ) : null}
                </div>

                <div
                  className={`${classes["form-item"]} ${classes["split-item"]} }
             ${errors.ccv && touched.ccv ? classes.error : ""}`}
                >
                  <div className={classes.ccv}>
                    <label htmlFor="ccv">CCV</label>
                    <Field
                      className={`${classes.input}`}
                      name="ccv"
                      id="ccv"
                      value={ccv}
                      maxLength="3"
                      onFocus={flipCardHandler}
                      onBlur={(e) => {
                        flipCardHandler(e);
                        handleBlur(e);
                      }}
                      onChange={(e) => {
                        handleChange(e);
                        ccvHandler(e.target.value);
                      }}
                    />
                    {errors.ccv && touched.ccv ? (
                      <div className={classes["error-message"]}>
                        {errors.ccv}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Fragment>

            <div className={classes.btns}>
              <div className={classes.back} onClick={backHandler}>
                &lt; Back To Last Step
              </div>
              <button type="submit">Order</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default CreditCardForm;
