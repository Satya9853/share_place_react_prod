import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);

    // on Each http request we are creating new abort control and adding it to activeHttpRequest
    const httpAbortController = new AbortController();
    activeHttpRequest.current.push(httpAbortController);

    try {
      const response = await fetch(url, { method, body, headers, signal: httpAbortController.signal });
      const responseData = await response.json();
      // here we are clearing the active request control on sucessfull response
      activeHttpRequest.current = activeHttpRequest.current.filter((reqCtrl) => reqCtrl !== httpAbortController);
      if (!response.ok) throw new Error(responseData.message);
      setIsLoading(false);
      return responseData;
    } catch (error) {
      setError(error.message || "Something went wrong please try again");
      setIsLoading(false);

      throw error;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const cleanUpFunction = () => {
      activeHttpRequest.current.forEach((abortControl) => abortControl.abort());
    };
    return cleanUpFunction;
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
