import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import User from "../components/User";
import { useFetchUsers } from "../Hooks/useFetchUsers";
import { UserList } from "../dataTypes";

export default function UsersPage() {
  const {
    users,
    error,
    handleNextPage,
    hasNextPage,
  } = useFetchUsers(6);

  const [allUsers, setAllUsers] = useState<UserList[]>([]);

  useEffect(() => {
    setAllUsers((prev) => {
      const result: UserList[] = [];

      prev.forEach((item) => {
        if (!result.find((existingItem) => existingItem.id == item.id))
          result.push(item);
      });

      if (users) {
        users.forEach((user) => {
          if (!result.find((existngUser) => existngUser.id == user.id))
            result.push(user);
        });
      }

      return result;
    });
  }, [users]);

  const usersList = allUsers?.map((user) => (
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
      {users && (
        <div className="users-btns">
          <button onClick={handleNextPage} disabled={!hasNextPage} className="view-more-btn">View More Users</button>
        </div>
      )}
    </div>
  );
}
