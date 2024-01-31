import { db } from "../../../Firebase/fiirebase";
import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import { notifyproductaddedsuccess } from "../../../toast";
const Addproduct = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, [navigate]);
  const categoryarr = [
    "Select category",
    "apple",
    "samsung",
    "oneplus",
  ];

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
  let descriptionref = useRef();
  const [categoryError, setCategoryError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = () => {
    const file = imgref.current.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  async function validate(e) {
    e.preventDefault();
    if (categoryref.current.value === categoryarr[0]) {
      setCategoryError(true);
      return;
    }

    setCategoryError(false);
    await addDoc(collection(db, "product"), {
      productname: nameref.current.value,
      productprice: priceref.current.value,
      productram: ramref.current.value,
      productdescription: descriptionref.current.value,
      productrom: romref.current.value,
      productcolor: colorref.current.value,
      productcamera: cameraref.current.value,
      productbattery: battteryref.current.value,
      productdisplay: displayref.current.value,
      productprocessor: processorref.current.value,
      productimage: imagePreview,
      categoryname: categoryref.current.value,
    }).then((res) => {
      if (res._key.path.segments[1]) {
        setImagePreview(null);
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
        descriptionref.current.value = "";
        categoryref.current.value = categoryarr[0];
        notifyproductaddedsuccess();
      }
    });
  }

  return (
    <div className="bg-gray-200">
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md lg:w-[40vw] w-[90vw] ">
          <div className="flex  justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold ">Add Product</h2>
            <button
              onClick={() => {
                navigate("/admin/product");
              }}
            >
              Back
            </button>
          </div>
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
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product discription
              </label>
              <textarea
                type="text"
                name="productdescription"
                placeholder="Enter Product description"
                ref={descriptionref}
                autoComplete="on"
                className="mt-1 p-2 w-full border rounded-md"
                required
              ></textarea>
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
                onChange={handleImageChange}
                name="productimage"
                ref={imgref}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="mt-2 w-32 h-32 rounded-md"
                />
              )}
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
                className={`mt-1 p-2 w-full border rounded-md ${
                  categoryError ? "border-red-500" : ""
                }`}
                required
                defaultValue={categoryarr[0]}
              >
                {categoryarr.map((item, index) => (
                  <option
                    value={item}
                    key={item}
                    disabled={index === 0 ? true : ""}
                  >
                    {item}
                  </option>
                ))}
              </select>
              {categoryError && (
                <p className="text-red-500 text-sm mt-2">
                  Please select a valid category.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Battery
              </label>
              <input
                type="text"
                name="productbattery"
                placeholder="Enter Product Battery Capacity"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
