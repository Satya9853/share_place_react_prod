import { Fragment, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Card from "../../shared/components/UI-Elements/Card";
import Button from "../../shared/components/Form-Elements/Button";
import Modal from "../../shared/components/UI-Elements/Modal";
import Map from "../../shared/components/UI-Elements/Map";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import Style from "./Place-Item.module.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showMapHandler = (event) => {
    setShowMap(!showMap);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`;

    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      await sendRequest(URL, options.method, null, options.headers);
      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={showMapHandler}
        header={props.address}
        contentClass={Style["place-item__modal-content"]}
        footerClass={Style["place-item__modal-actions"]}
        footer={<Button onClick={showMapHandler}>CLOSE</Button>}
      >
        <div className={Style["map-container"]}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure"
        footerClass={Style["place-item__modal-actions"]}
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>Do you want to proceed and delete this place ? Please not that it can't br undone thereafter.</p>
      </Modal>
      <li className={Style["place-item"]}>
        <Card className={Style["place-item__content"]}>
          {isLoading && <LoadingSpinner asOverlay={true} />}
          <div className={Style["place-item__image"]}>
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
          </div>
          <div className={Style["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={Style["place-item__actions"]}>
            <Button inverse onClick={showMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userID === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {auth.userID === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
