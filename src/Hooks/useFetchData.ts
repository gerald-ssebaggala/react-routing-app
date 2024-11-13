import { useCallback, useEffect, useState } from "react";
import { FetchResult, FetchStatus } from "../dataTypes";

export function useFetchData<T>(url: string): FetchResult<T> {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
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

  return { fetchedData, error, status };
}
