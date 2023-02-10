import classes from "./CartContainer.module.css";

const CartContainer = ({children}) => {
  return (
    <div className={classes["outer-container"]}>
      <div className={classes.container}>{children}</div>
    </div>
  );
};
export default CartContainer;
