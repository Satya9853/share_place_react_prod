import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";

import PlaceList from "../components/Place-List";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const sendHttpRequest = async () => {
      try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`;
        const responseData = await sendRequest(URL);
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    sendHttpRequest();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId));
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList user={userId} items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
    </Fragment>
  );
};

export default UserPlaces;
