import { useHistory, useParams } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Input from "../../shared/components/Form-Elements/Input";
import Button from "../../shared/components/Form-Elements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/Validator";
import Card from "../../shared/components/UI-Elements/Card";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import Style from "./PlaceForm.module.css";

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const auth = useContext(AuthContext);

  const [loadedPlace, setLoadedPlace] = useState(undefined);

  const history = useHistory();

  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    true
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const sendHttpRequest = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);

        setLoadedPlace(responseData.place);
        setFormData(
          { title: { value: responseData.place.title, isValid: true }, description: { value: responseData.place.description, isValid: true } },
          true
        );
      } catch (error) {}
    };
    sendHttpRequest();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`;

    const updatePlaceData = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    };

    const options = {
      method: "PATCH",
      body: JSON.stringify(updatePlaceData),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
    };

    try {
      await sendRequest(URL, options.method, options.body, options.headers);
      history.push(`/${auth.userID}/places`); // later get the userID and redirect to userID place
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h1>Could not find place...!</h1>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className={Style["place-form"]} onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Valid title"
            onInput={inputChangeHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter a Valid description (min 5 characters .)"
            onInput={inputChangeHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePlace;
