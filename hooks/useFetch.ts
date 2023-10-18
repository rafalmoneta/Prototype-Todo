import React from "react";
import axios from "axios";

interface QueryOptions {} // TODO: add type

export default function useFetch<T>(
  endpoint: string,
  query: Record<string, string>
) {
  const [data, setData] = React.useState<[T] | null>(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const options = {
    method: "GET",
    url: `https://zenquotes.io/api/${endpoint}`,
    params: { ...query },
  };

  const fetchData = React.useCallback(async (ignore: boolean) => {
    setIsLoading(true);

    if (ignore) return;

    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let ignore = false;

    fetchData(ignore);

    return () => {
      ignore = true;
    };
  }, [fetchData]);

  const refetch = () => {
    setIsLoading(true);
    fetchData(false);
  };

  return { data, error, isLoading, refetch };
}
