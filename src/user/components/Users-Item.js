import { Link } from "react-router-dom";
import Style from "./Users-Item.module.css";
import Avatar from "../../shared/components/UI-Elements/Avatar";
import Card from "../../shared/components/UI-Elements/Card";

const UsersItem = (props) => {
  return (
    <li className={Style["user-item"]}>
      <Card className={Style["user-item__content"]}>
        <Link to={`/${props.id}/places`}>
          <div className={Style["user-item__image"]}>
            <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
          </div>
          <div className={Style["user-item__info"]}>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersItem;
