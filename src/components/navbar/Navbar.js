import { NavLink, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useFetch } from "../../hook/usefetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserID } from "../../global";
const Navbar = (props) => {
  const notify = () => toast.warning("Logout sucessfully");
  const handleclick = () => {
    setClick(!click);
  };
  const { loadeddata } = useFetch("user");
  let userid = getUserID();
  const data = useFetch("cart");
  const [counter, setCounter] = useState(0);
  const count =
    data.loadeddata &&
    data.loadeddata.filter((item) => item.itemdata.userid === userid).length;
  useEffect(() => {
    setCounter(count);
  }, [count]);
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
          {loadeddata &&
          loadeddata.filter((item) => item.ID === userid).length > 0 ? (
            <Link>
              <li
                className="my-4 py-4   hover:rounded cursor-pointer"
                onClick={() => {
                  setClick(false);
                  props.onchange();
                  localStorage.removeItem("userid");
                  notify();
                }}
              >
                SIGN OUT
              </li>
            </Link>
          ) : (
            <NavLink
              to="/signin"
              onClick={() => {
                setClick(false);
              }}
            >
              <li className="my-4 py-4   hover:rounded">SIGN IN</li>
            </NavLink>
          )}
          <div className="mt-10 pb-10">
            <NavLink
              to="/cart"
              className="inline-block"
              onClick={() => {
                setClick(false);
              }}
            >
              <li className=" hover:rounded flex">
                <AiOutlineShoppingCart className="text-2xl" />
                <span className="inline text-sm -pt-1">{counter}</span>
              </li>
            </NavLink>
            {loadeddata &&
            loadeddata.filter((item) => item.ID === userid).length > 0 ? (
              <NavLink
                to="/profile"
                className="inline-block ml-6"
                onClick={() => {
                  setClick(false);
                }}
              >
                <li className=" hover:rounded">
                  <AiOutlineUser className="text-2xl" />
                </li>
              </NavLink>
            ) : (
              ""
            )}
          </div>
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
              <NavLink to="/">
                <li className="hover:text-[#F28123] transition  cursor-pointer">
                  HOME
                </li>
              </NavLink>
              <NavLink to="/about">
                <li className="hover:text-[#F28123] transition [#F28123] cursor-pointer">
                  ABOUT
                </li>
              </NavLink>
              <NavLink to="/contact">
                <li className="hover:text-[#F28123] transition [#F28123] cursor-pointer">
                  CONTACT
                </li>
              </NavLink>
              <NavLink to="/shop">
                <li className="hover:text-[#F28123] transition [#F28123] cursor-pointer">
                  SHOP
                </li>
              </NavLink>
              <NavLink to="/product">
                <li className="hover:text-[#F28123] transition [#F28123] cursor-pointer">
                  PRODUCT
                </li>
              </NavLink>
              {loadeddata &&
              loadeddata.filter((item) => item.ID === userid).length > 0 ? (
                <Link
                  onClick={() => {
                    props.onchange();
                    localStorage.removeItem("userid");
                    notify();
                  }}
                >
                  <li className="hover:text-[#F28123] transition [#F28123] cursor-pointer">
                    SIGN&nbsp;OUT
                  </li>
                </Link>
              ) : (
                <NavLink to="/signin">
                  <li className="hover:text-[#F28123] transition [#F28123] cursor-pointer">
                    SIGN&nbsp;IN
                  </li>
                </NavLink>
              )}
              <NavLink to="/cart">
                <li className="flex gap-0 ">
                  <AiOutlineShoppingCart className="text-2xl hover:fill-[#F28123]" />
                  <span className="text-sm pt-1">{count}</span>
                </li>
              </NavLink>
              {loadeddata &&
              loadeddata.filter((item) => item.ID === userid).length > 0 ? (
                <NavLink to="/profile">
                  <li>
                    <AiOutlineUser className="text-2xl hover:fill-[#F28123]" />
                  </li>
                </NavLink>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
      </div>
      <button className="block md:hidden transition p-2 " onClick={handleclick}>
        {click ? (
          <FaTimes className="fill-[#F28123]" />
        ) : (
          <AiOutlineMenu className="fill-[#F28123]" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
