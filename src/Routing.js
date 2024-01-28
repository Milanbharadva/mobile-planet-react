import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Shop from "./components/shop/Shop";
import Product from "./components/product/Product";
import Signup from "./components/authentication/signup/Signup";
import Signin from "./components/authentication/signin/Signin";
import { useEffect, useState } from "react";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import SingleProduct from "./components/single-product/SingleProduct";
import Checkout from "./components/checkout/Checkout";
import Addproduct from "./components/admin/Add/Addproduct";
import Error from "./components/404/Error";
import AdminLogIn from "./components/admin/auth/AdminLogIn";
import Admin from "./components/admin/Admin";
import AdminProduct from "./components/admin/AdminProduct";
import EditProduct from "./components/admin/Edit/EditProduct";
import Discount from "./components/admin/Discount";
import EditDiscount from "./components/admin/Edit/EditDiscount";
import AddDiscount from "./components/admin/Add/AddDiscount";
import Loader from "./Loader";
const Routing = () => {
  const [userstatus, setUserstatus] = useState(false);
  const [onlinestatus, setonlinestatus] = useState(navigator.onLine);
  setInterval(() => {
    setonlinestatus(navigator.onLine);
  }, 5000);
  const setstatus = () => {
    setUserstatus(!userstatus);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={navigator.onLine ? "" : "offline"}>
      {window.location.pathname.includes("admin") ? (
        <div>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/signin" element={<AdminLogIn />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/discount" element={<Discount />} />
            <Route path="/admin/editproduct" element={<EditProduct />} />
            <Route path="/admin/editdiscount" element={<EditDiscount />} />
            <Route exact path="/admin/addproduct" element={<Addproduct />} />
            <Route exact path="/admin/adddiscount" element={<AddDiscount />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Navbar onchange={setstatus} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/shop" element={<Shop onchange={setstatus} />} />
            <Route path="*" element={<Error />} />
            <Route
              exact
              path="/product"
              element={<Product onchange={setstatus} />}
            />
            <Route
              exact
              path="/product/:category"
              element={<Product onchange={setstatus} />}
            />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route
              exact
              path="/singleproduct/:id"
              element={<SingleProduct onchange={setstatus} />}
            />
            <Route
              exact
              path="/signin"
              element={<Signin onchange={setstatus} />}
            />
          </Routes>
          <Footer />
        </div>
      )}
      {!onlinestatus && (
        <h1 className="fixed bottom-0 font-semibold text-xl pointer-events-none w-[100vw] text-center py-3 bg-black text-white ">
          You are currently offline.
        </h1>
      )}
    </div>
  );
};
export default Routing;
