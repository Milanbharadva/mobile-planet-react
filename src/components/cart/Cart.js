import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const Cart = () => {
  let totalprice = 0;
  document.title = "Mobile Planet | Cart";
  const navigate = useNavigate();
  const { loadeddata } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/cart.json"
  );
  let data;
  if (loadeddata) {
    data =
      loadeddata &&
      loadeddata.filter(
        (item) => item.data.userid === localStorage.getItem("userid")
      );
  }

  const productdata = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );

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
                      (items) => items.data.ID == item.data.productid
                    )[0];
                    if (productdatafiltered) {
                      totalprice =
                        totalprice +
                        parseInt(productdatafiltered.data.productprice);
                    }
                    return (
                      productdatafiltered && (
                        <tr className="text-center ">
                          <td className="py-5 border flex justify-center ">
                            <img
                              src={`${window.location.origin}/assets/product/${productdatafiltered.data.productimage}`}
                              className="cursor-pointer"
                              alt={productdatafiltered.data.productname}
                              height="60px"
                              onClick={() => {
                                navigate(
                                  `/singleproduct/${productdatafiltered.data.ID}`
                                );
                              }}
                            />
                          </td>
                          <td
                            className="py-5 border cursor-pointer"
                            onClick={() => {
                              navigate(
                                `/singleproduct/${productdatafiltered.data.ID}`
                              );
                            }}
                          >
                            {productdatafiltered &&
                              productdatafiltered.data.productname.toUpperCase()}
                          </td>
                          <td className="py-5 border ">
                            {parseInt(
                              productdatafiltered.data.productprice
                            ).toLocaleString()}
                          </td>
                          <td className="py-5 border ">{item.data.quantity}</td>
                          <td className="py-5 border  pr-2">
                            {parseInt(
                              productdatafiltered.data.productprice
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

            <button className="text-center buttons" onClick={()=>{navigate('/checkout')}}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
      {console.log(totalprice)}
    </>
  );
};

export default Cart;
