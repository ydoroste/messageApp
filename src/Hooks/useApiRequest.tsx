import { useState, useEffect } from "react";
import axios from "axios";

const useApiRequest = (
  getThreadMessagesApi: () => Promise<unknown>,
  params
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getThreadMessagesApi(params);
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, isError };
};

export default useApiRequest;
