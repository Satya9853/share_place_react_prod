import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Style from "./Navlinks.module.css";

const Navlinks = () => {
  const auth = useContext(AuthContext);
  return (
    <ul className={Style["nav-links"]}>
      <li>
        <NavLink to="/" exact={true} activeClassName={Style.active}>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userID}/places`} activeClassName={Style.active}>
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new" activeClassName={Style.active}>
            ADD PLACES
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" activeClassName={Style.active}>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default Navlinks;
