import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
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
        const q = query(ref, orderBy("productname", "asc"));
        onSnapshot(q, (querysnashot) => {
          let arr = [];
          querysnashot.forEach((doc) => {
            arr.push({ id: doc.id, ...doc.data() });
          });
          setLoadeddata(arr);
        });
        setIsPending(false);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);
  return { isPending, error, loadeddata };
};
