import { useEffect } from "react";
import { useFetch } from "../../hook/usefetch";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const navigator = useNavigate();
  let parameter = useParams();
  let category = parameter.category;
  console.log(category);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  document.title = "Mobile Planet | Product";

  const { data, error, isPending } = useFetch(
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
        {data &&
          data
            .filter((item) =>
              category ? item.categoryname === category : item
            )
            .map((item) => (
              <div
                key={item.ID}
                className="flex justify-around py-5 border-2 items-center md:items-start md:flex-row flex-col gap-8"
              >
                <div className="lg:w-[20%] object-contain">
                  <img
                    src={`${window.location.origin}/assets/product/${item.productimage}`}
                    height="200px"
                    width="200px"
                    alt={item.productname}
                  />
                </div>
                <div className="flex flex-col justify-around md:w-[30%] lg:w-[50%] gap-4 px-3">
                  <h2 className="text-xl font-bold">{`${item.productname.toUpperCase()} ( ${
                    item.productcolor
                  } , ${item.productrom}GB )`}</h2>
                  <ul className="flex flex-col gap-1">
                    <li className="">{`${item.productram} GB RAM | ${item.productrom} GB ROM`}</li>
                    <li className="">{item.productdisplay}</li>
                    <li className="">{item.productcamera}</li>
                    <li className="">{item.productbattery}</li>
                    <li className="">{item.productprocessor}</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3  items-center">
                  <h2 className="text-xl font-bold">{item.productprice}</h2>
                  <button
                    className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]"
                    onClick={() => navigator(`/singleproduct/${item.ID}`)}
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
