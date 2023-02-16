import React, {Fragment, useState} from "react";
import ContactInfoForm from "../ContactInformation/ContactInfoForm";
import CreditCardForm from "../CreditCardForm/CreditCardForm";

let contactData = null;
let creditCardData = null;

const CheckoutForm = ({prevStep, nextStep, currentStep}) => {
  const [secondForm, setSecondForm] = useState(false);

  const contactSubmitHandler = (values) => {
    setSecondForm(true);
    contactData = {...values};
    nextStep();
  };

  const creditCardSubmitHandler = (values) => {
    creditCardData = {...values};
    console.log(creditCardData);
    console.log(contactData);
  };

  const backHandler = () => {
    setSecondForm(false);
    prevStep();
  };

  return (
    <Fragment>
      {currentStep === 1 && (
        <ContactInfoForm submitHandler={contactSubmitHandler} />
      )}
      {currentStep === 2 && (
        <CreditCardForm
          backHandler={backHandler}
          submitHandler={creditCardSubmitHandler}
        />
      )}
    </Fragment>
  );
};

export default CheckoutForm;
