import CheckoutCart from "@/components/CheckoutCart/CheckoutCart";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import classes from "@/styles/pagesStyles/chekoutPage.module.css";
import CartContainer from "@/UI/CartContainer/CartContainer";
import {Fade} from "react-awesome-reveal";

function checkout() {
  return (
    <Fade>
      <CartContainer>
        <div className={classes.checkOut}>
          <CheckoutForm />
          <CheckoutCart />
        </div>
      </CartContainer>
    </Fade>
  );
}

export default checkout;
