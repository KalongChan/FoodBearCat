import Image from "next/image";
import {useDispatch} from "react-redux";
import {updateQuantity, removeItem} from "../../store/cartSlice";
import classes from "./CartItems.module.css";

const CartItems = ({
  index,
  _id,
  name,
  category,
  description,
  price,
  image,
  quantity,
}) => {
  const dispatch = useDispatch();

  const increaseHandler = () =>
    dispatch(
      updateQuantity({
        _id,
        name,
        category,
        description,
        price,
        image,
        quantity: quantity + 1,
      })
    );
  const decreaseHandler = () =>
    dispatch(
      updateQuantity({
        _id,
        name,
        category,
        description,

        price,
        image,
        quantity: quantity - 1,
      })
    );

  const removeItemHandler = () => dispatch(removeItem({_id}));

  return (
    <div className={`${classes.items} ${index % 2 === 0 ? classes.even : ""}`}>
      <div className={classes.left}>
        <div>
          <Image src={image} alt="" height={150} width={150}></Image>
        </div>
        <div className={classes.info}>
          <h3 className={classes.name}>{name}</h3>
          <div className={classes.subtotal}>
            <span className={classes.quantity}>{quantity}</span>
            {` x $${price}`}
          </div>
        </div>
      </div>
      <div className={classes["btn-group"]}>
        <div className={classes["qty-btn"]}>
          <button onClick={decreaseHandler}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseHandler}>+</button>
        </div>
        <button className={classes["remove-btn"]} onClick={removeItemHandler}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default CartItems;
