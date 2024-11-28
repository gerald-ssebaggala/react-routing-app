import { useCallback, useEffect, useState } from "react";
import { DataFetchResult, FetchStatus } from "../dataTypes";

export function useDataFetch<T>(
  urlRoute: string,
  dataPerPage?: number,
  postId?: number
): DataFetchResult<T> {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0); //Total number of posts

  const fetchData = useCallback(async () => {
    setStatus("loading");

    const baseURL = "https://jsonplaceholder.typicode.com";

    let url: string;

    if (urlRoute === "comments" && postId) {
      url = `${baseURL}/${urlRoute}?postId=${postId}&_page=${currentPage}&_limit=${dataPerPage}`;
    } else if (urlRoute === "todos" && postId) {
      url = `${baseURL}/${urlRoute}?userId=${postId}&_page=${currentPage}&_limit=${dataPerPage}`;
    } else if (urlRoute === "posts" && dataPerPage && postId) {
      url = `${baseURL}/${urlRoute}?userId=${postId}&_page=${currentPage}&_limit=${dataPerPage}`;
    } else if ((urlRoute === "users" || urlRoute === "posts") && postId) {
      url = `${baseURL}/${urlRoute}/${postId}`;
    } else {
      url = `${baseURL}/${urlRoute}?_page=${currentPage}&_limit=${dataPerPage}`;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(url);

      if (!res.ok) {
        console.error("Network response wasn't okay.", res);
        setError(true);
        return;
      }

      const totalFetchedData = res.headers.get("X-Total-Count");

      const data = await res.json();
      setFetchedData(data);
      setStatus("success");
      setTotalPosts(totalFetchedData ? parseInt(totalFetchedData, 10) : 0);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, [urlRoute, currentPage, dataPerPage, postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let totalPages = 0; //declaring it as my initial value

  if (dataPerPage !== undefined) {
    totalPages = totalPosts > 0 ? Math.ceil(totalPosts / dataPerPage) : 0;
  }

  const hasNextPage = currentPage < totalPages;

  const hasPrevPage = currentPage > 1;

  const handleNextPage = () => {
    if (hasNextPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (hasPrevPage) setCurrentPage((prevPage) => prevPage - 1);
  };

  return {
    fetchedData,
    error,
    status,
    currentPage,
    totalPosts,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  };
}
