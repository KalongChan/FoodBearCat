import {useRouter} from "next/router";
import {BsGithub, BsLinkedin} from "react-icons/bs";
import {HiOutlineMail} from "react-icons/hi";
import classes from "./Footer.module.css";

const Footer = () => {
  const router = useRouter();
  return (
    <div className={classes["footer"]}>
      <div className={classes["icons-row"]}>
        <div className={classes["icon"]}>
          <a
            href="https://github.com/KalongChan"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub />
          </a>
        </div>

        <div className={classes["icon"]}>
          <a
            href="https://www.linkedin.com/in/kalong-chan-03663217a"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
        </div>
        <div className={classes["icon"]}>
          <a href="mailto:cklong0133@gmail.com">
            <HiOutlineMail />
          </a>
        </div>
      </div>
      <div className={classes["footer-text"]}>
        Made by{" "}
        <a
          href="https://github.com/KalongChan"
          target="_blank"
          rel="noreferrer"
        >
          Kalong Chan
        </a>{" "}
      </div>
    </div>
  );
};
export default Footer;
