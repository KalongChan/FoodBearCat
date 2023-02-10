import React, {Fragment, useState} from "react";
import ContactInfoForm from "../ContactInformation/ContactInfoForm";
import CreditCardForm from "../CreditCardForm/CreditCardForm";

let contactData = null;
let creditCardData = null;

const CheckoutForm = () => {
  const [secondForm, setSecondForm] = useState(false);

  const contactSubmitHandler = (values) => {
    setSecondForm(true);
    contactData = {...values};
  };

  const creditCardSubmitHandler = (values) => {
    creditCardData = {...values};
    console.log(creditCardData);
    console.log(contactData);
  };

  const backHandler = () => {
    setSecondForm(false);
  };

  return (
    <Fragment>
      {!secondForm && <ContactInfoForm submitHandler={contactSubmitHandler} />}
      {secondForm && (
        <CreditCardForm
          backHandler={backHandler}
          submitHandler={creditCardSubmitHandler}
        />
      )}
    </Fragment>
  );
};

export default CheckoutForm;
