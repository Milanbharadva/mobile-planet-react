import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hook/usefetch";
import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { toast } from "react-toastify";
const Profile = () => {
  const notifyupdated = () => toast.success("Address Updated Sucessfully");
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    postal: "",
    country: "",
    state: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loadeddata } = useFetch("user");
  var items;
  useEffect(() => {
    if (loadeddata != null) {
      items = loadeddata.filter(
        (item) => item.ID === localStorage.getItem("userid")
      )[0];
      if (items) {
        setUser({
          id: items.id,
          username: items.username,
          email: items.email,
          phone: items.phone,
          address: items.address,
          postal: items.postal,
          country: items.country,
          state: items.state,
        });
      }
    }
  }, [loadeddata]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  async function validate(e) {
    e.preventDefault();
    const getproduct = doc(db, "user", user.id);
    await updateDoc(getproduct, {
      username: user.username,
      phone: user.phone,
      address: user.address,
      postal: user.postal,
      country: user.country,
      state: user.state,
    });
    notifyupdated();
  }

  document.title = "Mobile Planet | Profile";
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-3 items-center border border-black sm:px-10 sm:py-5">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <form onSubmit={validate} method="post">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="h-5  w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="number"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="address"
              value={user.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="postal">Postal Code</label>
            <input
              type="number"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="postal"
              value={user.postal}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="h-5 w-[130px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                name="country"
                value={user.country}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="h-5 w-[130px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                name="state"
                value={user.state}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="buttons" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
