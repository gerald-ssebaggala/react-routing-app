import { useState } from "react";
import { useFetchData } from "./useFetchData";
import { UserTodo } from "../dataTypes";

export function useFetchTodos(itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    fetchedData: todos,
    status,
    error,
    totalPosts,
  } = useFetchData<UserTodo[]>(
    `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${itemsPerPage}`
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
    todos,
    status,
    error,
    hasNextPage,
    hasPrevPage,
    handleNextPage,
    handlePrevPage,
  };
}
