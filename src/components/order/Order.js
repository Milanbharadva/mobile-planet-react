import React from "react";
import { useFetch } from "../../hook/usefetch";
import { filterDataWithUserId } from "../../global";
import { Link, useNavigate } from "react-router-dom";
import { milisecondtotime } from "../admin/TImeConvertor";

const Order = () => {
  const navigate = useNavigate();
  const { loadeddata, isPending } = useFetch("orders");
  const { loadeddata: productdata } = useFetch("product");
  const data = filterDataWithUserId(loadeddata);
  let productwithquantityforsingle = [];
  let productwithquantityformultiple = [];
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
            const productdataofcart =
              item.productsincart.length <= 1
                ? productdata.filter((product) => {
                    productwithquantityforsingle = {
                      quantity: item.cartitem1.quantity,
                      productid: item.cartitem1.productid,
                    };
                    return product.id === item.productsincart[0];
                  })
                : item.productsincart.map((productId, index) => {
                    index++;
                    productwithquantityformultiple.push({
                      quantity: item["cartitem" + index].quantity,
                      productid: item["cartitem" + index].productid,
                    });
                    return productdata.find(
                      (product) => product.id === productId
                    );
                  });

            return (
              <div
                className="flex border py-5 flex-col gap-5 mx-[32rem] px-5"
                key={item.orderdate}
              >
                <h1 className="text-2xl font-semibold">
                  Order ID : {item.orderID}
                </h1>
                <p>Order Date & Time : {milisecondtotime(item.orderdate)}</p>
                <div className="flex flex-col gap-2 ">
                  {productdataofcart.map((product) => {
                    return (
                      <Link
                        to={`/singleproduct/${product.id}`}
                        key={product.id}
                      >
                        <div className="flex justify-between items-center border px-3">
                          <div className="flex gap-3 items-center ">
                            <img
                              src={product.productimage}
                              alt=""
                              className="h-[80px] p-1"
                            />
                            <div>
                              <p>{product.productname}</p>
                              <p className="text-sm text-gray-500">
                                {product.productcolor} | {product.productram} GB
                                | {product.productrom} GB
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold">
                              {parseInt(product.productprice).toLocaleString()}{" "}
                              ₹
                            </p>
                            {item.productsincart.length > 1 ? (
                              productwithquantityformultiple.map(
                                (item, index) =>
                                  item.productid === product.id && (
                                    <p
                                      className="text-sm text-gray-500"
                                      key={index}
                                    >
                                      Qty : {item.quantity}
                                    </p>
                                  )
                              )
                            ) : (
                              <p className="text-sm text-gray-500">
                                Quantity :
                                {productwithquantityforsingle.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {item.discountcode !== undefined ? (
                  <div>
                    <p>Price :{parseInt(item.totalprice).toLocaleString()}</p>
                    <p className="text-green-600">
                      Discount : {parseInt(item.discountprice).toLocaleString()}
                      ( -{item.discountbyanddiscount} )
                    </p>
                    <p>
                      Total Amount :{" "}
                      {parseInt(item.totalpricetopay).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p> Total Amount : {item.totalprice}</p>
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
