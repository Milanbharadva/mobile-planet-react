import { db } from "../../../Firebase/fiirebase";
import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hook/usefetch";
import AdminNavbar from "../AdminNavbar";
import Loader from "../../../Loader";
import { notifyproductupdated } from "../../../toast";
const EditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, [navigate]);

  const categoryarr = ["apple", "samsung", "oneplus"];
  const loadeddata = useFetch("product");
  const productforedit = loadeddata.loadeddata.filter(
    (item) => item.id === state.productid
  )[0];
  const initialformdata = {
    productname: productforedit?.productname || "",
    productprice: productforedit?.productprice || "",
    productdescription: productforedit?.productdescription || "",
    productram: productforedit?.productram || "",
    productrom: productforedit?.productrom || "",
    productcolor: productforedit?.productcolor || "",
    productcamera: productforedit?.productcamera || "",
    productbattery: productforedit?.productbattery || "",
    productdisplay: productforedit?.productdisplay || "",
    productprocessor: productforedit?.productprocessor || "",
    productimage: productforedit?.productimage || "",
    categoryname: productforedit?.categoryname || "",
  };
  const imgref = useRef();
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (state && state.disablechange === true) {
      setDisable(true);
    }
  }, [state]);
  const [formdata, setFormdata] = useState(initialformdata);
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    setFormdata(initialformdata);
    if (productforedit && productforedit.productimage) {
      setImagePreview(productforedit.productimage);
    }
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
    notifyproductupdated("product");
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
      {loadeddata.isPending ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center">
          <div className="bg-white md:p-8 p-5 rounded shadow-md lg:w-[40vw] w-[100vw]">
            <h2 className="text-2xl font-semibold mb-6">
              {disable ? "Show " : "Edit "} Product
            </h2>
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
                    disabled={disable}
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
                    className="mt-1 p-2 w-full h-32 pt-1 border border-black resize-none rounded-md"
                    value={formdata && formdata.productdescription}
                    onChange={(e) => {
                      handler(e);
                    }}
                    disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
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
                    className="mt-1 p-2 w-full border rounded-md"
                    id="imgpicker"
                    name="productimage"
                    disabled={disable}
                    onChange={handleImageChange}
                  />

                  {formdata && (
                    <div className="w-full  items-center flex">
                      <img src={imagePreview} alt="preview" className="h-32 " />
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
                    disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
                    value={formdata && formdata.categoryname}
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    {categoryarr.map((item) => (
                      <option key={item} value={item}>
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
                    disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
                    className="mt-1 p-2 w-full border rounded-md"
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
                      Return To Product Page
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      name="button"
                      value="button"
                      className="btn btn-primary col-md-12 buttons w-full"
                      onClick={() => {
                        setDisable(false);
                      }}
                    >
                      Edit Product
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4 flex gap-5 justify-center">
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
              )}
            </form>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default EditProduct;
