import { db } from "../../Firebase/fiirebase";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
const Addproduct = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);
  const notify = () => toast.success("Product added");
  const categoryarr = ["apple", "samsung", "oneplus"];

  let nameref = useRef();
  let priceref = useRef();
  let ramref = useRef();
  let romref = useRef();
  let colorref = useRef();
  let cameraref = useRef();
  let battteryref = useRef();
  let displayref = useRef();
  let processorref = useRef();
  let imgref = useRef();
  let categoryref = useRef();
  async function validate(e) {
    e.preventDefault();
    await addDoc(collection(db, "product"), {
      productname: nameref.current.value,
      productprice: priceref.current.value,
      productram: ramref.current.value,
      productrom: romref.current.value,
      productcolor: colorref.current.value,
      productcamera: cameraref.current.value,
      productbattery: battteryref.current.value,
      productdisplay: displayref.current.value,
      productprocessor: processorref.current.value,
      productimage: imgref.current.files[0].name,
      categoryname: categoryref.current.value,
    }).then((res) => {
      if (res._key.path.segments[1]) {
        nameref.current.value = "";
        priceref.current.value = "";
        ramref.current.value = "";
        romref.current.value = "";
        colorref.current.value = "";
        cameraref.current.value = "";
        battteryref.current.value = "";
        displayref.current.value = "";
        processorref.current.value = "";
        imgref.current.value = "";
        categoryref.current.value = "";
        notify();
      }
    });
  }

  return (
    <div className="bg-gray-200">
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-[40vw]">
          <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
          <form method="post" onSubmit={validate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product name
              </label>
              <input
                type="text"
                name="productname"
                placeholder="Enter Product name"
                ref={nameref}
                autoComplete="on"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product price
              </label>
              <input
                type="number"
                name="productprice"
                placeholder="Enter Product price"
                ref={priceref}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product RAM
              </label>
              <input
                type="number"
                name="productram"
                placeholder="Enter Product RAM"
                ref={ramref}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Image
              </label>
              <input
                type="file"
                id="exampleInputFile"
                name="productimage"
                ref={imgref}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product ROM
              </label>
              <input
                type="number"
                name="productrom"
                placeholder="Enter Product ROM"
                ref={romref}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Color
              </label>
              <input
                type="text"
                name="productcolor"
                ref={colorref}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter Product Color"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Camera
              </label>
              <input
                type="text"
                name="productcamera"
                ref={cameraref}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter Product Camera"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Category
              </label>
              <select
                name="categoryname"
                ref={categoryref}
                className="mt-1 p-2 w-full border rounded-md"
                required
              >
                <option value="Select category" disabled selected>
                  Select category
                </option>
                {categoryarr.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Battery
              </label>
              <input
                type="text"
                name="productbattery"
                placeholder="Enter Product Camera"
                ref={battteryref}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Display
              </label>
              <input
                type="text"
                name="productdisplay"
                placeholder="Enter Product Display"
                ref={displayref}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Processor
              </label>
              <input
                type="text"
                name="productprocessor"
                placeholder="Enter Product Processor"
                ref={processorref}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
