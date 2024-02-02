import React from "react";
import { useFetch } from "../../hook/usefetch";
import { filterDataWithUserId } from "../../global";
import { useNavigate } from "react-router-dom";
import { milisecondtotime } from "../admin/TImeConvertor";

const Order = () => {
  const navigate = useNavigate();
  const { loadeddata, isPending } = useFetch("orders");
  const productdata = useFetch("product");
  let data = filterDataWithUserId(loadeddata);
  return (
    <div className="mt-5">
      {!isPending && data.length == 0 ? (
        <div className="flex flex-col  items-center">
          <h1 className="text-xl font-semibold ">No Order Found!</h1>
          <button className="buttons" onClick={() => navigate("/shop")}>
            Order Now
          </button>
        </div>
      ) : (
        <div className=" flex flex-col gap-10 px-5">
          {data.map((item) => {
            let productdataofcart = [];
            if (item.productsincart.length <= 1) {
              productdataofcart = productdata.loadeddata.filter(
                (items) => items.id == item.productsincart.map((item) => item)
              );
            } else {
              for (let i = 0; i < productdata.loadeddata.length - 1; i++) {
                item.productsincart.filter((item) =>
                  (productdata.loadeddata[i].id == item) == true
                    ? productdataofcart.push(productdata.loadeddata[i])
                    : ""
                );
              }
            }

            return (
              <div className="flex border  py-5 px-10 flex-col gap-5">
                <h1>Order Date & Time : {milisecondtotime(item.orderdate)}</h1>
                <div className="flex gap-5">
                  {productdataofcart.map((product) => {
                    return (
                      <div className="border w-fit px-10 py-5" key={product.id}>
                        <img
                          src={product.productimage}
                          alt=""
                          className="h-[200px]"
                        />
                        <div>
                          <p>Price : {product.productprice}</p>
                          <p>
                            (RAM : {product.productram} GB , ROM :
                            {product.productrom} GB)
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
