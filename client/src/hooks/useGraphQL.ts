import axios from "axios";
import { useEffect, useMemo, useState } from "react";

interface Options {
  params?: { [key: string]: string | number };
  data?: { [key: string]: string | number | FormData };
  headers: { Authorization?: string };
  baseUrl: string;
  url: string;
}

function useGraphQL<T>(options: Options) {
  const [data, setData] = useState<Partial<T> | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [statusCode, setStatusCode] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const get = useMemo(() => {
    setIsLoading(true);
    axios
      .get(options.url, {
        baseURL: options.baseUrl,
        headers: options.headers,
        data: options.data,
        params: options.params,
      })
      .then((response) => {
        setStatusCode(response.status);
        setData(response.data || null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [options]);

  const post = useMemo(() => {
    const dataRequest = { ...options.data };
    setIsLoading(true);
    axios
      .post(options.url, dataRequest, {
        baseURL: options.baseUrl,
        headers: options.headers,
        params: options.params,
      })
      .then((response) => {
        setStatusCode(response.status);
        setData(response.data || null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [options]);

  const put = useMemo(() => {
    const dataRequest = { ...options.data };
    setIsLoading(true);
    axios
      .put(options.url, dataRequest, {
        baseURL: options.baseUrl,
        headers: options.headers,
        params: options.params,
      })
      .then((response) => {
        setStatusCode(response.status);
        setData(response.data || null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [options]);

  const del = useMemo(() => {
    setIsLoading(true);
    axios
      .delete(options.url, {
        baseURL: options.baseUrl,
        headers: options.headers,
        params: options.params,
      })
      .then((response) => {
        setStatusCode(response.status);
        setData(response.data || null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [options]);

  return {
    get,
    post,
    put,
    del,
    isLoading,
    statusCode,
    data,
    error,
  };
}
