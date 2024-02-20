import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className="flex justify-center mx-24">
        <div className="w-1/2" onClick={() => navigate("/admin/product")}>
          <Link to="/admin/product">Products</Link>
        </div>
        <div className="w-1/2" onClick={() => navigate("/admin/discount")}>
          <Link to="/admin/discount">Discount</Link>
        </div>
      </div>
    </>
  );
};
export default Admin;
