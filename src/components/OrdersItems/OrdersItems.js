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
          <div className={classes.id}>
            {<span>#</span>}
            {`${id}`}
          </div>
          <div className={classes.time}>{convertDate(orderTime)}</div>
          <div className={classes.time}>{convertTime(orderTime)}</div>
        </div>
        <div className={classes["mobile-price"]}>{`$${totalAmount}`}</div>
      </div>
      <div className={classes.center}>
        {items.map((item) => (
          <div className={classes.item}>
            <div className={classes["item-left"]}>
              <Image
                // src="/img/shopping_cart_woman.png"
                src={item.image}
                alt=""
                height={200}
                width={200}
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