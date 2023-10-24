import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0c1923] text-white mt-28">
      <div className="flex py-24 px-16 flex-col md:flex-row lg:px-24 justify-center gap-10">
        <div className="md:w-[30%] flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">About us</h1>
          <p className="leading-7">
            Welcome to Mobile Planet, your trusted source for mobiles on the go.
            We are dedicated to providing you with a seamless mobile experience
            and delivering top-notch mobile right at your fingertips.
          </p>
        </div>
        <div className=" md:w-[30%] flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">Get in Touch</h1>
          <p className="leading-7">
            2-jasraj nagar,behind radhe hotel,rajkot,gujarat
            <br />
            support@mobileplanet.com
            <br />
            +917990892778
          </p>
        </div>
        <div className="md:w-[20%] flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">Pages</h1>
          <ul className="flex flex-col gap-3">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/about">
              <li>About</li>
            </NavLink>
            <NavLink to="/contact">
              <li>Contact</li>
            </NavLink>
            <NavLink to="/shop">
              <li>Shop</li>
            </NavLink>
            <NavLink to="/product">
              <li>Product</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
