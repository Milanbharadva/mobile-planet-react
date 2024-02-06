import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hook/usefetch";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import {
  filterDataWithUserId,
  getUserID,
  removeCouponFromLocalStorage,
} from "../../global";
import { useNavigate } from "react-router-dom";
import {
  notifyaddressupdated,
  orderSucessfull,
  orderplaceerror,
} from "../../toast";

const Checkout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    postal: "",
    country: "",
    state: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    phone: "",
    address: "",
    postal: "",
    country: "",
    state: "",
  });
  document.title = "Mobile Planet | Checkout";
  //profile
  const userdata = useFetch("user");

  let userid = getUserID();

  const itemsRef = useRef();

  useEffect(() => {
    if (userdata.loadeddata != null) {
      itemsRef.current = userdata.loadeddata.filter(
        (item) => item.ID === userid
      )[0];
      if (itemsRef.current) {
        setUser({
          id: itemsRef.current.id,
          username: itemsRef.current.username,
          email: itemsRef.current.email,
          phone: itemsRef.current.phone,
          address: itemsRef.current.address,
          postal: itemsRef.current.postal,
          country: itemsRef.current.country,
          state: itemsRef.current.state,
        });
      }
    }
  }, [userdata.loadeddata, userid]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  async function validate(e) {
    e.preventDefault();
    const getproduct = doc(db, "user", user.id);
    await updateDoc(getproduct, {
      username: user.username,
      phone: user.phone,
      address: user.address,
      postal: user.postal,
      country: user.country,
      state: user.state,
    });
    notifyaddressupdated();
  }
  //profile

  const { loadeddata, isPending } = useFetch("cart");

  let filtereduserdata =
    userdata.loadeddata &&
    userdata.loadeddata.filter((item) => item.ID === getUserID())[0];
  let data;
  if (loadeddata) {
    data = loadeddata && filterDataWithUserId(loadeddata);
  }
  const { loadeddata: productdata } = useFetch("product");
  let totalprice = 0;
  let orderobj = {};
  async function addOrder() {
    const emptyFields = [];
    if (!user.username) {
      emptyFields.push("username");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        username: "Please enter your name.",
      }));
      document.getElementsByName("username")[0].focus();
    }
    if (!user.phone) {
      emptyFields.push("phone");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter your mobile number.",
      }));
      document.getElementsByName("phone")[0].focus();
    }
    if (!user.address) {
      emptyFields.push("address");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        address: "Please enter your address.",
      }));
      document.getElementsByName("address")[0].focus();
    }
    if (!user.postal) {
      emptyFields.push("postal");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        postal: "Please enter your postal code.",
      }));
      document.getElementsByName("postal")[0].focus();
    }
    if (!user.country) {
      emptyFields.push("country");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        country: "Please enter your country.",
      }));
      document.getElementsByName("country")[0].focus();
    }
    if (!user.state) {
      emptyFields.push("state");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        state: "Please enter your state.",
      }));
      document.getElementsByName("state")[0].focus();
    }
    if (emptyFields.length > 0) {
      return;
    } else {
      let filteredproductdata = data.map(
        (item) => productdata.filter((items) => items.id === item.productid)[0]
      );
      let discountcode = localStorage.getItem("discountcode") || "";
      let discountprice = localStorage.getItem("discountprice") || "";
      let discountbyanddiscount =
        localStorage.getItem("discountbyanddiscount") || "";

      data.map((item, index) => (orderobj[`cartitem${index + 1}`] = item));
      let products = filteredproductdata.map((item) => item.id);
      orderobj["productsincart"] = products;
      orderobj["orderID"] = Math.floor(Math.random() * 10000000);
      orderobj["address"] = {
        adddress: filtereduserdata.address,
        country: filtereduserdata.country,
        state: filtereduserdata.state,
        postal: filtereduserdata.postal,
        phone: filtereduserdata.phone,
      };
      orderobj["orderdate"] = Date.parse(new Date());
      orderobj["userid"] = getUserID();
      orderobj["totalprice"] = totalprice;
      if (discountcode !== "") {
        orderobj["discountprice"] = discountprice;
        orderobj["discountbyanddiscount"] = discountbyanddiscount;
        orderobj["discountcode"] = discountcode;
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
          navigate("/orders");
        } else {
          orderplaceerror();
        }
      });
    }
  }
  return (
    <div className="md:mx-20 mx-4 mt-10">
      {!isPending && data.length === 0 ? (
        <div className="flex flex-col  items-center">
          <h1 className="text-xl font-semibold ">No Item To Checkout!</h1>
          <button className="buttons" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-[40%]">
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-3 items-center border border-black sm:px-10 sm:py-5">
                <h2 className="text-xl font-bold">Profile Settings</h2>
                <form onSubmit={validate} method="post">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Name</label>
                    <input
                      type="text"
                      className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                      name="username"
                      value={user.username}
                      onChange={handleChange}
                    />
                    {errorMessages.username && (
                      <div className="text-red-500">
                        {errorMessages.username}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="h-5  w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                      name="email"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Mobile Number</label>
                    <input
                      type="number"
                      className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      required
                    />
                    {errorMessages.phone && (
                      <div className="text-red-500">{errorMessages.phone}</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      required
                    />{" "}
                    {errorMessages.address && (
                      <div className="text-red-500">
                        {errorMessages.address}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="postal">Postal Code</label>
                    <input
                      type="number"
                      className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                      name="postal"
                      value={user.postal}
                      onChange={handleChange}
                      required
                    />
                    {errorMessages.postal && (
                      <div className="text-red-500">{errorMessages.postal}</div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        className="h-5 w-[130px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                        name="country"
                        value={user.country}
                        onChange={handleChange}
                        required
                      />
                      {errorMessages.country && (
                        <div className="text-red-500">
                          {errorMessages.country}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        className="h-5 w-[130px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                        name="state"
                        value={user.state}
                        onChange={handleChange}
                        required
                      />
                      {errorMessages.state && (
                        <div className="text-red-500">
                          {errorMessages.state}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="buttons" type="submit">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
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
                  let productdatafiltered = productdata.filter(
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
