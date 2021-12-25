import { useState, useCallback } from "react";

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  async function fetchURL(url) {
    setLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false)
      return data;
    }

    catch(e) {
      setLoading(false)
      setError(e.message)
      throw e;
    }
  
}

  
}