import LoadingSpinner from "../components/LoadingSpinner";
import User from "../components/User";
import { UserList } from "../dataTypes";
import { useFetchData } from "../Hooks/useFetchData";

export default function UsersPage() {
  const { fetchedData: users, error } = useFetchData<UserList[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  const usersList = users?.map((user) => (
    <User
      key={user.id}
      id={user.id}
      name={user.name}
      website={user.website}
      company={user.company}
      email={user.email}
    />
  ));

  return (
    <div className="users-container">
      <h1>Users</h1>
      {!error && !users && <LoadingSpinner />}
      {users && <div className="users">{usersList}</div>}
      {error && <div>Something is wrong</div>}
    </div>
  );
}
