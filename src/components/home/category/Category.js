import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hook/usefetch";

const Category = () => {
  const navigate = useNavigate();
  const { data } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );
  let uniqdata;
  if (data != null) {
    uniqdata = data.filter((obj, i) => {
      return i === data.findIndex((o) => obj.categoryname === o.categoryname);
    });
  }

  return (
    <div className="flex md:flex-row gap-5 items-center flex-col justify-around m-5">
      {uniqdata &&
        uniqdata.map((item) => {
          return (
            <div
              className="flex flex-col justify-between items-center a p-10 hover:shadow-none transition cursor-pointer"
              onClick={() => navigate(`/?cat=${item.categoryname}`)}
            >
              <img
                src={`${window.location.origin}/assets/category/${item.categoryname}.jpg`}
                height="300px"
                width="260px"
                className="mix-blend-hard-light"
                alt={`logo of ${item.categoryname}`}
              />
              <h3 className=" text-xl font-semibold capitalize">
                {item.categoryname}
              </h3>

              <button className="buttons">Explore More</button>
            </div>
          );
        })}
    </div>
  );
};

export default Category;
