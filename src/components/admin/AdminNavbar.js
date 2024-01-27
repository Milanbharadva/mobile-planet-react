import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useFetch } from "../../hook/usefetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminNavbar = (props) => {
  const navigate = useNavigate();
  const notify = () => toast.warning("Logout sucessfully");
  const [click, setClick] = useState(false);
  const content = (
    <>
      <div className="lg:hidden block absolute top-16 w-full left-0 right-0  text-white transition">
        <ul className="text-center text-xl p-10 mt-5  bg-[#0c1923]">
          <NavLink
            to="/"
            onClick={() => {
              setClick(false);
            }}
          >
            <li className="my-4 py-4   hover:rounded">HOME</li>
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => {
              setClick(false);
            }}
          >
            <li className="my-4 py-4  [#F28123] hover:rounded">ABOUT</li>
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => {
              setClick(false);
            }}
          >
            <li className="my-4 py-4   hover:rounded">CONTACT</li>
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => {
              setClick(false);
            }}
          >
            <li className="my-4 py-4   hover:rounded">SHOP</li>
          </NavLink>
          <NavLink
            to="/product"
            onClick={() => {
              setClick(false);
            }}
          >
            <li className="my-4 py-4   hover:rounded">PRODUCT</li>
          </NavLink>
          <NavLink
            to="/admin/addproduct"
            onClick={() => {
              setClick(false);
            }}
          >
            <li className="my-4 py-4   hover:rounded">ADD PRODUCT</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
  return (
    <nav className="flex z-10   sticky top-0 pr-10 bg-[#07212e] text-white">
      <div className="h-10vh flex z-50  lg:py-5 px-10 py-4 flex-1">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">
            <img
              src={`${window.location.origin}/assets/logo.png`}
              width="150px "
              height="70px"
              alt=""
            />
          </span>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[17px] ">
              <Link to="/admin">
                <li className="hover:text-[#F28123] transition  cursor-pointer">
                  DASHBOARD
                </li>
              </Link>
              <NavLink to="/admin/product">
                <li className="hover:text-[#F28123] transition  cursor-pointer">
                  PRODUCT
                </li>
              </NavLink>
              <NavLink to="/admin/discount">
                <li className="hover:text-[#F28123] transition  cursor-pointer">
                  DISCOUNT
                </li>
              </NavLink>
              <NavLink to="/admin/orders">
                <li className="hover:text-[#F28123] transition  cursor-pointer">
                  ORDERS
                </li>
              </NavLink>
              {localStorage.getItem("adminid") !== null ? (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("adminid");
                    notify();
                    navigate("/admin");
                  }}
                >
                  <li className="hover:text-[#F28123] transition  cursor-pointer">
                    SIGN&nbsp;OUT
                  </li>
                </Link>
              ) : (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/admin/signin");
                  }}
                >
                  <li className="hover:text-[#F28123] transition  cursor-pointer">
                    SIGN&nbsp;IN
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
