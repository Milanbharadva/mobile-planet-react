import { useEffect, useRef } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loadeddata } = useFetch("user");

  if (loadeddata != null) {
    var items = loadeddata.filter(
      (item) => item.ID === localStorage.getItem("userid")
    )[0];
  }
  let usernameref = useRef();
  let emailref = useRef();
  let phoneref = useRef();
  let addressref = useRef();
  let postallref = useRef();
  let countryref = useRef();
  let stateref = useRef();
  if (items != null) {
    usernameref.current.value = items.username;
    phoneref.current.value = items.phone;
    addressref.current.value = items.address;
    postallref.current.value = items.postal;
    countryref.current.value = items.country;
    stateref.current.value = items.state;
  }

  async function validate(e) {
    e.preventDefault();
    const getproduct = doc(db, "user", items.id);
    await updateDoc(getproduct, {
      username: usernameref.current.value,
      phone: phoneref.current.value,
      address: addressref.current.value,
      postal: postallref.current.value,
      country: countryref.current.value,
      state: stateref.current.value,
    });
    notifyupdated();
  }
  document.title = "Mobile Planet | Profile";
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex flex-col gap-3 items-center border border-black sm:px-10 sm:py-5">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <form onSubmit={validate} method="post">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="username"
              ref={usernameref}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="h-5  w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="email"
              ref={emailref}
              value={items && items.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="number"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="phone"
              ref={phoneref}
              value={items && items.phone}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="address"
              ref={addressref}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="postal">Postal Code</label>
            <input
              type="number"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
              name="postal"
              ref={postallref}
              onChange={(e) => {
                postallref.current.value = e.target.value;
              }}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="h-5 w-[130px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                name="country"
                ref={countryref}
                value={items && items.country}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="h-5 w-[130px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                name="state"
                ref={stateref}
                value={items && items.state}
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
