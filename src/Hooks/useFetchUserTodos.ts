import { useState } from "react";
import { useFetchData } from "./useFetchData";
import { UserTodo } from "../dataTypes";

export function useFetchUserTodos(itemsPerPage: number, userId?: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const { fetchedData: userTodos, totalPosts } = useFetchData<UserTodo[]>(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}&_page=${currentPage}&_limit=${itemsPerPage}`
  );

  let totalPages = 0;

  if (itemsPerPage !== undefined) {
    totalPages = totalPosts > 0 ? Math.ceil(totalPosts / itemsPerPage) : 0;
  }

  const hasNextPage = totalPages > currentPage;
  const hasPrevPage = currentPage > 1;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return {
    userTodos,
    hasNextPage,
    hasPrevPage,
    handleNextPage,
    handlePrevPage,
  };
}
