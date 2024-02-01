import {
  notifyerroraddingcart,
  notifylogintoaccess,
  notifyproductaddded,
  notifyquantityupdated,
} from "./toast";

import { v4 as uuidv4 } from "uuid";
import { db } from "./Firebase/fiirebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
export function removeCouponFromLocalStorage() {
  Object.keys(localStorage)
    .filter((item) => item.includes("discount"))
    .map((item) => localStorage.removeItem(item));
}
export function getUserID() {
  return localStorage.getItem("userid");
}
export function filterDataWithUserId(loadeddata) {
  return loadeddata.filter((item) => item.userid === getUserID());
}
export async function addtocart(productid, cartdata) {
  let userid = getUserID();
  let isdatarepeat = false;
  let idtoupdate;
  let previousquantity = 0;
  if (userid) {
    cartdata.loadeddata.map((data) => {
      console.log(data);
      if (data.productid === productid) {
        previousquantity = data.quantity;
        console.log(data.quantity);
        isdatarepeat = true;
        idtoupdate = data.id;
        console.log(data.id);
      }
    });
    if (isdatarepeat) {
      if (idtoupdate != null) {
        const getdocofcart = doc(db, "cart", idtoupdate);

        await updateDoc(getdocofcart, {
          id: uuidv4(),
          userid: userid,
          productid: productid,
          quantity: previousquantity + 1,
        });
        notifyquantityupdated();
      }
    } else {
      await addDoc(collection(db, "cart"), {
        id: uuidv4(),
        userid: userid,
        productid: productid,
        quantity: 1,
      }).then((res) => {
        if (res._key.path.segments[1] != null) {
          // props.onchange();
          notifyproductaddded();
        } else {
          notifyerroraddingcart();
        }
      });
    }
  } else {
    notifylogintoaccess();
  }
}
