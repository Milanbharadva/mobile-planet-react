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
export default function App() {
  const [userstatus, setUserstatus] = useState(false);

  const setstatus = () => {
    setUserstatus(!userstatus);
  };
  return (
    <div>
      <Navbar onchange={setstatus} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin onchange={setstatus} />} />
      </Routes>
      <Footer />
    </div>
  );
}
