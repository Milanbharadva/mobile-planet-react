import { useEffect } from "react";
import { useFetch } from "../../hook/usefetch";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { addtocart, localStringConverter } from "../../global";
const Product = () => {
  const cartdata = useFetch("cart");

  const navigator = useNavigate();
  let parameter = useParams();
  let category = parameter.category;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  document.title = "Mobile Planet | Product";

  const { error, isPending, loadeddata } = useFetch("product");
  return (
    <div className="mt-10 md:mx-20 sm:mx-10 mx-5 lg:mx-20 xl:mx-48 ">
      {error && !isPending && (
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
      ) : loadeddata.length === 0 ? (
        <h1 className="flex justify-center items-center text-xl font-bold text-red-700">
          Sorry! No Product Available
        </h1>
      ) : (
        <>
          {loadeddata &&
            loadeddata
              .filter((item) =>
                category ? item.categoryname === category : item
              )
              .map((item, index) => (
                <div
                  key={item.id}
                  className={`flex justify-around py-5 ${index==loadeddata.length-1?"":"border-b-0"}  border-2 items-center md:items-start md:flex-row flex-col gap-8`}
                >
                  <div className="lg:w-[20%] object-contain">
                    <img
                      src={`${item.productimage}`}
                      height="280px"
                      width="280px"
                      alt={item.productname}
                    />
                  </div>
                  <div className="flex flex-col justify-around md:w-[30%] lg:w-[50%] gap-4 px-3">
                    <h2 className="text-xl font-bold text-center sm:text-left">{`${item.productname.toUpperCase()} ( ${
                      item.productcolor
                    } , ${item.productrom}GB )`}</h2>
                    <ul className="flex flex-col gap-1">
                      <li>{`${item.productram} GB RAM | ${item.productrom} GB ROM`}</li>
                      <li>{item.productdisplay}</li>
                      <li>{item.productcamera}</li>
                      <li>{item.productbattery}</li>
                      <li>{item.productprocessor}</li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3  items-center">
                    <h2 className="text-xl font-bold">
                      {localStringConverter(item.productprice)} ₹
                    </h2>
                    <button
                      className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]"
                      onClick={() => navigator(`/singleproduct/${item.id}`)}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        addtocart(item.id, cartdata);
                      }}
                      className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
        </>
      )}
    </div>
  );
};

export default Product;
