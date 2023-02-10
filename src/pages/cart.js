import {useDispatch, useSelector} from "react-redux";
import {removeAllItems} from "../store/cartSlice";

import CartItems from "../components/CartItems/CartItems";
import classes from "../styles/pagesStyles/cart.module.css";
import CartContainer from "@/UI/CartContainer/CartContainer";
import Link from "next/link";
import {Fade} from "react-awesome-reveal";
import {Fragment} from "react";
import Image from "next/image";

function cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const removeAllHandler = () => {
    dispatch(removeAllItems());
  };

  const cartHasItem = items.length !== 0;
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Fade>
      {!cartHasItem && (
        <div className={classes.empty}>
          <Image
            src="/img/shopping_cart_woman.png"
            alt=""
            height={400}
            width={400}
          ></Image>
          <h2>Your Cart is Empty</h2>
        </div>
      )}
      {cartHasItem && (
        <div className={classes.cart}>
          <CartContainer>
            <div className={classes["cart-title"]}>
              <h2>Shopping Cart</h2>
              <button className={classes.button} onClick={removeAllHandler}>
                Remove All
              </button>
            </div>

            {items.map((item) => (
              <CartItems
                key={item._id}
                _id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            ))}
            <h2 className={classes["total-amount"]}>Total: ${totalAmount}</h2>
            <div className={classes["check-out-group"]}>
              <Link
                href="/"
                className={`${classes["back-button"]} ${classes["check-out-btn"]}`}
              >
                Order More
              </Link>
              <Link
                href="/checkout"
                className={`${classes.button} ${classes["check-out-btn"]}`}
              >
                Check Out
              </Link>
            </div>
          </CartContainer>
        </div>
      )}
    </Fade>
  );
}

export default cart;
