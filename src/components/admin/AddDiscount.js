import { db } from "../../Firebase/fiirebase";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { milisecondtotime } from "./TImeConvertor";
const AddDiscount = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, [navigate]);
  const [formdata, setFormdata] = useState({
    Discount: "",
    DiscountBy: "",
    DiscountCode: "",
    MinimumCart: "",
    endDate: 0,
    name: "",
    startDate: 0,
  });
  const handler = (e) => {
    const { name, value } = e.target;
    setFormdata((prevformdata) => ({ ...prevformdata, [name]: value }));
  };
  const notify = () => toast.success("Product updated sucessfully");
  async function validate(e) {
    e.preventDefault();

    await addDoc(collection(db, "discount"), formdata).then((res) => {
      if (res._key.path.segments[1]) {
        setFormdata({
          Discount: "",
          DiscountBy: "",
          DiscountCode: "",
          MinimumCart: "",
          endDate: 0,
          name: "",
          startDate: 0,
        });
        notify();
        navigate("/admin/discount");
      }
    });
  }

  return (
    <div className="bg-gray-200">
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md lg:w-[40vw] w-[90vw]">
          <h2 className="text-2xl font-semibold mb-6">Add Discount</h2>
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
                  className="mt-1 p-2 w-full border rounded-md"
                  autoComplete="on"
                  required
                  onChange={(e) => {
                    handler(e);
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Discount Code
                </label>
                <input
                  type="text"
                  name="DiscountCode"
                  placeholder="Enter Discount Code"
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={(e) => {
                    handler(e);
                  }}
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
                        onClick={(e) => {
                          handler(e);
                        }}
                        required
                      />
                      <label htmlFor="percentage">PERCENTAGE ( % )</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        value="rupee"
                        name="DiscountBy"
                        onClick={(e) => {
                          handler(e);
                        }}
                      />
                      <label htmlFor="percentage">RUPEE ( ₹ )</label>
                    </div>
                  </div>
                </label>
                <input
                  type="number"
                  name="Discount"
                  placeholder="Enter Discount"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={(e) => {
                    handler(e);
                  }}
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
                    type="datetime-local"
                    name="startDate"
                    placeholder="Enter Discount Start Date"
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={(e) => {
                      setFormdata((prevformdata) => ({
                        ...prevformdata,
                        startDate: Date.parse(e.target.value),
                      }));
                    }}
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
                    name="endDate"
                    min={milisecondtotime(formdata.startDate)}
                    placeholder="Enter Discount End Date"
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={(e) => {
                      setFormdata((prevformdata) => ({
                        ...prevformdata,
                        endDate: Date.parse(e.target.value),
                      }));
                    }}
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
                  placeholder="Enter Minimun Cart Value "
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={(e) => {
                    handler(e);
                  }}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-5">
              <div className="flex gap-5">
                <button
                  type="submit"
                  name="submit"
                  value="add"
                  className="btn btn-primary col-md-12 buttons"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  name="reset"
                  value="reset"
                  className="btn btn-primary col-md-12 buttons"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

export default AddDiscount;
