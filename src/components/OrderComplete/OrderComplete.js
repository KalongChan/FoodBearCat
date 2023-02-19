import classes from "./OrderComplete.module.css";

const OrderComplete = (props) => {
  return (
    <div className={classes.btns}>
      <div className={classes.back} onClick={props.backHandler}>
        &lt; Back To Last Step
      </div>
      <button type="submit">Next Step</button>
    </div>
  );
};

export default OrderComplete;
