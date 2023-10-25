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

export default function App() {
  console.log("home")
  const [userstatus, setUserstatus] = useState(false);

  const setstatus = () => {
    setUserstatus(!userstatus);
  };

  document.title = "Mobile Planet";
  return (
    <div>
      {" "}
      <Navbar onchange={setstatus} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/product/:category" element={<Product />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/singleproduct/:id" element={<SingleProduct onchange={setstatus}/>} />
        <Route exact path="/signin" element={<Signin onchange={setstatus} />} />
      </Routes>
      <Footer />
    </div>
  );
}
