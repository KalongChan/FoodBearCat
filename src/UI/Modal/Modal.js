import classes from "./Modal.module.css";

const Modal = (props) => {
  const clickOnBackdrop = () => {
    props.setShowModal(!props.showModal);
  };

  const Backdrop = () => {
    return (
      <section className={classes.backdrop} onClick={clickOnBackdrop}></section>
    );
  };

  const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    );
  };
  return (
    <div className="modal-wrapper">
      <Backdrop />
      <ModalOverlay>{props.children}</ModalOverlay>
    </div>
  );
};
export default Modal;
