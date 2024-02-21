import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useFetch } from "../../hook/usefetch";
import "react-toastify/dist/ReactToastify.css";
import { filterDataWithUserId, getUserID } from "../../global";
import { notifylogout } from "../../toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { loadeddata } = useFetch("user");
  let userid = getUserID();
  const data = useFetch("cart");
  const [counter, setCounter] = useState(0);
  const count = data.loadeddata && filterDataWithUserId(data.loadeddata).length;
  useEffect(() => {
    setCounter(count);
  }, [count]);
  return (
    <nav className="flex z-10 sticky top-0  bg-[#07212e] text-white">
      <div className="h-16vh flex z-50 lg:py-5 px-10 py-4 flex-1 items-center justify-between">
        <div>
          <span className="text-3xl font-bold">
            <img
              src={`${window.location.origin}/assets/logo.png`}
              width="150px"
              height="70px"
              alt="logo"
            />
          </span>
        </div>
        <div className="lg:hidden cursor-pointer" onClick={toggleMobileMenu}>
          <GiHamburgerMenu className="text-2xl" />
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
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
              <NavLink to="/orders">
                <li className="hover:text-[#F28123] transition [#F28123] cursor-pointer">
                  ORDERS
                </li>
              </NavLink>
              {loadeddata &&
              loadeddata.filter((item) => item.ID === userid).length > 0 ? (
                <Link
                  onClick={() => {
                    props.onchange();
                    localStorage.removeItem("userid");
                    notifylogout();
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
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 mb-10 mt-4 right-0 bg-[#07212e] w-full">
            <ul className="flex flex-col text-center mt-4 gap-5 text-xl">
              <NavLink to="/">
                <li
                  className="hover:text-[#F28123] transition  cursor-pointer"
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  HOME
                </li>
              </NavLink>
              <NavLink to="/about">
                <li
                  className="hover:text-[#F28123] transition  cursor-pointer"
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  ABOUT
                </li>
              </NavLink>
              <NavLink to="/contact">
                <li
                  className="hover:text-[#F28123] transition  cursor-pointer"
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  CONTACT
                </li>
              </NavLink>
              <NavLink to="/shop">
                <li
                  className="hover:text-[#F28123] transition cursor-pointer"
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  SHOP
                </li>
              </NavLink>
              <NavLink to="/product">
                <li
                  className="hover:text-[#F28123] transition cursor-pointer"
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  PRODUCT
                </li>
              </NavLink>
              <NavLink to="/orders">
                <li
                  className="hover:text-[#F28123] transition  cursor-pointer"
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  ORDERS
                </li>
              </NavLink>
              {loadeddata &&
              loadeddata.filter((item) => item.ID === userid).length > 0 ? (
                <Link
                  onClick={() => {
                    props.onchange();
                    localStorage.removeItem("userid");
                    notifylogout();
                  }}
                >
                  <li
                    className="hover:text-[#F28123] transition [#F28123] cursor-pointer"
                    onClick={() => {
                      toggleMobileMenu();
                    }}
                  >
                    SIGN&nbsp;OUT
                  </li>
                </Link>
              ) : (
                <NavLink to="/signin">
                  <li
                    className="hover:text-[#F28123] transition [#F28123] cursor-pointer"
                    onClick={() => {
                      toggleMobileMenu();
                    }}
                  >
                    SIGN&nbsp;IN
                  </li>
                </NavLink>
              )}
              <NavLink to="/cart">
                <li
                  className={`flex gap-0 justify-center ${
                    loadeddata &&
                    loadeddata.filter((item) => item.ID === userid).length <=
                      0 &&
                    "mb-5"
                  } `}
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  <AiOutlineShoppingCart className="text-3xl hover:fill-[#F28123]" />
                  <span className="text-sm pt-1">{count}</span>
                </li>
              </NavLink>
              {loadeddata &&
              loadeddata.filter((item) => item.ID === userid).length > 0 ? (
                <NavLink to="/profile">
                  <li
                    className="flex justify-center mb-5 "
                    onClick={() => {
                      toggleMobileMenu();
                    }}
                  >
                    <AiOutlineUser className="text-3xl hover:fill-[#F28123]" />
                  </li>
                </NavLink>
              ) : (
                ""
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
