import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import { useEffect } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const Shop = () => {
  const { loadeddata, error, isPending } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );
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
        {isPending && (
          <div className="flex items-center mt-2 justify-center">
            <h1 className="text-2xl font-semibold ">Loading...</h1>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5 px-10 md:px-24  lg:px-32">
          {loadeddata &&
            loadeddata.map((item) => (
              <div
                key={item.data.ID}
                className={`a hover:shadow-none flex  flex-col py-8 items-center gap-2
                 ${item.data.categoryname}`}
              >
                <img
                  src={`${window.location.origin}/assets/product/${item.data.productimage}`}
                  height="300px"
                  // className="object-contain"
                  alt={`${item.data.productname}`}
                  onClick={() => {
                    navigate(`/singleproduct/${item.data.ID}`);
                  }}
                  className="cursor-pointer"
                />
                <h1 className="text-lg md:text-2xl font-bold">
                  {item.data.productname.toUpperCase()}
                </h1>
                <p className="text-xl font-semibold">
                  {item.data.productprice}₹
                </p>
                <button
                  onClick={() => navigate("/cart")}
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
