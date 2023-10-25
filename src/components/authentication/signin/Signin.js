import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hook/usefetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signin = (props) => {
  const notify = () => toast.error("Wrong Email or Password");
  const notify2 = () => toast.success("Login sucessful");

  const [error, setError] = useState(false);
  document.title = "Mobile Planet | Sign In";

  const { loadeddata } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/user.json"
  );
  const navigate = useNavigate();
  const objstructutre = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = useState(objstructutre);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdata((prevformdata) => ({ ...prevformdata, [name]: value }));
  };

  const validate = (e) => {
    e.preventDefault();
    if (loadeddata != null) {
      let items = loadeddata.filter(
        (item) =>
          item.data.email === formdata.email && item.data.password === formdata.password
      );
      if (items.length > 0) {
        items.map((userdata) => {
          localStorage.setItem("userid", userdata.data.ID);
          props.onchange();
          notify2();
          navigate("/");
          return 0;
        });
      } else {
        notify();
      }
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-5">
        <form
          method="post"
          className="flex  items-center  flex-col gap-3"
          onSubmit={validate}
        >
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Email :
            </label>
            <input
              type="email"
              name="email"
              className="w-[250px] sm:w-[300px] h-[40px] p-3"
              value={formdata.email}
              onChange={handler}
              placeholder="Email"
              
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <label htmlFor="password" className="text-lg font-semibold">
              Password :
            </label>
            <input
              type="password"
              name="password"
              className="w-[250px] sm:w-[300px] h-[40px] p-3"
              value={formdata.password}
              onChange={handler}
              placeholder="Password"
              
            />
          </div>
          <button className="buttons">SIGN IN</button>
        </form>
      </div>
      <ToastContainer />

      <div className="mt-3">
        <h2 className="flex justify-center text-md font-semibold">
          Don't have an account ? &nbsp;
          <button
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </h2>
      </div>
    </div>
  );
};

export default Signin;
