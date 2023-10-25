import { useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../hook/usefetch";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SingleProduct = (props) => {
  const notify = () => toast.success("Product added to cart");
  const notify2 = () => toast.warning("Please log in to add to cart");
  const notify3 = () => toast.error("error in add to cart please try again later");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );
  const parameters = useParams();
  const productid = parameters.id;

  if (data != null) {
    var items = data.filter((item) => item.ID === productid);
  }
  function addtocart() {
    if (localStorage.getItem("userid")) {
      const itemdata = {
        ID: uuidv4(),
        userid: localStorage.getItem("userid"),
        productid: productid,
        quantity: 1,
      };
      fetch(
        "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/cart.json",
        {
          method: "POST",
          body: JSON.stringify(itemdata),
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) =>{
          if(data.name){
            // notify();
            props.onchange(true);
          }
        }
          );
    } else {
      notify2();
    }
  }
  return (
    <div className="mt-10">
      <ToastContainer />

      {items &&
        items.map((product) => (
          <div
            key={product.ID}
            className="flex md:flex-row  flex-col mx-5 sm:mx-10 md:mx-20 lg:mx-30"
          >
            <div className="md:w-[40%] a px-2 py-4">
              <a
                href={`${window.location.origin}/assets/product/${product.productimage}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${window.location.origin}/assets/product/${product.productimage}`}
                  alt={product.productname}
                  className="object-contain cursor-pointer"
                  onClick={() => {
                    window.location.href = `${window.location.origin}/assets/product/${product.productimage}`;
                  }}
                />
              </a>
            </div>
            <div className="md:w-[60%] md:ml-24 flex flex-col gap-5 justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {product.productname.toUpperCase()}
              </h2>
              <p className="text-xl font-bold">
                PRICE : {product.productprice}
              </p>
              <p className="text-xl font-bold"> RAM : {product.productram}GB</p>
              <p className="text-xl font-bold"> ROM : {product.productrom}GB</p>
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
                Category : {product.categoryname.toUpperCase()}
              </p>
              <div>
                <button className="buttons" onClick={addtocart}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SingleProduct;
