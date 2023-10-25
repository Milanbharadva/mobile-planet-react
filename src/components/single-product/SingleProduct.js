import { useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../hook/usefetch";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SingleProduct = (props) => {
  console.log("single product running")
  const notify = () => toast.success("Product added to cart");
  const notify2 = () => toast.warning("Please log in to add to cart");
  const notify3 = () =>
    toast.error("error in add to cart please try again later");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loadeddata } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );
  const parameters = useParams();
  const productid = parameters.id;

  if (loadeddata != null) {
    var items = loadeddata.filter((item) => item.data.ID == productid);
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
        .then((loadeddata) => {
          if (loadeddata.name) {
            notify();
           setTimeout(() => {
            props.onchange(true);
           }, 5000);
          }
          else{
            notify3()
          }
        });
    } else {
      notify2();
    }
  }
  return (
    <div className="mt-10">
      <ToastContainer limit={1} />
      {items &&
        items.map((product) => (
          <div
            key={product.data.ID}
            className="flex md:flex-row  flex-col mx-5 sm:mx-10 md:mx-20 lg:mx-30"
          >
            <div className="md:w-[40%] a px-2 py-4">
              <a
                href={`${window.location.origin}/assets/product/${product.data.productimage}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${window.location.origin}/assets/product/${product.data.productimage}`}
                  alt={product.data.productname}
                  className="object-contain cursor-pointer"
                  onClick={() => {
                    window.location.href = `${window.location.origin}/assets/product/${product.data.productimage}`;
                  }}
                />
              </a>
            </div>
            <div className="md:w-[60%] md:ml-24 flex flex-col gap-5 justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {product.data.productname.toUpperCase()}
              </h2>
              <p className="text-xl font-bold">
                PRICE : {product.data.productprice}
              </p>
              <p className="text-xl font-bold">
                {" "}
                RAM : {product.data.productram}GB
              </p>
              <p className="text-xl font-bold">
                {" "}
                ROM : {product.data.productrom}GB
              </p>
              <p className="text-xl font-bold">
                Color : {product.data.productcolor}
              </p>
              <p className="text-xl font-bold">
                Camera : {product.data.productcamera}
              </p>
              <p className="text-xl font-bold">
                Battery Capacity : {product.data.productbattery}
              </p>
              <p className="text-xl font-bold">
                Display : {product.data.productdisplay}
              </p>
              <p className="text-xl font-bold">
                Processor : {product.data.productprocessor}
              </p>
              <p className="text-xl font-bold">
                Category : {product.data.categoryname.toUpperCase()}
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
