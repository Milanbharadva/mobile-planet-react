import { useEffect, useState, useRef } from "react";
import { useFetch } from "../../hook/usefetch";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { getUserID } from "../../global";
import { notifyaddressupdated } from "../../toast";

const Profile = () => {
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

  let userid = getUserID();
  const { loadeddata } = useFetch("user");

  const itemsRef = useRef();

  useEffect(() => {
    if (loadeddata != null) {
      itemsRef.current = loadeddata.filter((item) => item.ID === userid)[0];
      if (itemsRef.current) {
        setUser({
          id: itemsRef.current.id,
          username: itemsRef.current.username,
          email: itemsRef.current.email,
          phone: itemsRef.current.phone,
          address: itemsRef.current.address,
          postal: itemsRef.current.postal,
          country: itemsRef.current.country,
          state: itemsRef.current.state,
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
    notifyaddressupdated();
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
              required
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
              required
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
              required
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
                required
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
                required
              />
            </div>
          </div>
          <button className="buttons mt-3" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
