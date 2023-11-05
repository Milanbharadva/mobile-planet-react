import { useEffect, useState } from "react";
import React from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Firebase/fiirebase";

const Editdata = () => {
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

  const edit = async (todo, title) => {
    await updateDoc(doc(db, "product", todo.id), {
      title: title,
    });
  };

  const toggle = async (todo) => {
    await updateDoc(doc(db, "product", todo.id), {
      completed: !todo.completed,
    });
  };
  const deleted = async (id) => {
    await deleteDoc(doc(db, "product", id));
  };

  return <div></div>;
};

export default Editdata;
