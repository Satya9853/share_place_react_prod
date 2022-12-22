import Style from "./Main-Header.module.css";

const MainHeader = (props) => {
  return <header className={Style["main-header"]}>{props.children}</header>;
};

export default MainHeader;
