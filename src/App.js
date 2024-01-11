import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Shop from "./components/shop/Shop";
import Product from "./components/product/Product";
import Signup from "./components/authentication/signup/Signup";
import Signin from "./components/authentication/signin/Signin";
import { useState } from "react";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import SingleProduct from "./components/single-product/SingleProduct";
import Checkout from "./components/checkout/Checkout";
import Addproduct from "./components/admin/Addproduct";
import Error from "./components/404/Error";
import AdminLogIn from "./components/admin/auth/AdminLogIn";
import AdminSignUp from "./components/admin/auth/AdminSignUp";
import Admin from "./components/admin/Admin";
import AdminProduct from "./components/admin/AdminProduct";
import AdminNavbar from "./components/admin/AdminNavbar";
import EditProduct from "./components/admin/EditProduct";

export default function App() {
  document.title = "Mobile Planet";

  const [userstatus, setUserstatus] = useState(false);
  const [onlinestatus, setonlinestatus] = useState(navigator.onLine);
  setInterval(() => {
    setonlinestatus(navigator.onLine);
  }, 5000);
  const setstatus = () => {
    setUserstatus(!userstatus);
  };

  document.title = "Mobile Planet";
  return (
    <div>
      <div className={navigator.onLine ? "" : "offline"}>
        {window.location.pathname.includes("admin") ? (
          <div>
            <AdminNavbar />
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/signin" element={<AdminLogIn />} />
              <Route path="/admin/signup" element={<AdminSignUp />} />
              <Route path="/admin/product" element={<AdminProduct />} />
              <Route path="/admin/editproduct" element={<EditProduct />} />
              <Route exact path="/admin/addproduct" element={<Addproduct />} />
            </Routes>
          </div>
        ) : (
          <div>
            <Navbar onchange={setstatus} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route
                exact
                path="/shop"
                element={<Shop onchange={setstatus} />}
              />
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
      </div>

      {!onlinestatus && (
        <h1 className="fixed bottom-0 font-semibold text-xl pointer-events-none w-[100vw] text-center py-3 bg-black text-white ">
          You are currently offline.
        </h1>
      )}
    </div>
  );
}
