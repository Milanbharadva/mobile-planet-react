import { db } from "../../Firebase/fiirebase";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
const EditProduct = ({ route }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);
  const notify = () => toast.success("Product updated sucessfully");
  const loadeddata = useFetch("product");
  const productforedit = loadeddata.loadeddata.filter(
    (item) => item.id == state.productid
  )[0];
  const [formdata, setFormdata] = useState({
    productname: "",
    productprice: "",
    productram: "",
    productrom: "",
    productcolor: "",
    productcamera: "",
    productbattery: "",
    productdisplay: "",
    productprocessor: "",
    productimage: "",
    categoryname: "",
  });
  useEffect(() => {
    setFormdata(productforedit);
  }, [productforedit]);
  const handler = (e) => {
    const { name, value } = e.target;
    setFormdata((prevformdata) => ({ ...prevformdata, [name]: value }));
  };
  if (productforedit != null) {
  }
  async function validate(e) {
    e.preventDefault();
    const getproduct = doc(db, "product", state.productid);
    await updateDoc(getproduct, formdata);
    notify();
    navigate("/admin/product");
  }

  return (
    <div>
      <form
        method="post"
        onSubmit={validate}
        className=" mt-5 flex flex-col justify-center items-center"
      >
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Product name </label>
            <input
              type="text"
              name="productname"
              placeholder="Enter Product name"
              value={formdata && formdata.productname}
              onChange={(e) => {
                handler(e);
              }}
              autoComplete="on"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Product price </label>
            <input
              type="number"
              name="productprice"
              value={formdata && formdata.productprice}
              placeholder="Enter Product price"
              onChange={(e) => {
                handler(e);
              }}
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Product RAM </label>
            <input
              type="number"
              name="productram"
              placeholder="Enter Product RAM"
              value={formdata && formdata.productram}
              onChange={(e) => {
                handler(e);
              }}
            />
          </div>
          <br />
          <div className="form-group">
            <div className="custom-file">
              <label htmlFor="exampleInputFile">Product Image </label>
              <input
                type="file"
                className="custom-file-input"
                id="exampleInputFile"
                name="productimage"
                onChange={(e) => {
                  handler(e);
                }}
              />
              {formdata && formdata.productimage}
            </div>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Product ROM </label>
            <input
              type="number"
              name="productrom"
              placeholder="Enter Product ROM"
              value={formdata && formdata.productrom}
              onChange={(e) => {
                handler(e);
              }}
            />
            <br />
            <br />
            <label htmlFor="exampleInputEmail1">Product Color </label>
            <input
              type="text"
              name="productcolor"
              placeholder="Enter Product Color"
              value={formdata && formdata.productcolor}
              onChange={(e) => {
                handler(e);
              }}
            />
          </div>
          <br />
          <label htmlFor="exampleInputEmail1">Product Camera </label>
          <input
            type="text"
            name="productcamera"
            placeholder="Enter Product Camera"
            value={formdata && formdata.productcamera}
            onChange={(e) => {
              handler(e);
            }}
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Category </label>
          <input
            type="text"
            name="categoryname"
            placeholder="Enter Product Category"
            value={formdata && formdata.categoryname}
            onChange={(e) => {
              handler(e);
            }}
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Battery </label>
          <input
            type="text"
            name="productbattery"
            value={formdata && formdata.productbattery}
            placeholder="Enter Product Battery"
            onChange={(e) => {
              handler(e);
            }}
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Display </label>
          <input
            type="text"
            name="productdisplay"
            value={formdata && formdata.productdisplay}
            placeholder="Enter Product Display"
            onChange={(e) => {
              handler(e);
            }}
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Processor </label>
          <input
            type="text"
            name="productprocessor"
            placeholder="Enter Product Processor"
            value={formdata && formdata.productprocessor}
            onChange={(e) => {
              handler(e);
            }}
          />
        </div>
        <br />
        <div className="card-footer">
          <button
            type="submit"
            name="submit"
            value="add"
            className="btn btn-primary col-md-12 buttons"
          >
            Submit
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default EditProduct;
