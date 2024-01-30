import { useRef } from "react";
import { useFetch } from "../../hook/usefetch";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { toast } from "react-toastify";
import Profile from "../profile/Profile";

const Checkout = () => {
  document.title = "Mobile Planet | Checkout";
  const { loadeddata, isPending } = useFetch("cart");
  let data;
  if (loadeddata) {
    data =
      loadeddata &&
      loadeddata.filter(
        (item) => item.itemdata.userid === localStorage.getItem("userid")
      );
  }

  const productdata = useFetch("product");
  let totalprice = 0;

  function addOrder() {}
  return (
    <div className="md:mx-20 mx-4 mt-10">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-[40%]">
          <Profile />
        </div>
        <div className="md:w-[40%]">
          <table width="100%">
            <thead className="text-center bg-[#efefef]">
              <tr>
                <td className="py-5">Your order Details</td>
                <td className="py-5">Price</td>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-5 border">Product </td>
                <td className="py-5 border">Total</td>
              </tr>
              {data.map((item) => {
                let productdatafiltered = productdata.loadeddata.filter(
                  (items) => items.id === item.itemdata.productid
                )[0];
                if (productdatafiltered) {
                  totalprice =
                    totalprice +
                    parseInt(productdatafiltered.productprice) *
                      parseInt(item.itemdata.quantity);
                }

                return (
                  <tr className="text-center" key={item.id}>
                    <td className="py-5 border">
                      {`${productdatafiltered.productname} * (${item.itemdata.quantity})`}
                    </td>
                    <td className="py-5 border">
                      {(
                        parseInt(productdatafiltered.productprice) *
                        parseInt(item.itemdata.quantity)
                      ).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              <tr className="text-center">
                <td className="py-5 border">SubTotal</td>
                <td className="py-5 border">{totalprice.toLocaleString()}</td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Shipping</td>
                <td className="py-5 border">0</td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Discount</td>
                <td className="py-5 border">
                  {localStorage.getItem("discountprice") === null
                    ? 0
                    : parseInt(
                        localStorage.getItem("discountprice")
                      ).toLocaleString()}
                </td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Total</td>
                <td className="py-5 border">
                  {(
                    totalprice -
                    parseInt(
                      localStorage.getItem("discountprice")
                        ? localStorage.getItem("discountprice")
                        : 0
                    )
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center items-center">
            <button
              className="buttons"
              onClick={() => {
                addOrder();
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
