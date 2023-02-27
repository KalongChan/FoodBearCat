import classes from "./BackToTopButton.module.css";

const BackToTopButton = (props) => {
  const backToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  };

  return (
    <div
      className={`${classes["back-to-top"]} ${
        props.collaps ? classes["active"] : ""
      }`}
      onClick={backToTop}
    >
      <img src="img/up.png" alt="" />
    </div>
  );
};
export default BackToTopButton;
