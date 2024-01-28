import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../Firebase/fiirebase";
import { collection, addDoc } from "firebase/firestore";
const Signup = () => {
  document.title = "Mobile Planet | Sign Up";

  const navigate = useNavigate();
  const objstructutre = {
    ID: uuidv4(),
    username: "",
    password: "",
    email: "",
  };
  const [data, setData] = useState(objstructutre);
  const [error, setError] = useState(false);

  const handler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevformdata) => ({ ...prevformdata, [name]: value }));
  };
  const validate = async (e) => {
    e.preventDefault();

    if (data.email !== "" && data.password !== "") {
      await addDoc(collection(db, "user"), {
        data,
      }).then((res) =>
        res._key.path.segments[1] != null
          ? navigate("/signin", {
              state: {
                tosignin: true,
              },
            })
          : ""
      );
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-5    ">
        <form
          action=""
          method="post"
          className="flex  items-center  flex-col gap-3"
          onSubmit={validate}
        >
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="username" className="text-lg font-semibold">
              Username :
            </label>
            <input
              type="text"
              name="username"
              className="w-[250px] sm:w-[300px] h-[40px] p-3"
              value={data.username}
              onChange={handler}
              placeholder="Username"
              required
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Email :
            </label>
            <input
              type="email"
              name="email"
              className="w-[250px] sm:w-[300px] h-[40px] p-3"
              value={data.email}
              onChange={handler}
              placeholder="Email"
              required
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
              value={data.password}
              onChange={handler}
              placeholder="Password"
              required
            />
          </div>
          <button className="buttons">SIGN UP</button>
        </form>
      </div>
      {error && (
        <h2 className="flex justify-center text-lg font-semibold text-red-800">
          Please fill all the details.
        </h2>
      )}
      <div className="mt-3">
        <h2 className="flex justify-center text-md font-semibold">
          Already have an account ? &nbsp;
          <button
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              navigate("/signin");
            }}
          >
            {" "}
            Sign In{" "}
          </button>
        </h2>
      </div>
    </div>
  );
};

export default Signup;
