import axios from "axios";
import {useSession} from "next-auth/react";
import React, {Fragment, useState} from "react";
import {useSelector} from "react-redux";
import ContactInfoForm from "../ContactInformation/ContactInfoForm";
import CreditCardForm from "../CreditCardForm/CreditCardForm";
import OrderComplete from "../OrderComplete/OrderComplete";

let contactData = null;
let creditCardData = null;

const CheckoutForm = ({prevStep, nextStep, currentStep}) => {
  const {data: session, status} = useSession();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const getTimeStamp = () => {
    // const date = new Date();
    // const options = {
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: false,
    // };
    // const formattedDate = date
    //   .toLocaleString("en-US", options)
    //   .replace(",", "");

    const date = new Date();
    const timestamp = date.getTime();
    return timestamp;
  };

  const contactSubmitHandler = (values) => {
    contactData = {...values};
    nextStep();
  };

  const creditCardSubmitHandler = async (values) => {
    creditCardData = {...values};
    // console.log(creditCardData);

    const orderInfo = {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      address: contactData.address,
      phone: contactData.phone,
      items: items,
      totalAmount: totalAmount,
      orderTime: getTimeStamp(),
      orderedBy: session?.id ? session.id : "Guest",
      status: "Pending",
    };
    // try {
    //   const response = await axios.post("/api/add-order", {...orderInfo});
    //   nextStep();
    // } catch (e) {
    //   if (e.response) {
    //     console.log(e.response.status);
    //     console.log(e.response.data.message);
    //   } else {
    //     console.log(e);
    //   }
    // }
  };

  const backHandler = () => {
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
      {currentStep === 3 && (
        <OrderComplete
          backHandler={backHandler}
          submitHandler={creditCardSubmitHandler}
        />
      )}
    </Fragment>
  );
};

export default CheckoutForm;
