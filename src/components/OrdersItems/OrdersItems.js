import Image from "next/image";
import {useDispatch} from "react-redux";
import {updateQuantity, removeItem} from "../../store/cartSlice";
import classes from "./OrdersItems.module.css";

const CartItems = ({index, id, orderTime, items, totalAmount, status}) => {
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    // const hours = date.getHours().toString().padStart(2, "0");
    // const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const convertTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  };

  return (
    <div className={`${classes.items} ${index % 2 === 0 ? classes.even : ""}`}>
      <div className={classes.left}>
        {/* <div>
          <Image
            // src={`/img/Menu/${index}.jpg`}
            src="/img/delivery_jitensya.png"
            alt=""
            height={150}
            width={150}
          ></Image>
        </div> */}
        <div className={classes.info}>
          <h3 className={classes.name}>{`Order Id ${id}`}</h3>
          <div className={classes.subtotal}>{convertDate(orderTime)}</div>
          <div className={classes.subtotal}>{convertTime(orderTime)}</div>
        </div>
      </div>
      <div className={classes.center}>
        {items.map((item) => (
          <div>
            <div>{item.name}</div>
            <div>
              {item.quantity} {item.price}
            </div>
          </div>
        ))}
      </div>
      <div className={classes.right}>{`$${totalAmount}`}</div>
    </div>
  );
};
export default CartItems;
