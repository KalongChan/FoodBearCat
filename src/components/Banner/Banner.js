import classes from "./Banner.module.css";
import Image from "next/image";
import Container from "../../UI/Container/Container";
import {Slide} from "react-awesome-reveal";

const Banner = () => {
  const orderNow = () => {
    window.scrollTo({
      top: document.getElementById("menu").offsetTop - 50,
      behavior: "smooth",
    });
  };

  return (
    <div className={classes.introduce}>
      <Container>
        <div className={classes["hero-content"]}>
          <div className={classes["hero-title"]}>
            <Slide>
              <h2>Are you hungry?</h2>
              <h2>
                Order food to your door <span>NOW!</span>
              </h2>
              <div className={classes["hero-button"]}>
                <button className={classes["main-button"]} onClick={orderNow}>
                  Order Now
                </button>
                <button className={classes["sub-button"]} onClick={orderNow}>
                  View All Foods
                </button>
              </div>
            </Slide>
          </div>
          <div className={classes["hero-image"]}>
            <Slide direction>
              <Image
                src="/img/delivery_jitensya.png"
                alt=""
                width={400}
                height={400}
              ></Image>
            </Slide>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Banner;
