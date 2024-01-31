import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { getUserID, removeCouponFromLocalStorage } from "../../global";
import { notifycouponapplied, notifycouponexpired, notifymincartvalue, notifywrongcoupon } from "../../toast";

const Cart = () => {
  const navigate = useNavigate();
  let userid = getUserID();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (userid == null) {
      navigate("/signin", {
        state: {
          toaccesscart: true,
        },
      });
    }
  }, []);
  useEffect(() => {
    if (discountcode == null) {
      removeCouponFromLocalStorage();
    }
  });
  const [discountdisable, setdiscountdisable] = useState(false);
  const [discountcode, setdiscountcode] = useState(null);
  const [discountprice, setDiscountprice] = useState(0);
  const [discountbyanddiscount, setdiscountbyanddiscount] = useState(null);
  const [afterdiscountprice, setAfterDiscountprice] = useState(0);
  const discountdata = useFetch("discount");
  

  let totalprice = 0;
  document.title = "Mobile Planet | Cart";
  const { loadeddata, isPending } = useFetch("cart");
  let data;
  if (loadeddata) {
    data =
      loadeddata &&
      loadeddata.filter(
        (item) => item.itemdata.userid === userid
      );
  }
  const applycoupon = () => {
    const codeOfDiscount = document.getElementById("discountcode").value;

    const discountFilteredData = discountdata.loadeddata.find(
      (item) => item.DiscountCode === codeOfDiscount
    );

    if (!discountFilteredData) {
      notifywrongcoupon();
    } else {
      if (
        Date.parse(new Date()) > discountFilteredData.endDate &&
        discountFilteredData.endDate != 0
      ) {
        notifycouponexpired();
        removeCouponFromLocalStorage();
      } else if (totalprice < discountFilteredData.MinimumCart) {
        setDiscountprice(0);
        setdiscountbyanddiscount(null);
        setAfterDiscountprice(0);
        notifymincartvalue(discountFilteredData.MinimumCart.toLocaleString());
        removeCouponFromLocalStorage();
      } else {
        setdiscountdisable(true);
        const discountBy = discountFilteredData.DiscountBy;
        setdiscountcode(discountFilteredData.DiscountCode);
        if (discountBy === "percentage") {
          setdiscountbyanddiscount(`${discountFilteredData.Discount} %`);
          setDiscountprice((totalprice * discountFilteredData.Discount) / 100);
          setAfterDiscountprice(
            totalprice - (totalprice * discountFilteredData.Discount) / 100
          );
          notifycouponapplied(
            (totalprice * discountFilteredData.Discount) / 100
          );
          localStorage.setItem("discountcode", codeOfDiscount);
          localStorage.setItem(
            "discountbyanddiscount",
            `${discountFilteredData.Discount} %`
          );
          localStorage.setItem(
            "discountprice",
            (totalprice * discountFilteredData.Discount) / 100
          );
        } else if (discountBy === "rupee") {
          setdiscountbyanddiscount(null);
          setDiscountprice(discountFilteredData.Discount);
          setAfterDiscountprice(totalprice - discountFilteredData.Discount);
          notifycouponapplied(totalprice - discountFilteredData.Discount);
          localStorage.setItem("discountcode", codeOfDiscount);
          localStorage.setItem(
            "discountbyanddiscount",
            `${discountFilteredData.Discount} ₹`
          );
          localStorage.setItem("discountprice", discountFilteredData.Discount);
        }
      }
    }
  };

  function clearcounpon() {
    document.getElementById("discountcode").value = "";
    setdiscountdisable(false);
    setdiscountcode(null);
    setDiscountprice(0);
    setdiscountbyanddiscount(null);
    setAfterDiscountprice(0);
    removeCouponFromLocalStorage();
  }

  const productdata = useFetch("product");
  useEffect(() => {
    if (discountcode != null) applycoupon();
  }, [data.length]);
  return (
    <>
      <Breadcrumb paragraph="ORDER NOW" heading="Cart" />
      <div className="md:mx-20 mx-2">
        {isPending ? (
          <div className="flex items-center justify-center ">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          loadeddata.filter(
            (item) => item.itemdata.userid == userid
          ).length == 0 && (
            <div className="flex flex-col  items-center">
              <h1 className="text-xl font-semibold ">Your Cart Is Empty!</h1>
              <button className="buttons" onClick={() => navigate("/shop")}>
                Shop Now
              </button>
            </div>
          )
        )}
        {loadeddata.filter(
          (item) => item.itemdata.userid == userid
        ).length > 0 && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-[60%] overflow-x-auto">
              <table width="100%" className="border-collapse">
                <thead>
                  <tr className="text-center bg-[#efefef]">
                    <td className="py-5 px-3">Delete</td>
                    <td className="py-5 px-3">Product image</td>
                    <td className="py-5 px-3">Name</td>
                    <td className="py-5 px-3">Price</td>
                    <td className="py-5 px-3">Quantity</td>
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
                              <div className="flex justify-center">
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
                              ₹
                            </td>
                            <td className="py-5 border">
                              {item.itemdata.quantity}
                            </td>
                            <td className="py-5 whitespace-nowrap px-2 border pr-2">
                              {(
                                productdatafiltered.productprice *
                                item.itemdata.quantity
                              ).toLocaleString()}
                              ₹
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
                    disabled={discountdisable}
                  />

                  <div className="flex gap-2">
                    {discountcode == null ? (
                      <button
                        type="button"
                        className="h-12 w-24 bg-[#F28123] rounded-[50px] text-white"
                        onClick={() => {
                          applycoupon();
                        }}
                      >
                        Apply
                      </button>
                    ) : (
                      <div className="border bg-red-500  rounded-[50%] border-black">
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
                          className="cursor-pointer font-bold text-white text-2xl"
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
        )}
      </div>
    </>
  );
};

export default Cart;
