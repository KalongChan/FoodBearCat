import classes from "./Info.module.css";
import Container from "../../UI/Container/Container";
import {BsClockFill, BsFillTelephoneFill} from "react-icons/bs";
import {ImLocation2} from "react-icons/im";

const Info = () => {
  return (
    <div className={classes.info}>
      <Container>
        <section className={classes["info-items"]}>
          <div className={classes["info-item"]}>
            <BsClockFill />
            <p>Open 24/7</p>
          </div>
          <div className={classes["info-item"]}>
            <ImLocation2 />
            <p>Wenshan, Taipei</p>
          </div>
          <div className={classes["info-item"]}>
            <BsFillTelephoneFill />
            <p>12345678</p>
          </div>
        </section>
        <section className={classes["info"]}>
          <h2 className={classes["info-topic"]}>
            Just sit back at home and eat
          </h2>
          <h3 className={classes["info-text"]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            magnam voluptates! Nihil recusandae ab tempore temporibus quod velit
            vitae animi dolorem asperiores porro iste explicabo officiis, alias,
            eaque aspernatur blanditiis?
          </h3>
        </section>
      </Container>
    </div>
  );
};
export default Info;
