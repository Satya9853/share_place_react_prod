import { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Input from "../../shared/components/Form-Elements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/Validator";
import Button from "../../shared/components/Form-Elements/Button";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/Form-Elements/ImageUpload";
import Style from "./PlaceForm.module.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);

  const [formState, inputChangeHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/places`;

    // creating a formData to  send a  image file  to the backend in the request

    const placeData = new FormData();
    placeData.append("title", formState.inputs.title.value);
    placeData.append("description", formState.inputs.description.value);
    placeData.append("address", formState.inputs.address.value);
    placeData.append("image", formState.inputs.image.value);

    const options = {
      method: "POST",
      body: placeData,
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    try {
      const responseData = await sendRequest(URL, options.method, options.body, options.headers);
      console.log(responseData);
      // redirect user to different page
      history.push("/");
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <form className={Style["place-form"]} onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputChangeHandler}
        />

        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputChangeHandler}
        />

        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputChangeHandler}
        />
        <ImageUpload id="image" onInput={inputChangeHandler} errorText="Please provide and image." />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
