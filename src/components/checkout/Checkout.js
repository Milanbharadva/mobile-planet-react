import { useRef } from "react";
import { useFetch } from "../../hook/usefetch";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import Profile from "../profile/Profile";
import {
  filterDataWithUserId,
  getUserID,
  removeCouponFromLocalStorage,
} from "../../global";
import { useNavigate } from "react-router-dom";
import { orderSucessfull, orderplaceerror } from "../../toast";

const Checkout = () => {
  let userid = getUserID();
  const navigate = useNavigate();

  document.title = "Mobile Planet | Checkout";
  const { loadeddata, isPending } = useFetch("cart");
  let data;
  if (loadeddata) {
    data = loadeddata && filterDataWithUserId(loadeddata);
  }
  const productdata = useFetch("product");
  let totalprice = 0;
  let orderobj = {};
  async function addOrder() {
    let filteredproductdata = data.map(
      (item) =>
        productdata.loadeddata.filter(
          (items) => items.id === item.productid
        )[0]
    );
    let discountcode = localStorage.getItem("discountcode") || "";
    let discountprice = localStorage.getItem("discountprice") || "";
    let discountbyanddiscount =
      localStorage.getItem("discountbyanddiscount") || "";

    filteredproductdata.map(
      (item, index) => (orderobj[`product${index + 1}`] = item.id)
    );
    data.map(
      (item, index) => (orderobj[`cartitem${index + 1}`] = item.itemdata)
    );
    orderobj["orderdate"] = Date.parse(new Date());
    orderobj["totalprice"] = totalprice;
    if (discountcode !== "") {
      orderobj["discountprice"] = discountprice;
      orderobj["discountbyanddiscount"] = discountbyanddiscount;
      orderobj["totalpricetopay"] =
        parseInt(totalprice) - parseInt(discountprice);
    }
    await addDoc(collection(db, "orders"), orderobj).then((res) => {
      if (res._key.path.segments[1]) {
        orderSucessfull();
        data.map(async (item) => {
          await deleteDoc(doc(db, "cart", item.id));
        });
        removeCouponFromLocalStorage();
        navigate("/cart");
      } else {
        orderplaceerror();
      }
    });
  }
  return (
    <div className="md:mx-20 mx-4 mt-10">
      {!isPending && data.length == 0 ? (
        <div className="flex flex-col  items-center">
          <h1 className="text-xl font-semibold ">No Item To Checkout!</h1>
          <button className="buttons" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>
      ) : (
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
                    (items) => items.id === item.productid
                  )[0];
                  if (productdatafiltered) {
                    totalprice =
                      totalprice +
                      parseInt(productdatafiltered.productprice) *
                        parseInt(item.quantity);
                  }

                  return (
                    <tr className="text-center" key={item.id}>
                      <td className="py-5 border">
                        {`${productdatafiltered.productname} * (${item.quantity})`}
                      </td>
                      <td className="py-5 border">
                        {(
                          parseInt(productdatafiltered.productprice) *
                          parseInt(item.quantity)
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
      )}
    </div>
  );
};

export default Checkout;
