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
  const data = filterDataWithUserId(loadeddata).sort(
    (a, b) => a.orderdate - b.orderdate
  );

  return (
    <div className="mt-5">
      {!isPending && data.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold">No Order Found!</h1>
          <button className="buttons" onClick={() => navigate("/shop")}>
            Order Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10 px-5">
          {data.map((item) => {
            return (
              <div
                className="flex border py-5 flex-col gap-5 mx-[32rem] px-5"
                key={item.orderdate}
              >
                <div className="flex justify-between items-center">
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
                    <button className="buttons">Cancel Order</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  {item.products.map((product) => {
                    return (
                      <Link
                        to={`/singleproduct/${product.product.id}`}
                        key={product.product.id}
                      >
                        <div className="flex justify-between items-center border px-3">
                          <div className="flex gap-3 items-center ">
                            <img
                              src={product.product.productimage}
                              alt=""
                              className="h-[80px] p-1"
                            />
                            <div>
                              <p>{product.product.productname}</p>
                              <p className="text-sm text-gray-500">
                                {product.product.productcolor} |{" "}
                                {product.product.productram} GB |{" "}
                                {product.product.productrom} GB
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold">
                              {localStringConverter(
                                product.product.productprice
                              )}{" "}
                              ₹
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty : {product.quantity}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Order;
