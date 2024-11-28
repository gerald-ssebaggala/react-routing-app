import { useCallback, useEffect, useState } from "react";
import { FetchResult, FetchStatus } from "../dataTypes";


export function useFetchData<T>(
  url: string,
  initialDataPerPage: number = 12
): FetchResult<T> {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [paginatedData, setPaginatedData] = useState<T[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = initialDataPerPage;
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");

  const fetchData = useCallback(async () => {
    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(url);

      if (!res.ok) {
        console.error("Network response wasn't okay.", res);
        setError(true);
        return;
      }

      const data = await res.json();
      setFetchedData(data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (fetchedData && Array.isArray(fetchedData)) {
      const lastDataIndex = currentPage * dataPerPage;
      const firstDataIndex = lastDataIndex - dataPerPage;
      setPaginatedData(fetchedData.slice(firstDataIndex, lastDataIndex));
    }
  }, [currentPage, dataPerPage, fetchedData]);

  const totalPages =
    fetchedData && Array.isArray(fetchedData)
      ? Math.ceil(fetchedData.length / dataPerPage)
      : 0;
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
    paginatedData,
    error,
    status,
    currentPage,
    hasNextPage,
    hasPrevPage,
    handleNextPage,
    handlePrevPage,
  };
}
