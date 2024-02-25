import React from "react";
import { useFetch } from "../../hook/usefetch";
import { filterDataWithUserId, localStringConverter } from "../../global";
import { Link, useNavigate } from "react-router-dom";
import { milisecondtotime } from "../admin/TImeConvertor";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { notifyOrderRemoved, notifyOrderRemovedError } from "../../toast";

const Order = () => {
  const navigate = useNavigate();
  const { loadeddata, isPending } = useFetch("orders");
  const productdata = useFetch("product");
  const data = filterDataWithUserId(loadeddata).sort(
    (a, b) => a.orderdate - b.orderdate
  );

  return (
    <div className="mt-5">
      {isPending && (
        <div className="flex items-center justify-center ">
          <div className="w-10 h-10 mt-5 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
      {!isPending && data.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold">No Order Found!</h1>
          <button className="buttons mt-3" onClick={() => navigate("/shop")}>
            Order Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10 md:px-5 ">
          {data.map((item) => {
            return (
              <div
                className="flex border py-5 flex-col gap-5 sm:mx-[2rem] md:mx-[10rem] lg:mx-[32rem] px-5"
                key={item.orderdate}
              >
                <div className="flex justify-between items-center md:flex-row flex-col">
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Order ID : {item.orderID}
                    </h1>
                    <p>
                      Order Date & Time : {milisecondtotime(item.orderdate)}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      if (
                        window.confirm("Are You Sure You Want To Cancel Order?")
                      ) {
                        try {
                          deleteDoc(doc(db, "orders", item.id));
                          notifyOrderRemoved();
                        } catch {
                          notifyOrderRemovedError();
                        }
                      }
                    }}
                  >
                    <button className="buttons whitespace-nowrap">Cancel Order</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  {item.products.map((product) =>
                    productdata.loadeddata
                      .filter((item) => product.productid == item.id)
                      .map((singleproduct) => (
                        <Link
                          to={`/singleproduct/${singleproduct.id}`}
                          key={singleproduct.id}
                        >
                          <div className="flex justify-between items-center border md:px-3 px-1">
                            <div className="flex gap-1 md:gap-3 items-center ">
                              <img
                                src={singleproduct.productimage}
                                alt=""
                                className="h-[80px] p-1 w-[80px]"
                              />
                              <div>
                                <p>{singleproduct.productname}</p>
                                <p className="text-sm text-gray-500">
                                  {singleproduct.productcolor} |{" "}
                                  {singleproduct.productram} GB |{" "}
                                  {singleproduct.productrom} GB
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold whitespace-nowrap">
                                {localStringConverter(
                                  singleproduct.productprice
                                )}{" "}
                                ₹
                              </p>
                              <p className="text-sm text-gray-500">
                                Qty : {product.quantity}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                  )}
                </div>
                {item.discountcode !== undefined ? (
                  <div>
                    <p>Price : {localStringConverter(item.totalprice)}</p>
                    <p className="text-green-600">
                      Discount : {localStringConverter(item.discountprice)}( -
                      {item.discountbyanddiscount} )
                    </p>
                    <p>
                      Total Amount :{localStringConverter(item.totalpricetopay)}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      Total Amount : {localStringConverter(item.totalprice)}
                    </p>
                  </div>
                )}
                {item.status.toLowerCase() != "cancel" ? (
                  <div className="w-full flex gap-1 h-fit text-center text-white">
                    <div
                      className={` w-1/4 ${
                        item.status.toLowerCase() == "pending" ||
                        item.status.toLowerCase() == "confirm" ||
                        item.status.toLowerCase() == "processing" ||
                        item.status.toLowerCase() == "shipped"
                          ? "bg-[#F28123]"
                          : "text-gray-400"
                      }`}
                    >
                      <span> Pending</span>
                    </div>
                    <div
                      className={` w-1/4 ${
                        item.status.toLowerCase() == "confirm" ||
                        item.status.toLowerCase() == "processing" ||
                        item.status.toLowerCase() == "shipped"
                          ? "bg-[#F28123]"
                          : "text-gray-400"
                      }`}
                    >
                      <span>Confirm</span>
                    </div>
                    <div
                      className={`w-1/4 ${
                        item.status.toLowerCase() == "processing" ||
                        item.status.toLowerCase() == "shipped"
                          ? "bg-[#F28123]"
                          : "text-gray-400"
                      }`}
                    >
                      <span>Processing</span>
                    </div>
                    <div
                      className={` w-1/4 ${
                        item.status.toLowerCase() == "shipped"
                          ? "bg-[#F28123]"
                          : "text-gray-400  "
                      }`}
                    >
                      <span>Shipped</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600">Your Order Is Cancelled</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Order;
