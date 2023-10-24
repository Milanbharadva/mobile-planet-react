import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";

const Shop = () => { const top = () => {
  window.scrollTo(0, 0);
};
  const navigate = useNavigate();
  const { data, error, isPending } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );
  if (data != null) {
    var val = Object.values(data);
  }
  return (
    <div className="mt-10">
      {top()}
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10  px-20">
        {data &&
          val.map((item) => (
            <div
              key={item.ID}
              className="flex flex-col items-center gap-2 md:mt-5"
            >
              <img
                src={`${window.location.origin}/assets/product/${item.productimage}`}
                height="300px"
                // className="object-contain"
                alt={`${item.productname}`}
              />
              <h1 className="text-lg md:text-2xl font-bold">
                {item.productname.toUpperCase()}
              </h1>
              <p className="text-xl font-semibold">{item.productprice}₹</p>
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
  );
};

export default Shop;
