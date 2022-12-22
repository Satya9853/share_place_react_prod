import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

import MainHeader from "./Main-Header";
import Navlinks from "./Navlinks";
import SideDrawer from "./Side-Drawer";
import Style from "./Main-Navigation.module.css";
import Backdrop from "../UI-Elements/Backdrop";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const DrawerHandler = (event) => {
    event.preventDefault();
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={DrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={DrawerHandler}>
        <nav className={Style["main-navigation__drawer-nav"]}>
          <Navlinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className={Style["main-navigation__menu-btn"]} onClick={DrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={Style["main-navigation__title"]}>
          <Link to="/">Your Places</Link>
        </h1>
        <nav className={Style["main-navigation__header-nav"]}>
          <Navlinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
