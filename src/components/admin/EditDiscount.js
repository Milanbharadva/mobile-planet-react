import { db } from "../../Firebase/fiirebase";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, doc, Firestore } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import AdminNavbar from "./AdminNavbar";
import { milisecondtotime } from "./TImeConvertor";
const EditDiscount = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);

  const notify = () => toast.success("Product updated sucessfully");
  const loadeddata = useFetch("discount");
  const productforedit = loadeddata.loadeddata.filter(
    (item) => item.id == state.discountid
  )[0];

  const initialformdata = {
    Discount: productforedit && productforedit.Discount,
    DiscountCode: productforedit && productforedit.DiscountCode,
    MinimumCart: productforedit && productforedit.MinimumCart,
    name: productforedit && productforedit.name,
    DiscountBy: productforedit && productforedit.DiscountBy,
    startDate: productforedit && productforedit.startDate,
    endDate: productforedit && productforedit.endDate,
  };
  const [formdata, setFormdata] = useState({
    Discount: productforedit && productforedit.Discount,
    DiscountCode: productforedit && productforedit.DiscountCode,
    MinimumCart: productforedit && productforedit.MinimumCart,
    name: productforedit && productforedit.name,
    DiscountBy: productforedit && productforedit.DiscountBy,
    startDate: productforedit && productforedit.startDate,
    endDate: productforedit && productforedit.endDate,
  });
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
    await updateDoc(getdiscount, {
      Discount: formdata.Discount,
      DiscountCode: formdata.DiscountCode,
      MinimumCart: formdata.MinimumCart,
      name: formdata.name,
      DiscountBy: formdata.DiscountBy,
      startDate: formdata.startDate,
      endDate: formdata.endDate,
    });
    notify();
    navigate("/admin/discount");
  }
  return (
    <div className="bg-gray-200">
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md lg:w-[40vw] w-[90vw]">
          <h2 className="text-2xl font-semibold mb-6">Edit Discount</h2>
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
                        onClick={(e) => {
                          handler(e);
                        }}
                        checked={
                          formdata && formdata.DiscountBy == "percentage"
                            ? "true"
                            : ""
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
                        onClick={(e) => {
                          handler(e);
                        }}
                        checked={
                          formdata && formdata.DiscountBy == "rupee"
                            ? "true"
                            : ""
                        }
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
                  className="mt-1 p-2 w-full border rounded-md"
                  min={1}
                  max={formdata.DiscountBy == "percentage" ? 100 : ""}
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
                  className="mt-1 p-2 w-full border rounded-md"
                  min={1}
                />
              </div>
            </div>
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
                    // setFormdata(initialformdata);
                  }}
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

export default EditDiscount;
