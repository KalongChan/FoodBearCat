import CheckoutCart from "@/components/CheckoutCart/CheckoutCart";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import OrderComplete from "@/components/OrderComplete/OrderComplete";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import classes from "@/styles/pagesStyles/chekoutPage.module.css";
import CartContainer from "@/UI/CartContainer/CartContainer";
import {useState} from "react";
import {Fade} from "react-awesome-reveal";

function CheckOut() {
  const initialSteps = [
    {step: "1", text: "Contact Info"},
    {step: "2", text: "Payment"},
    {step: "3", text: "Complete"},
  ];
  const [steps, setSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Fade>
      <ProgressBar
        steps={steps}
        prevStep={prevStep}
        nextStep={nextStep}
        currentStep={currentStep}
      />
      <CartContainer>
        <div className={classes.checkOut}>
          <CheckoutForm
            prevStep={prevStep}
            nextStep={nextStep}
            currentStep={currentStep}
          />
          {currentStep < 3 && <CheckoutCart />}
        </div>
        {currentStep === 3 && <OrderComplete />}
      </CartContainer>
    </Fade>
  );
}

export default CheckOut;
