import {Fragment} from "react";
import classes from "./ProgressBar.module.css";

const ProgressBar = ({steps, currentStep}) => {
  const progressPercentage = `${
    ((currentStep - 1) / (steps.length - 1)) * 100
  }%`;

  return (
    <div className={classes["wrapper"]}>
      <div className={classes.container}>
        <div className={classes["progress-container"]}>
          <div
            className={classes.progress}
            style={{width: progressPercentage}}
          ></div>
          {steps.map((step) => (
            <Fragment key={step.step}>
              <div
                className={`${classes.circle} ${
                  currentStep >= step.step ? classes.active : ""
                }`}
              >
                {step.step}
              </div>
            </Fragment>
          ))}
        </div>
        <div className={classes["text-container"]}>
          {steps.map((step) => (
            <Fragment key={step.text}>
              <div
                className={` ${classes.text} 
                ${
                  currentStep.toString() === step.step.toString()
                    ? classes["text-active"]
                    : ""
                }`}
              >
                {step.text}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
