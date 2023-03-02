import Image from "next/image";
import classes from "./OrdersItems.module.css";

const CartItems = ({index, id, orderTime, items, totalAmount, status}) => {
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
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
    <div className={`${classes.orders} ${index % 2 === 0 ? classes.even : ""}`}>
      <div className={classes.left}>
        <div className={classes.info}>
          <div className={classes.id}>{`${id}`}</div>
          <div className={classes.time}>{convertDate(orderTime)}</div>
          <div className={classes.time}>{convertTime(orderTime)}</div>
          <div
            className={`${classes.status} ${
              status === "Pending" ? classes.pending : ""
            }
            ${status === "Delivering" ? classes.delivering : ""}
            ${status === "Arrived" ? classes.arrived : ""}
            
            `}
          >
            {status}
          </div>
        </div>
        <div className={classes["mobile-price"]}>{`$${totalAmount}`}</div>
      </div>
      <div className={classes.center}>
        {items.map((item) => (
          <div className={classes.item} key={item.id}>
            <div className={classes["item-left"]}>
              <Image
                src={item.image}
                alt=""
                width="250"
                height="250"
                className={classes.image}
              ></Image>
            </div>
            <div className={classes["item-right"]}>
              <div className={classes["item-name"]}>{item.name}</div>
              <div className={classes["item-price"]}>
                {`${item.quantity} x $${item.price} = $${
                  item.quantity * item.price
                }`}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.right}>{`$${totalAmount}`}</div>
    </div>
  );
};
export default CartItems;
