import classes from "./MobileSideBar.module.css";

const MobileSideBar = (props) => {
  const show = props.showSideBar;

  const Backdrop = () => {
    return (
      <section
        className={`${classes.backdrop} ${
          show ? classes["show-backdrop"] : ""
        }`}
        onClick={props.sideBarHandler}
      ></section>
    );
  };

  const SideBarOverlay = () => {
    return (
      <div
        className={`${classes["side-bar-container"]}  ${
          show ? classes["show-side-bar"] : ""
        } `}
      >
        {props.children}
      </div>
    );
  };
  return (
    <div className="modal-wrapper">
      <Backdrop />
      <SideBarOverlay>{props.children}</SideBarOverlay>
    </div>
  );
};
export default MobileSideBar;
