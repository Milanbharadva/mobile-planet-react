import { db } from "../../Firebase/fiirebase";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import AdminNavbar from "./AdminNavbar";
const ShowProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);
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
  const [formdata, setFormdata] = useState(initialformdata);
  useEffect(() => {
    setFormdata(productforedit);
  }, [productforedit]);

  if (productforedit != null) {
  }

  return (
    <div className="bg-gray-200">
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md lg:w-[40vw] w-[90vw]">
          <h2 className="text-2xl font-semibold mb-6">Show Product</h2>
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/admin/product");
            }}
          >
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
                  className="mt-1 p-2 w-full border rounded-md"
                  autoComplete="on"
                  required
                  disabled
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
                  disabled
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
                  required
                  min={1}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
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
                  className="mt-1 p-2 w-full border rounded-md"
                  min={1}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="imgpicker"
                >
                  Product Image
                </label>

                {formdata && (
                  <div className="w-full justify-center items-center flex">
                    <img
                      src={`${window.location.origin}/assets/product/${formdata.productimage}`}
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
                  min={1}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
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
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
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
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="exampleInputEmail1"
                >
                  Product Category
                </label>
                <input
                  type="text"
                  name="productcamera"
                  placeholder="Enter Product Camera"
                  value={formdata && formdata.categoryname}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
                />
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
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
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
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
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
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
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
                  Return To Product Page
                </button>
              </div>
              <div>
                <button
                  type="button"
                  name="button"
                  value="button"
                  className="btn btn-primary col-md-12 buttons"
                  onClick={() => {
                    navigate("/admin/editproduct", {
                      state: {
                        productid: state.productid,
                      },
                    });
                  }}
                >
                  Edit Product
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

export default ShowProduct;
