import Buttons from "../components/Buttons";
import LoadingSpinner from "../components/LoadingSpinner";
import User from "../components/User";
import { UserList } from "../dataTypes";
import { useDataFetch } from "../Hooks/useDataFetch";

export default function UsersPage() {
  // const { fetchedData: users, error } = useFetchData<UserList[]>(
  //   "https://jsonplaceholder.typicode.com/users"
  // );

  const {
    fetchedData: users,
    error,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  } = useDataFetch<UserList[]>("users", 6);

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
      {users && <div className="users-btns">
        <Buttons
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>}
    </div>
  );
}
