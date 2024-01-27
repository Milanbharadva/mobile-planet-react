import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

const Cart = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("userid") == null) {
      navigate("/signin", {
        state: {
          toaccesscart: true,
        },
      });
    }
  }, []);
  const [discountcode, setdiscountcode] = useState(null);
  const [discountprice, setDiscountprice] = useState(0);
  const [discountbyanddiscount, setdiscountbyanddiscount] = useState(null);
  const [afterdiscountprice, setAfterDiscountprice] = useState(0);
  const discountdata = useFetch("discount");
  const notifywrongcoupon = () => toast.error("Wrong Counpon Code");
  const notifyalreadyapplied = () =>
    toast.error("This code is already applied");
  const notifycouponexpired = () => toast.error("Sorry Counpon Is Expired");
  const notifycouponapplied = (money) =>
    toast.success(" Coupon Applied Sucessfully You Saved " + money + "₹");
  const notifyalreadycoupon = () =>
    toast.error(
      "Already one coupon code is applied please remove it first to apply another"
    );
  const notifymincartvalue = (price) =>
    toast.error(`Minimum Cart Value Should be ${price}`);

  let totalprice = 0;
  document.title = "Mobile Planet | Cart";
  const { loadeddata } = useFetch("cart");
  let data;
  if (loadeddata) {
    data =
      loadeddata &&
      loadeddata.filter(
        (item) => item.itemdata.userid === localStorage.getItem("userid")
      );
  }
  const applycoupon = () => {
    let codeofdiscount = document.getElementById("discountcode").value;
    document.getElementById("discountcode").value = "";
    if (discountcode == codeofdiscount) {
      notifyalreadyapplied();
    } else if (discountcode != null) {
      notifyalreadycoupon();
    } else {
      let discountfiltereddata = discountdata.loadeddata.filter(
        (item) => item.DiscountCode == codeofdiscount
      )[0];
      if (discountfiltereddata == undefined) {
        notifywrongcoupon();
      } else {
        if (Date.parse(new Date()) > discountfiltereddata.endDate) {
          notifycouponexpired();
        } else if (totalprice < discountfiltereddata.MinimumCart) {
          notifymincartvalue(discountfiltereddata.MinimumCart.toLocaleString());
        } else {
          const discountby = discountfiltereddata.DiscountBy;
          setdiscountcode(discountfiltereddata.DiscountCode);
          if (discountby == "percentage") {
            setdiscountbyanddiscount(`${discountfiltereddata.Discount} %`);
            setDiscountprice(
              (totalprice * discountfiltereddata.Discount) / 100
            );
            setAfterDiscountprice(
              totalprice - (totalprice * discountfiltereddata.Discount) / 100
            );
            notifycouponapplied(
              (totalprice * discountfiltereddata.Discount) / 100
            );
          } else if (discountby == "rupee") {
            setdiscountbyanddiscount(null);
            setDiscountprice(discountfiltereddata.Discount);
            setAfterDiscountprice(totalprice - discountfiltereddata.Discount);
            notifycouponapplied(totalprice - discountfiltereddata.Discount);
          }
        }
      }
    }
  };
  function clearcounpon() {
    setdiscountcode(null);
    setDiscountprice(0);
    setdiscountbyanddiscount(null);
    setAfterDiscountprice(0);
  }
  const productdata = useFetch("product");

  return (
    <>
      <Breadcrumb paragraph="ORDER NOW" heading="Cart" />
      <div className="md:mx-20 mx-2">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-[60%] overflow-x-auto">
            <table width="100%" className="border-collapse">
              <thead>
                <tr className="text-center bg-[#efefef]">
                  <td className="py-5 px-3">Delete</td>
                  <td className="py-5 px-3">Product image</td>
                  <td className="py-5 px-3">Name</td>
                  <td className="py-5 px-3">Price</td>
                  <td className="py-5 px-3">Quanitiy</td>
                  <td className="py-5 px-3 pr-2">Total</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => {
                    let productdatafiltered = productdata.loadeddata.filter(
                      (items) => items.id === item.itemdata.productid
                    )[0];
                    if (productdatafiltered) {
                      totalprice =
                        totalprice +
                        productdatafiltered.productprice *
                          item.itemdata.quantity;
                    }
                    return (
                      productdatafiltered && (
                        <tr className="text-center " key={item.id}>
                          <td className="py-5 border">
                            <div className="flex justify-center   ">
                              <IoClose
                                className="border text-3xl cursor-pointer border-black p-1"
                                onClick={async () => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to remove it from cart?"
                                    )
                                  ) {
                                    await deleteDoc(doc(db, "cart", item.id));
                                  }
                                }}
                              />
                            </div>
                          </td>
                          <td className="py-5 border flex justify-center ">
                            <img
                              src={productdatafiltered.productimage}
                              className="cursor-pointer px-2  sm:h-[60px]"
                              alt={productdatafiltered.productname}
                              onClick={() => {
                                navigate(
                                  `/singleproduct/${productdatafiltered.id}`
                                );
                              }}
                            />
                          </td>
                          <td
                            className="py-5 whitespace-nowrap px-2 border cursor-pointer"
                            onClick={() => {
                              navigate(
                                `/singleproduct/${productdatafiltered.id}`
                              );
                            }}
                          >
                            {productdatafiltered &&
                              productdatafiltered.productname.toUpperCase()}
                          </td>
                          <td className="py-5 whitespace-nowrap px-2 border ">
                            {parseInt(
                              productdatafiltered.productprice
                            ).toLocaleString()}
                          </td>
                          <td className="py-5 border">
                            {item.itemdata.quantity}
                          </td>
                          <td className="py-5 whitespace-nowrap px-2 border pr-2">
                            {(
                              productdatafiltered.productprice *
                              item.itemdata.quantity
                            ).toLocaleString()}
                          </td>
                        </tr>
                      )
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="md:ml-10 text-center md:text-left md:w-[30%]">
            <div className="mb-5">
              <h1 className="text-xl mb-3 ">Have coupon?</h1>
              <div className="flex flex-col xl:flex-row gap-1 items-center ">
                <input
                  type="text"
                  id="discountcode"
                  className="border border-gray-500 pl-3 rounded-lg h-10"
                  placeholder="Enter Coupon "
                />
                <div className="flex gap-2">
                  <button
                    className="h-12 w-24 bg-[#F28123] rounded-[50px] text-white"
                    onClick={() => {
                      applycoupon();
                    }}
                  >
                    Apply
                  </button>
                  {discountcode != null && (
                    <div className="flex items-center justify-center gap-2 border border-black rounded-[50px] px-2 bg-black text-white">
                      {discountcode}
                      <IoMdClose
                        onClick={(e) => {
                          if (
                            window.confirm(
                              "Are you sure you want to remove coupon?"
                            )
                          ) {
                            clearcounpon();
                          }
                        }}
                        className="cursor-pointer font-bold"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
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
                  <td className="py-5 border">Discount</td>
                  {discountprice == 0 ? (
                    <td className="py-5 border">
                      {discountprice.toLocaleString()}₹
                    </td>
                  ) : (
                    <td className="py-5 border text-green-600">
                      - {discountprice.toLocaleString()}₹{" "}
                      {discountbyanddiscount != null &&
                        `(-${discountbyanddiscount})`}
                    </td>
                  )}
                </tr>
                <tr className="text-center">
                  <td className="py-5 border">Shipping</td>
                  <td className="py-5 border">0₹</td>
                </tr>
                <tr className="text-center">
                  <td className="py-5 border">Total</td>
                  {afterdiscountprice == 0 ? (
                    <td className="py-5 border">
                      {totalprice.toLocaleString()}₹
                    </td>
                  ) : (
                    <td className="py-5 border flex gap-2 justify-center items-center">
                      {afterdiscountprice.toLocaleString()}₹
                    </td>
                  )}
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
