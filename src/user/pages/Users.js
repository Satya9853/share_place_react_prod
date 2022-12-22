import { Fragment, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import UsersList from "../components/Users-List";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState(undefined);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const sendHttpRequest = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);

        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    sendHttpRequest();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
