import { db } from "./Firebase/fiirebase";
import React, { createRef } from "react";
import { collection, addDoc } from "firebase/firestore";

const Addata = () => {
  const refin = createRef();
  async function valiate(e) {
    e.preventDefault();
    let data = refin.current.value;

    await addDoc(collection(db, "product"), {
      data,
      completed: false,
    });
  }
  return (
    <div>
      <form onSubmit={valiate}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="h-12 w-full mb-5 md:mb-0 md:w-[48%] mr-4 p-4 "
          required
          ref={refin}
        />
        <button className="buttons">Submit</button>
      </form>
    </div>
  );
};

export default Addata;
