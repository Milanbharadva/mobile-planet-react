import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);
  return <></>;
};
export default Admin;
