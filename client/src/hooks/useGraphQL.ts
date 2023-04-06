import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Options {
  query: string;
  headers: { Authorization?: string; "Content-Type": "application/json" };
  baseUrl: string;
  url?: string;
}

function useGraphQL<T>(options: Options) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [statusCode, setStatusCode] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const doRequest = useCallback(() => {
    setIsLoading(true);
    axios
      .post(
        options?.url || "/",
        { query: options.query },
        {
          baseURL: options.baseUrl,
          headers: options.headers,
        }
      )
      .then((response) => {
        const { data: graphQlData } = response.data;
        setStatusCode(response.status);
        setData(graphQlData);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [options]);

  return {
    doRequest,
    isLoading,
    statusCode,
    data,
    error,
  };
}

export default useGraphQL;
