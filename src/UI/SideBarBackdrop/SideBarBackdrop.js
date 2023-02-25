import classes from "./SideBarBackdrop.module.css";

const SideBarBackdrop = (props) => {
  return (
    <div
      className={`${classes.backdrop} ${
        props.showSideBar ? classes.active : ""
      }`}
      onClick={props.sideBarHandler}
    >
      {props.children}
    </div>
  );
};
export default SideBarBackdrop;
