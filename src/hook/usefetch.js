import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/fiirebase";

export const useFetch = (url) => {
  const [loadeddata, setLoadeddata] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const ref = collection(db, url);
        onSnapshot(ref, (querySnapshot) => {
          let arr = [];
          querySnapshot.forEach((doc) => {
            arr.push({ id: doc.id, ...doc.data() });
          });
          setLoadeddata(arr);
          setIsPending(false); // Move inside the onSnapshot callback
          setError(null); // Move inside the onSnapshot callback
        });
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);

  return { isPending, error, loadeddata };
};
