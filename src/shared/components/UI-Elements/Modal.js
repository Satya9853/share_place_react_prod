import { Fragment } from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import Style from "./Modal.module.css";

const ModalOverlay = (props) => {
  const content = (
    <div className={`${Style.modal} ${props.className}`} style={props.style}>
      <header className={`${Style["modal__header"]} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className={`${Style["modal__content"]} ${props.contentClass}`}>{props.children}</div>
        <footer className={`${Style["modal__footer"]} ${props.footerClass}`}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDom.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={{
          enter: Style["modal-enter"],
          enterActive: Style["modal-enter-active"],
          exit: Style["modal-exit"],
          exitActive: Style["modal-exit-active"],
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
