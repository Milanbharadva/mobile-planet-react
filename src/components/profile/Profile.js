import { useRef } from "react";
import { useFetch } from "../../hook/usefetch";

const Profile = () => {
  const { data } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/user.json"
  );
  if (data != null) {
    var items = data
      .filter((item) => item.ID === localStorage.getItem("userid"))
      .map((filtereditem) => filtereditem)[0];
  }
  let idref = useRef();
  let usernameref = useRef();
  let passwordref = useRef();
  let emailref = useRef();
  let phoneref = useRef();
  let addressref = useRef();
  let postallref = useRef();
  let countryref = useRef();
  let stateref = useRef();

  function validate(e) {
    e.preventDefault();

    let obj = {
      ID: idref.current.value,
      username: usernameref.current.value,
      password: passwordref.current.value,
      email: emailref.current.value,
      phone: phoneref.current.value,
      adddress: addressref.current.value,
      postal: postallref.current.value,
      country: countryref.current.value,
      state: stateref.current.value,
    };

    fetch(
      "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/user.json",
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => (data.name ? <p>data submitted</p> : ""));
  }
  document.title = "Mobile Planet | Profile";
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex flex-col gap-3 items-center border border-black sm:px-10 sm:py-5">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <form onSubmit={validate} method="post">
          <div className="hidden">
            <label htmlFor="username">ID:</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 p-4 "
              name="ID"
              ref={idref}
              value={items && items.ID}
              disabled
            />
          </div>
          <div className="hidden">
            <label htmlFor="username">Password:</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 p-4 "
              name="ID"
              ref={passwordref}
              value={items && items.password}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 p-4 "
              name="username"
              ref={usernameref}
              value={items && items.username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="h-5  w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 p-4 "
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
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 p-4 "
              name="phone"
              ref={phoneref}
              value={items && items.phone}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 p-4 "
              name="address"
              ref={addressref}
              value={items && items.address}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="postal">Postal Code</label>
            <input
              type="number"
              className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 p-4 "
              name="postal"
              ref={postallref}
              value={items && items.postal}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="h-5 w-[130px] mb-5 md:mb-0 mr-4 p-4 "
                name="country"
                ref={countryref}
                value={items && items.country}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="h-5 w-[130px] mb-5 md:mb-0 mr-4 p-4 "
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
