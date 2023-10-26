import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loadeddata, setLoadeddata] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsPending(false);
        setError(null);
        let dataarray = [];
        for (const key in json) {
          dataarray.push({
            id: key,
            data: json[key],
          });
        }
        setLoadeddata(dataarray);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);
  return { isPending, error, loadeddata };
};
