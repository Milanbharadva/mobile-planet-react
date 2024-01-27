import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const notify = () => toast.warning("Logout successfully");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex z-10 sticky top-0  bg-[#07212e] text-white">
      <div className="h-16vh flex z-50 lg:py-5 px-10 py-4 flex-1 items-center justify-between">
        <div>
          <span className="text-3xl font-bold">
            <img
              src={`${window.location.origin}/assets/logo.png`}
              width="150px"
              height="70px"
              alt=""
            />
          </span>
        </div>
        <div className="lg:hidden cursor-pointer" onClick={toggleMobileMenu}>
          <GiHamburgerMenu className="text-2xl" />
        </div>
        {/* Desktop Menu */}
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
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
              <div></div>
              {localStorage.getItem("adminid") !== null ? (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("adminid");
                    notify();
                    navigate("/admin");
                  }}
                >
                  <li className="hover:text-[#F28123] transition  cursor-pointer ">
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
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 right-0 bg-[#07212e] w-full">
            <ul className="flex flex-col text-center mt-4">
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
                  <li className="hover:text-[#F28123] transition  cursor-pointer mb-2">
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
                  <li className="hover:text-[#F28123] transition  cursor-pointer mb-2">
                    SIGN&nbsp;IN
                  </li>
                </Link>
              )}{" "}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
