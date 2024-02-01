import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import { useEffect } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { addtocart } from "../../global";
const Shop = () => {
  const { loadeddata, error, isPending } = useFetch("product");
  const cartdata = useFetch("cart");

  document.title = "Mobile Planet | Shop";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb paragraph="FAST AND EASY" heading="Shop" />
      <div className="mt-10">
        {error && (
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-red-700">
              Error in fetch please try again later.
            </h1>
          </div>
        )}
        {isPending ? (
          <div className="flex items-center justify-center ">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          loadeddata.length === 0 && (
            <h1 className="flex justify-center items-center text-xl font-bold text-red-700">
              Sorry! No Product Available
            </h1>
          )
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5 px- md:px-24  lg:px-32">
          {loadeddata &&
            loadeddata.map((item) => (
              <div
                key={item.id}
                className={`a hover:shadow-none flex  flex-col py-8 items-center gap-2
              ${item.categoryname}`}
              >
                <img
                  src={`${item.productimage}`}
                  height="300px"
                  alt={`${item.productname}`}
                  onClick={() => {
                    navigate(`/singleproduct/${item.id}`);
                  }}
                  className="cursor-pointer"
                />
                <h1 className="text-lg md:text-xl font-bold text-center">
                  {item.productname.toUpperCase()}
                </h1>
                <p className="text-xl font-semibold">
                  {parseInt(item.productprice).toLocaleString()}₹
                </p>
                <button
                  onClick={() => {
                    addtocart(`${item.id}`, cartdata);
                  }}
                  className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]"
                >
                  Add to cart
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
