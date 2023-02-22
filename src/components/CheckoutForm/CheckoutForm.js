import axios from "axios";
import {useSession} from "next-auth/react";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ContactInfoForm from "../ContactInformation/ContactInfoForm";
import CreditCardForm from "../CreditCardForm/CreditCardForm";
import classes from "./CheckoutForm.module.css";

let contactData = null;
let creditCardData = null;

const CheckoutForm = ({prevStep, nextStep, currentStep}) => {
  const {data: session, status} = useSession();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [isContactMountedBefore, setIsContactMountedBefore] = useState(false);

  const getTimeStamp = () => {
    const date = new Date();
    const timestamp = date.getTime();
    return timestamp;
  };

  const contactSubmitHandler = (values) => {
    setIsContactMountedBefore(true);
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

    nextStep();
  };

  const backHandler = () => {
    prevStep();
  };

  return (
    <div className={` ${classes.wrapper}  `}>
      {currentStep === 1 && (
        <ContactInfoForm
          submitHandler={contactSubmitHandler}
          isContactMountedBefore={isContactMountedBefore}
        />
      )}
      {currentStep === 2 && (
        <CreditCardForm
          backHandler={backHandler}
          submitHandler={creditCardSubmitHandler}
        />
      )}
    </div>
  );
};

export default CheckoutForm;
