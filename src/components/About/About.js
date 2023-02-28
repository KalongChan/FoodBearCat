import CartContainer from "@/UI/CartContainer/CartContainer";
import Container from "@/UI/Container/Container";
import Image from "next/image";
import classes from "./About.module.css";

const About = () => {
  return (
    <Container>
      <div className={classes["about-title"]}>
        <h2>About</h2>
      </div>
      <div className={classes["about-info"]}>
        <div className={classes["image"]}>
          <Image
            src="/img/computer_programming_man.png"
            alt=""
            width={280}
            height={254}
          ></Image>
        </div>
        <div className={classes["about-text"]}>
          This is a food ordering website build with Next.js, Redux, and MongoDB
          by{" "}
          <a
            href="https://github.com/KalongChan"
            target="_blank"
            rel="noreferrer"
          >
            Kalong Chan
          </a>{" "}
          to enhance his coding skills.
        </div>
      </div>
    </Container>
  );
};
export default About;
