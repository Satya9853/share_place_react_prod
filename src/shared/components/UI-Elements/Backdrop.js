import ReactDom from "react-dom";

import Style from "./Backdrop.module.css";

const Backdrop = (props) => {
  const content = <div className={Style.backdrop} onClick={props.onClick}></div>;
  return ReactDom.createPortal(content, document.getElementById("backdrop-hook"));
};

export default Backdrop;
