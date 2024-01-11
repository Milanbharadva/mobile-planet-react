import { db } from "../../Firebase/fiirebase";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Addproduct = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);
  const notify = () => toast.success("Product added");

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
              ref={nameref}
              autoComplete="on"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Product price </label>
            <input
              type="number"
              name="productprice"
              placeholder="Enter Product price"
              ref={priceref}
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Product RAM </label>
            <input
              type="number"
              name="productram"
              placeholder="Enter Product RAM"
              ref={ramref}
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
                ref={imgref}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Product ROM </label>
            <input
              type="number"
              name="productrom"
              placeholder="Enter Product ROM"
              ref={romref}
            />
            <br />
            <br />
            <label htmlFor="exampleInputEmail1">Product Color </label>
            <input
              type="text"
              name="productcolor"
              ref={colorref}
              placeholder="Enter Product Color"
            />
          </div>
          <br />
          <label htmlFor="exampleInputEmail1">Product Camera </label>
          <input
            type="text"
            name="productcamera"
            ref={cameraref}
            placeholder="Enter Product Camera"
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Category </label>
          <input
            type="text"
            name="productcategory"
            ref={categoryref}
            placeholder="Enter Product Category"
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Battery </label>
          <input
            type="text"
            name="productbattery"
            placeholder="Enter Product Camera"
            ref={battteryref}
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Display </label>
          <input
            type="text"
            name="productdisplay"
            placeholder="Enter Product Display"
            ref={displayref}
          />
          <br />
          <br />
          <label htmlFor="exampleInputEmail1">Product Processor </label>
          <input
            type="text"
            name="productprocessor"
            placeholder="Enter Product Processor"
            ref={processorref}
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

export default Addproduct;
