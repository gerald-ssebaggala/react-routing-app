import { useState } from "react";
import { useFetchData } from "./useFetchData";
import { UserComment } from "../dataTypes";

export function useFetchComments(itemsPerPage: number, postId?: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    fetchedData: comments,
    status,
    error,
    totalPosts,
  } = useFetchData<UserComment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}&_page=${currentPage}&_limit=${itemsPerPage}`
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
    comments,
    status,
    error,
    hasNextPage,
    hasPrevPage,
    handleNextPage,
    handlePrevPage,
  };
}
