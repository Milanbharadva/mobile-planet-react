import { db } from "../../../Firebase/fiirebase";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hook/usefetch";
import AdminNavbar from "../AdminNavbar";
import { milisecondtotime } from "../TImeConvertor";
const EditDiscount = () => {
  const { state } = useLocation();
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, [navigate]);

  const notify = () => toast.success("Product updated sucessfully");
  const loadeddata = useFetch("discount");
  const productforedit = loadeddata.loadeddata.filter(
    (item) => item.id == state.discountid
  )[0];
  useEffect(() => {
    if (state && state.disablechange == true) {
      setDisable(true);
    }
  }, []);
  const initialformdata = {
    Discount: productforedit?.Discount || 0,
    DiscountCode: productforedit?.DiscountCode || "",
    MinimumCart: productforedit?.MinimumCart || 0,
    name: productforedit?.name || "",
    DiscountBy: productforedit?.DiscountBy || "percentage",
    startDate: productforedit?.startDate || new Date().toISOString(),
    endDate: productforedit?.endDate || new Date().toISOString(),
  };
  const [formdata, setFormdata] = useState(initialformdata);
  useEffect(() => {
    setFormdata(initialformdata);
  }, [productforedit]);
  const handler = (e) => {
    const { name, value } = e.target;
    setFormdata((prevformdata) => ({ ...prevformdata, [name]: value }));
  };

  async function validate(e) {
    e.preventDefault();
    const getdiscount = doc(db, "discount", state.discountid);
    await updateDoc(getdiscount, formdata);
    notify();
    navigate("/admin/discount");
  }
  return (
    <div className="bg-gray-200">
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md lg:w-[40vw] w-[90vw]">
          <h2 className="text-2xl font-semibold mb-6">
            {disable ? "Show" : "Edit"} Discount
          </h2>
          <form method="post" onSubmit={validate}>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Discount name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Discount name"
                  value={formdata && formdata.name}
                  onChange={(e) => {
                    handler(e);
                  }}
                  disabled={disable}
                  className="mt-1 p-2 w-full border rounded-md"
                  autoComplete="on"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Discout Code
                </label>
                <input
                  type="text"
                  name="DiscountCode"
                  value={formdata && formdata.DiscountCode}
                  placeholder="Enter Product price"
                  onChange={(e) => {
                    handler(e);
                  }}
                  disabled={disable}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Discount By :
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        value="percentage"
                        name="DiscountBy"
                        onChange={(e) => {
                          handler(e);
                        }}
                        disabled={disable}
                        checked={
                          formdata && formdata.DiscountBy === "percentage"
                        }
                        required
                      />
                      <label htmlFor="percentage">PERCENTAGE ( % )</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        value="rupee"
                        name="DiscountBy"
                        onChange={(e) => {
                          handler(e);
                        }}
                        disabled={disable}
                        checked={formdata && formdata.DiscountBy === "rupee"}
                      />
                      <label htmlFor="percentage">RUPEE ( ₹ )</label>
                    </div>
                  </div>
                </label>
                <input
                  type="number"
                  name="Discount"
                  placeholder="Enter Discount"
                  value={formdata && formdata.Discount}
                  onChange={(e) => {
                    handler(e);
                  }}
                  disabled={disable}
                  className="mt-1 p-2 w-full border rounded-md"
                  min={1}
                  max={formdata.DiscountBy === "percentage" ? 100 : ""}
                />
              </div>
              <div className="mb-4 flex gap-2">
                <div className="w-1/2">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="exampleInputEmail1"
                  >
                    Start Date
                  </label>
                  <input
                    value={formdata && milisecondtotime(formdata.startDate)}
                    type="datetime-local"
                    name="startDate"
                    placeholder="Enter Discount Start Date"
                    onChange={(e) => {
                      setFormdata((prevformdata) => ({
                        ...prevformdata,
                        startDate: Date.parse(e.target.value),
                      }));
                    }}
                    disabled={disable}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="exampleInputEmail1"
                  >
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    min={formdata && milisecondtotime(formdata.startDate)}
                    value={formdata && milisecondtotime(formdata.endDate)}
                    name="endDate"
                    placeholder="Enter Discount End Date"
                    onChange={(e) => {
                      setFormdata((prevformdata) => ({
                        ...prevformdata,
                        endDate: Date.parse(e.target.value),
                      }));
                    }}
                    disabled={disable}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Minimum Cart
                </label>
                <input
                  type="number"
                  name="MinimumCart"
                  placeholder="Enter Product RAM"
                  value={formdata && formdata.MinimumCart}
                  onChange={(e) => {
                    handler(e);
                  }}
                  disabled={disable}
                  className="mt-1 p-2 w-full border rounded-md"
                  min={1}
                />
              </div>
            </div>

            {disable ? (
              <div className="mb-4 flex gap-5 justify-center md:flex-row flex-col ">
                <div>
                  <button
                    type="submit"
                    name="submit"
                    value="add"
                    className="btn btn-primary col-md-12 buttons w-full "
                  >
                    Return To Discount Page
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    name="button"
                    value="button"
                    className="btn btn-primary col-md-12 buttons w-full"
                    onClick={() => {
                     setDisable(false)
                    }}
                  >
                    Edit Discount
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4 flex gap-5">
                <div>
                  <button
                    type="submit"
                    name="submit"
                    value="add"
                    className="btn btn-primary col-md-12 buttons"
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    name="reset"
                    value="reset"
                    className="btn btn-primary col-md-12 buttons"
                    onClick={() => {
                      setFormdata(initialformdata);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

export default EditDiscount;
