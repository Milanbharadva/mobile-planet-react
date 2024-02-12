import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { useFetch } from "../../hook/usefetch";
import "react-toastify/dist/ReactToastify.css";
import { addtocart, localStringConverter } from "../../global";

const SingleProduct = () => {
  let productname;
  const navigate = useNavigate();

  const cartdata = useFetch("cart");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loadeddata } = useFetch("product");
  const parameters = useParams();
  const productid = parameters.id;

  if (loadeddata != null) {
    var items = loadeddata.filter((item) => item.id === productid);
  }

  return (
    <>
      <div className="mt-10">
        {items &&
          items.map((product) => (
            <div
              key={product.id}
              className="flex md:flex-row  flex-col mx-5 sm:mx-10 md:mx-20 lg:mx-30"
            >
              <div className="md:w-[40%] a hover:shadow-none px-2 py-4">
                <img
                  src={product.productimage}
                  alt={product.productname}
                  className="object-contain"
                />
              </div>
              <div className="md:w-[60%] md:ml-24 flex flex-col gap-5 justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {(productname = product.productname.toUpperCase())}
                </h2>
                <p className="text-xl font-bold">
                  PRICE : {localStringConverter(product.productprice)}
                </p>
                <p className="text-xl font-bold">
                  RAM : {product.productram}GB
                </p>
                <p className="text-xl font-bold">
                  ROM : {product.productrom}GB
                </p>
                <p className="text-xl font-bold">
                  Color : {product.productcolor}
                </p>
                <p className="text-xl font-bold">
                  Camera : {product.productcamera}
                </p>
                <p className="text-xl font-bold">
                  Battery Capacity : {product.productbattery}
                </p>
                <p className="text-xl font-bold">
                  Display : {product.productdisplay}
                </p>
                <p className="text-xl font-bold">
                  Processor : {product.productprocessor}
                </p>
                <p className="text-xl font-bold">
                  Description :{" "}
                  <span className=" font-semibold text-base">
                    {" "}
                    {product.productdescription}
                  </span>
                </p>
                <p className="text-xl font-bold">
                  Category : {product.categoryname.toUpperCase()}
                </p>
                <div>
                  <button
                    className="buttons"
                    onClick={() => {
                      addtocart(product.id, cartdata);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        {loadeddata.filter(
          (items) =>
            items.productname.toUpperCase() === productname.toUpperCase() &&
            items.id !== productid
        ).length > 0 && (
          <div className="mt-24">
            <h1 className="underline text-3xl underline-offset-4 decoration-[#F28123] flex justify-center items-center">
              <span className="text-[#F28123]">Related&nbsp;</span> Products
            </h1>
            <div className="mt-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5 px-5 md:px-24  lg:px-32">
                {loadeddata &&
                  loadeddata
                    .filter(
                      (items) =>
                        items.productname.toUpperCase() ===
                          productname.toUpperCase() && items.id !== productid
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`a hover:shadow-none flex flex-col py-8 items-center gap-2
              ${item.categoryname}`}
                      >
                        <img
                          src={item.productimage}
                          height="300px"
                          alt={`${item.productname}`}
                          onClick={() => {
                            navigate(`/singleproduct/${item.id}`);
                          }}
                          className="cursor-pointer"
                        />
                        <h1 className="md:text-lg text-sm font-bold text-center md:text-left">
                          {item.productname.toUpperCase()}
                        </h1>
                        <p className="text-md md:text-xl font-bold">
                          {item.productcolor.toUpperCase()}
                        </p>
                        <p className="text-xl font-semibold">
                          {localStringConverter(item.productprice)}₹
                        </p>
                        <button
                          onClick={() => {
                            addtocart(`${item.id}`, cartdata);
                          }}
                          className="buttons"
                        >
                          Add to cart
                        </button>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
