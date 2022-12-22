import { useState, useContext, Fragment } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Card from "../../shared/components/UI-Elements/Card";
import Input from "../../shared/components/Form-Elements/Input";
import Button from "../../shared/components/Form-Elements/Button";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import ImageUpload from "../../shared/components/Form-Elements/ImageUpload";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/Validator";
import { AuthContext } from "../../shared/context/auth-context";
import Style from "./Auth.module.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({ ...formState.inputs, name: undefined, image: undefined }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({ ...formState.inputs, name: { value: "", isValid: false }, image: { value: null, isValid: false } }, false);
    }
    setIsLoginMode((prev) => !prev);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    let userData;
    let URL;
    if (isLoginMode) {
      URL = `${process.env.REACT_APP_BACKEND_URL}/users/login`;

      userData = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      userData = JSON.stringify(userData);
    } else {
      /// in case of singup

      URL = `${process.env.REACT_APP_BACKEND_URL}/users/signup`;
      // creating new formData only in signup because it involves images which are not json but binary
      userData = new FormData();
      userData.append("name", formState.inputs.name.value);
      userData.append("email", formState.inputs.email.value);
      userData.append("password", formState.inputs.password.value);
      userData.append("image", formState.inputs.image.value);
    }

    const options = {
      method: "POST",
      headers: isLoginMode ? { "Content-Type": "application/json" } : {}, // fetch automatically sets headers when we use FormData()
      body: userData,
    };

    try {
      const responseData = await sendRequest(URL, options.method, options.body, options.headers);

      auth.login(responseData.user.id, responseData.token);
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className={Style["authentication"]}>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <h2>Login Rerquired</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="USER NAME"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter a Name"
              onInput={inputChangeHandler}
            />
          )}
          {!isLoginMode && <ImageUpload id="image" center={true} onInput={inputChangeHandler} errorText="Please upload an image" />}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please Enter a valid email address"
            onInput={inputChangeHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="PASSWORD"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please Enter a valid email password, at least 6 characters"
            onInput={inputChangeHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "SWITCH TO SIGN UP MODE" : "SWITCH TO LOGIN MODE"}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;
