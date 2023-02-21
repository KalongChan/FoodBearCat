import {Fragment} from "react";
import classes from "./CreditCard.module.css";

const CreditCard = ({cardNumber, cardHolder, expiryDate, ccv, flipCard}) => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div
          className={`${classes["card-front"]}`}
          style={
            flipCard
              ? {transform: "rotateY(180deg)"}
              : {transform: "rotateY(0deg)"}
          }
        >
          <div className={classes["card-row"]}>
            <img
              src="/img/CreditCard/chip.png"
              className={classes["card-chip"]}
              alt=""
            />
            <div className={classes["card-logo"]}>LOGO</div>
          </div>
          <div className={classes["card-number"]}>
            {/* Add space every 4th number */}
            {cardNumber.replace(/\d{4}(?=.)/g, "$& ")}
          </div>
          <div className={classes["card-second-row"]}>
            <div className={classes["card-holder"]}>{cardHolder}</div>
            <div className={classes["card-expiry"]}>
              {/* Add " / " every 2nd number */}
              {expiryDate.replace(/\d{2}(?=.)/g, "$& / ")}
            </div>
          </div>
        </div>
        <div
          className={classes["card-back"]}
          style={
            flipCard
              ? {transform: "rotateY(0deg)"}
              : {transform: "rotateY(180deg)"}
          }
        >
          <div className={classes["card-row"]}>
            <img
              src="/img/CreditCard/chip.png"
              className={classes["card-chip"]}
              alt=""
            />
            <div className={classes["card-logo"]}>LOGO</div>
          </div>
          <div className={classes["card-number"]}>
            {/* Add space every 4th number */}
            {cardNumber.replace(/\d{4}(?=.)/g, "$& ")}
          </div>
          <div className={classes["card-second-row"]}>
            <div className={classes["card-holder"]}>{cardHolder}</div>
            <div className={classes["card-expiry"]}>
              {/* Add " / " every 2nd number */}
              {expiryDate.replace(/\d{2}(?=.)/g, "$& / ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
