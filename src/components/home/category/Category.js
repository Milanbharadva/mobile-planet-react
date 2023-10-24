import { useNavigate } from "react-router-dom";
import product from "../../../data/product";

const Category = () => {
  const navigate = useNavigate();
  const uniqdata = product.filter((obj, i) => {
    return i === product.findIndex((o) => obj.categoryname === o.categoryname);
  });

  return (
    <div className="flex md:flex-row gap-5 items-center flex-col justify-around m-5">
      {uniqdata.map((item) => {
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
