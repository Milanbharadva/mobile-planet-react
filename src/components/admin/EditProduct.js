import { db } from "../../Firebase/fiirebase";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import AdminNavbar from "./AdminNavbar";
const EditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);

  const notify = () => toast.success("Product updated sucessfully");
  const categoryarr = ["apple", "samsung", "oneplus"];
  const loadeddata = useFetch("product");
  const productforedit = loadeddata.loadeddata.filter(
    (item) => item.id == state.productid
  )[0];
  const initialformdata = {
    productname: productforedit && productforedit.productname,
    productprice: productforedit && productforedit.productprice,
    productdescription: productforedit && productforedit.productdescription,
    productram: productforedit && productforedit.productram,
    productrom: productforedit && productforedit.productrom,
    productcolor: productforedit && productforedit.productcolor,
    productcamera: productforedit && productforedit.productcamera,
    productbattery: productforedit && productforedit.productbattery,
    productdisplay: productforedit && productforedit.productdisplay,
    productprocessor: productforedit && productforedit.productprocessor,
    productimage: productforedit && productforedit.productimage,
    categoryname: productforedit && productforedit.categoryname,
  };
  const imgref = useRef();
  const [formdata, setFormdata] = useState(initialformdata);
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    setFormdata(productforedit);
    if (productforedit != null) setImagePreview(productforedit.productimage);
  }, [productforedit]);
  const handler = (e) => {
    const { name, value } = e.target;
    setFormdata((prevformdata) => ({ ...prevformdata, [name]: value }));
  };
  async function validate(e) {
    e.preventDefault();
    formdata.productimage = imagePreview;
    const getproduct = doc(db, "product", state.productid);
    await updateDoc(getproduct, formdata);
    notify();
    navigate("/admin/product");
  }
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
  return (
    <div className="bg-gray-200">
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md lg:w-[40vw] w-[90vw]">
          <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
          <form method="post" onSubmit={validate}>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Product name
                </label>
                <input
                  type="text"
                  name="productname"
                  placeholder="Enter Product name"
                  value={formdata && formdata.productname}
                  onChange={(e) => {
                    handler(e);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                  autoComplete="on"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Product description
                </label>
                <textarea
                  name="productdescription"
                  placeholder="Enter Product description"
                  className="mt-1 p-2 w-full h-24 border border-black resize-none rounded-md"
                  value={formdata && formdata.productdescription}
                  onChange={(e) => {
                    handler(e);
                  }}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product price
                </label>
                <input
                  type="number"
                  name="productprice"
                  value={formdata && formdata.productprice}
                  placeholder="Enter Product price"
                  onChange={(e) => {
                    handler(e);
                  }}
                  required
                  min={1}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product RAM
                </label>
                <input
                  type="number"
                  name="productram"
                  placeholder="Enter Product RAM"
                  value={formdata && formdata.productram}
                  onChange={(e) => {
                    handler(e);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                  min={1}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="imgpicker"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  ref={imgref}
                  // value={formdata.productimage}
                  className="mt-1 p-2 w-full border rounded-md"
                  id="imgpicker"
                  name="productimage"
                  onChange={handleImageChange}
                />

                {formdata && (
                  <div className="w-full  items-center flex">
                    <img
                      src={imagePreview}
                      alt=""
                      className="h-32 "
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product ROM
                </label>
                <input
                  type="number"
                  name="productrom"
                  placeholder="Enter Product ROM"
                  value={formdata && formdata.productrom}
                  onChange={(e) => {
                    handler(e);
                  }}
                  min={1}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product Color
                </label>
                <input
                  type="text"
                  name="productcolor"
                  placeholder="Enter Product Color"
                  value={formdata && formdata.productcolor}
                  onChange={(e) => {
                    handler(e);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product Camera
                </label>
                <input
                  type="text"
                  name="productcamera"
                  placeholder="Enter Product Camera"
                  value={formdata && formdata.productcamera}
                  onChange={(e) => {
                    handler(e);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product Category
                </label>
                <select
                  name="categoryname"
                  onChange={(e) => {
                    handler(e);
                  }}
                  defaultValue={formdata && formdata.categoryname}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  {formdata &&
                    categoryarr.map((item) => (
                      <option
                        value={item}
                        selected={formdata.categoryname == item}
                      >
                        {item}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product Battery
                </label>
                <input
                  type="text"
                  name="productbattery"
                  value={formdata && formdata.productbattery}
                  placeholder="Enter Product Battery"
                  onChange={(e) => {
                    handler(e);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product Display
                </label>
                <input
                  type="text"
                  name="productdisplay"
                  value={formdata && formdata.productdisplay}
                  placeholder="Enter Product Display"
                  onChange={(e) => {
                    handler(e);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product Processor
                </label>
                <input
                  type="text"
                  name="productprocessor"
                  placeholder="Enter Product Processor"
                  value={formdata && formdata.productprocessor}
                  onChange={(e) => {
                    handler(e);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
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
                    document.getElementById("imgpicker").value = "";
                    setFormdata(initialformdata);
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

export default EditProduct;
