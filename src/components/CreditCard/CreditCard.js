import classes from "./CreditCard.module.css";

const CreditCard = ({cardNumber, cardHolder, expiryDate, ccv, flipCard}) => {
  const cardIconHandler = (cardNumber) => {
    let cardType = null;
    const valid = require("card-validator");
    const numberValidation = valid.number(cardNumber);
    if (numberValidation.card) {
      cardType = numberValidation.card.type;
    }
    switch (cardType) {
      case "visa":
        return "/img/CreditCard/visa.png";
      case "mastercard":
        return "/img/CreditCard/mastercard.png";
      default:
        return;
    }
  };

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
            <div className={classes["card-logo"]}>
              {cardIconHandler(cardNumber) && (
                <img
                  src={cardIconHandler(cardNumber)}
                  className={classes["card-chip"]}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className={classes["card-number"]}>
            {/* Add space every 4th number */}
            {cardNumber?.replace(/\d{4}(?=.)/g, "$& ")}
          </div>
          <div className={classes["card-second-row"]}>
            <div className={classes["card-holder"]}>{cardHolder}</div>
            <div className={classes["card-expiry"]}>
              {/* Add " / " every 2nd number */}
              {expiryDate?.replace(/\d{2}(?=.)/g, "$& / ")}
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
            <div className={classes["black-bar"]}></div>
          </div>

          <div className={classes["sign-bar"]}>
            <div className={classes["sign-area"]}>
              <span>{cardHolder}</span>
              <div className={classes["sign-color"]}></div>
              <div className={classes["sign-color"]}></div>
            </div>
            <div className={classes.ccv}>{ccv}</div>
          </div>
          <div className={classes["bottom-bar"]}>
            <div className={classes["empty-bar"]}></div>
            <div className={classes["empty-bar"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
