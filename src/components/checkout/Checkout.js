import { useRef } from "react";
import { useFetch } from "../../hook/usefetch";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { toast } from "react-toastify";

const Checkout = () => {
  document.title = "Mobile Planet | Checkout";
  const notifyupdated = () => toast.success("Address Updated Sucessfully");
  const { loadeddata, isPending } = useFetch("cart");
  let data;
  if (loadeddata) {
    data =
      loadeddata &&
      loadeddata.filter(
        (item) => item.itemdata.userid === localStorage.getItem("userid")
      );
  }
  const userdata = useFetch("user");
  let filtereddataofuser = userdata.loadeddata.filter(
    (item) => item.ID === localStorage.getItem("userid")
  )[0];
  const productdata = useFetch("product");
  let totalprice = 0;
  let usernameref = useRef();
  let phoneref = useRef();
  let addressref = useRef();
  let postallref = useRef();
  let countryref = useRef();
  let stateref = useRef();
  if (filtereddataofuser != null) {
    usernameref.current.value = filtereddataofuser.username;
    phoneref.current.value = filtereddataofuser.phone;
    addressref.current.value = filtereddataofuser.address;
    postallref.current.value = filtereddataofuser.postal;
    countryref.current.value = filtereddataofuser.country;
    stateref.current.value = filtereddataofuser.state;
  }
  async function validate(e) {
    e.preventDefault();
    const getproduct = doc(db, "user", filtereddataofuser.id);
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
  function addOrder() {

  }
  return (
    <div className="md:mx-20 mx-4 mt-10">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-[40%]">
          <form
            method="post"
            onSubmit={(e) => {
              validate(e);
            }}
            className="gap-3 flex flex-col"
          >
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
              <label htmlFor="phone">Mobile Number</label>
              <input
                type="number"
                className="h-5 w-[270px] sm:w-[300px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                name="phone"
                ref={phoneref}
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
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="h-5 w-[130px] mb-5 md:mb-0 mr-4 py-4 pl-1.5 "
                  name="state"
                  ref={stateref}
                />
              </div>
            </div>
            <div className="flex  items-center">
              <button className="buttons " type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-[40%]">
          <table width="100%">
            <thead className="text-center bg-[#efefef]">
              <tr>
                <td className="py-5">Your order Details</td>
                <td className="py-5">Price</td>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-5 border">Product </td>
                <td className="py-5 border">Total</td>
              </tr>
              {data.map((item) => {
                let productdatafiltered = productdata.loadeddata.filter(
                  (items) => items.id === item.itemdata.productid
                )[0];
                if (productdatafiltered) {
                  totalprice =
                    totalprice +
                    parseInt(productdatafiltered.productprice) *
                      parseInt(item.itemdata.quantity);
                }

                return (
                  <tr className="text-center" key={item.id}>
                    <td className="py-5 border">
                      {`${productdatafiltered.productname} * (${item.itemdata.quantity})`}
                    </td>
                    <td className="py-5 border">
                      {(
                        parseInt(productdatafiltered.productprice) *
                        parseInt(item.itemdata.quantity)
                      ).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              <tr className="text-center">
                <td className="py-5 border">SubTotal</td>
                <td className="py-5 border">{totalprice.toLocaleString()}</td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Shipping</td>
                <td className="py-5 border">0</td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Discount</td>
                <td className="py-5 border">
                  {localStorage.getItem("discountprice") === null
                    ? 0
                    : parseInt(
                        localStorage.getItem("discountprice")
                      ).toLocaleString()}
                </td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Total</td>
                <td className="py-5 border">
                  {(
                    totalprice -
                    parseInt(
                      localStorage.getItem("discountprice")
                        ? localStorage.getItem("discountprice")
                        : 0
                    )
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center items-center">
            <button
              className="buttons"
              onClick={() => {
                addOrder();
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
