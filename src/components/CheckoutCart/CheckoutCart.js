import {useSelector} from "react-redux";
import Image from "next/image";
import classes from "./CheckoutCart.module.css";

const CheckoutCart = () => {
  const items = useSelector((state) => state.cart.items);
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={classes["check-out-cart"]}>
      {/* Item Description */}
      <div className={classes["cart-items"]}>
        {items.map((item) => (
          <div className={classes["cart-item"]} key={item._id}>
            <div className={classes["cart-left"]}>
              <div className={classes["item-image"]}>
                <Image
                  // src={`/img/Menu/${index}.jpg`}
                  src="/img/delivery_jitensya.png"
                  alt=""
                  height={80}
                  width={80}
                ></Image>
                <span className={classes["cart-number"]}>{item.quantity}</span>
              </div>
              <div className={classes["item-name"]}>{item.name}</div>
            </div>
            <div className={classes["item-right"]}>${item.price}</div>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className={classes["sub-total"]}>
        <div className={classes["sub-item"]}>
          <div>Subtotal</div>
          <div>{`$${totalAmount}`}</div>
        </div>
        <div className={classes["sub-item"]}>
          <div>Delivery Fee</div>
          <div>Free</div>
        </div>
      </div>
      <div className={classes["sub-total"]}>
        <div className={classes["sub-item"]}>
          <div>Total</div>
          <div>{`$${totalAmount}`}</div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutCart;
