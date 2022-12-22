import UsersItem from "./Users-Item";
import Card from "../../shared/components/UI-Elements/Card";
import Style from "./Users-List.module.css";

const UsersList = (props) => {
  //! if no user is found then we simply return a message
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  //* if there is even one user then we render the list of user using our UsersItem Component
  const listOfUsers = props.items.map((user) => {
    return <UsersItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places.length} />;
  });

  return <ul className={Style["users-list"]}>{listOfUsers}</ul>;
};

export default UsersList;
