import { User } from "../dataTypes";
import { useFetchData } from "./useFetchData";

export function useFetchUser(userId?: number) {
    
  const { fetchedData: user, error } = useFetchData<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return { user, error };
}
