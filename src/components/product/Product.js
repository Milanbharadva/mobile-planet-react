import { useEffect } from "react";
import { useFetch } from "../../hook/usefetch";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const navigator = useNavigate();
  let parameter = useParams();
  let category = parameter.category;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  document.title = "Mobile Planet | Product";

  const { error, isPending, loadeddata } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );
  return (
    <div className="mt-10 md:mx-20 sm:mx-10 mx-3 lg:mx-20 xl:mx-48 ">
      {error && !isPending && (
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

      <div>
        {loadeddata &&
          loadeddata
            .filter((item) =>
              category ? item.data.categoryname === category : item
            )
            .map((item) => (
              <div
                key={item.data.ID}
                className="flex justify-around py-5 border-2 items-center md:items-start md:flex-row flex-col gap-8"
              >
                <div className="lg:w-[20%] object-contain">
                  <img
                    src={`${window.location.origin}/assets/product/${item.data.productimage}`}
                    height="200px"
                    width="200px"
                    alt={item.data.productname}
                  />
                </div>
                <div className="flex flex-col justify-around md:w-[30%] lg:w-[50%] gap-4 px-3">
                  <h2 className="text-xl font-bold">{`${item.data.productname.toUpperCase()} ( ${
                    item.data.productcolor
                  } , ${item.data.productrom}GB )`}</h2>
                  <ul className="flex flex-col gap-1">
                    <li className="">{`${item.data.productram} GB RAM | ${item.data.productrom} GB ROM`}</li>
                    <li className="">{item.data.productdisplay}</li>
                    <li className="">{item.data.productcamera}</li>
                    <li className="">{item.data.productbattery}</li>
                    <li className="">{item.data.productprocessor}</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3  items-center">
                  <h2 className="text-xl font-bold">
                    {item.data.productprice}
                  </h2>
                  <button
                    className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]"
                    onClick={() => navigator(`/singleproduct/${item.data.ID}`)}
                  >
                    Details
                  </button>
                  <button className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Product;
