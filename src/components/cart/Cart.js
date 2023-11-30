import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { useEffect } from "react";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let totalprice = 0;
  document.title = "Mobile Planet | Cart";
  const navigate = useNavigate();
  const { loadeddata } = useFetch("cart");
  let data;
  if (loadeddata) {
    data =
      loadeddata &&
      loadeddata.filter(
        (item) => item.itemdata.userid === localStorage.getItem("userid")
      );
  }

  const productdata = useFetch("product");

  return (
    <>
      <Breadcrumb paragraph="ORDER NOW" heading="Cart" />
      <div className="mx-20">
        <div className="flex">
          <div className="w-[60%]">
            <table width="100%" className="border-collapse">
              <thead>
                <tr className="text-center bg-[#efefef]">
                  <td className="py-5">Product image</td>
                  <td className="py-5">Name</td>
                  <td className="py-5">Price</td>
                  <td className="py-5">Quanitiy</td>
                  <td className="py-5 pr-2">Total</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => {
                    let productdatafiltered = productdata.loadeddata.filter(
                      (items) => items.id === item.itemdata.productid
                    )[0];
                    console.log(productdatafiltered);
                    if (productdatafiltered) {
                      totalprice =
                        totalprice + parseInt(productdatafiltered.productprice);
                    }
                    return (
                      productdatafiltered && (
                        <tr className="text-center ">
                          <td className="py-5 border flex justify-center ">
                            <img
                              src={`${window.location.origin}/assets/product/${productdatafiltered.productimage}`}
                              className="cursor-pointer"
                              alt={productdatafiltered.productname}
                              height="60px"
                              onClick={() => {
                                navigate(
                                  `/singleproduct/${productdatafiltered.id}`
                                );
                              }}
                            />
                          </td>
                          <td
                            className="py-5 border cursor-pointer"
                            onClick={() => {
                              navigate(
                                `/singleproduct/${productdatafiltered.id}`
                              );
                            }}
                          >
                            {productdatafiltered &&
                              productdatafiltered.productname.toUpperCase()}
                          </td>
                          <td className="py-5 border ">
                            {parseInt(
                              productdatafiltered.productprice
                            ).toLocaleString()}
                          </td>
                          <td className="py-5 border ">
                            {item.itemdata.quantity}
                          </td>
                          <td className="py-5 border  pr-2">
                            {parseInt(
                              productdatafiltered.productprice
                            ).toLocaleString()}
                          </td>
                        </tr>
                      )
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="ml-10 w-[30%]">
            <table width="100%">
              <thead className="text-center bg-[#efefef]">
                <tr>
                  <td className="py-5">Total</td>
                  <td className="py-5">Price</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="py-5 border">Subtotal</td>
                  <td className="py-5 border">
                    {totalprice.toLocaleString()}₹
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="py-5 border">Shipping</td>
                  <td className="py-5 border">0₹</td>
                </tr>
                <tr className="text-center">
                  <td className="py-5 border">Total</td>
                  <td className="py-5 border">
                    {totalprice.toLocaleString()}₹
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <button
                className="text-center buttons"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
