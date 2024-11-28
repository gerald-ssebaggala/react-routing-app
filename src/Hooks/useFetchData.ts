import { useCallback, useEffect, useState } from "react";
import { FetchResult, FetchStatus } from "../dataTypes";

export function useFetchData<T>(url: string): FetchResult<T> {
  
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [totalPosts, setTotalPosts] = useState(0);

  //fetch data und run everytime url changes

  const fetchData = useCallback(async () => {
    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch(url);

      if (!res.ok) {
        console.error("Network response wasn't okay.", res);
        setError(true);
        return;
      }

      const totalFetchedData = res.headers.get("X-Total-Count"); // retriving some info from the headers of the http response

      const data = await res.json();

      setFetchedData(data);

      setStatus("success");

      setTotalPosts(totalFetchedData ? parseInt(totalFetchedData, 10) : 0);
    } catch (err) {
      console.error(err);

      setError(true);
    }
  }, [url]);

  // help me handle the fetching operations occuring outside react

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    fetchedData,
    error,
    status,
    totalPosts,
  };
}
