import { useEffect, useState } from "react";
import React from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase/fiirebase";
const Fetchdata = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "product"));
    const unsub = onSnapshot(q, (querysnashot) => {
      let arr = [];
      querysnashot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setData(arr);
    });
    return () => unsub();
  }, []);
  return <div></div>;
};

export default Fetchdata;
