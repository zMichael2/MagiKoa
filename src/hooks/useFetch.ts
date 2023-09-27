import { useState } from "react";
import { BASE_URL } from "../constants";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null | string;
}

const useFetch = <T>() => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async (url: string, method: string = "GET", body?: any) => {
    setFetchState({ ...fetchState, loading: true });
    try {
      setFetchState((prevState) => ({ ...prevState, loading: true }));
      console.log(body, "body");
      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: T = await response.json();
      setFetchState({ data, loading: false, error: null });
    } catch (error) {
      setFetchState({
        data: null,
        loading: false,
        error: "Hubo un problema en el servidor",
      });
    }
  };

  return { ...fetchState, fetchData };
};

export default useFetch;
