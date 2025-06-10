import { useState, useCallback } from "react";
import { endpoints } from "../endpoint";
import axiosClient from "../axiosClient";

export const useSkipsByLocation = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchSkipsByLocation = useCallback(async (postcode, area) => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const response = await axiosClient.get(
        endpoints.slips.byLocation(postcode, area)
      );
      setData(response);
      return response;
    } catch (error) {
      setErrorMsg(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchSkipsByLocation, data, isLoading, errorMsg };
};

// more hooks here
