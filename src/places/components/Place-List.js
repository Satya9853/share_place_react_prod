import { useContext } from "react";

import Card from "../../shared/components/UI-Elements/Card";
import PlaceItem from "./Place-Item";
import Button from "../../shared/components/Form-Elements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import Style from "./Place-List.module.css";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);

  //! if No Items or places are found
  const message = auth.userID === props.user ? "No places found. Maybe create one?" : "No Place was found...";

  if (props.items.length === 0) {
    return (
      <div className={`${Style["place-list"]} ${Style["center"]}`}>
        <Card className={Style["layout"]}>
          <h2>{message}</h2>
          {auth.userID === props.user && <Button to="/places/new">Share Place</Button>}
        </Card>
      </div>
    );
  }
  //* if we found places then we render the list of places
  const PlacesList = props.items.map((place) => {
    return (
      <PlaceItem
        key={place.id}
        id={place.id}
        image={place.image}
        title={place.title}
        description={place.description}
        address={place.address}
        creatorId={place.creator}
        coordinates={place.location}
        onDelete={props.onDeletePlace}
      />
    );
  });
  return <ul className={Style["place-list"]}>{PlacesList}</ul>;
};

export default PlaceList;
