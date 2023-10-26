import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hook/usefetch";

const Category = () => {
  const navigate = useNavigate();
  const { loadeddata } = useFetch(
    "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com/product.json"
  );
  let uniqdata;
  if (loadeddata != null) {
    uniqdata = loadeddata.filter((obj, i) => {
      return (
        i ===
        loadeddata.findIndex(
          (o) => obj.data.categoryname === o.data.categoryname
        )
      );
    });
  }

  return (
    <div className="flex md:flex-row gap-5 items-center flex-col justify-around m-5">
      {uniqdata &&
        uniqdata.map((item) => {
          return (
            <div
              key={item.data.ID}
              className="flex flex-col justify-between items-center a p-10 hover:shadow-none transition cursor-pointer"
              onClick={() => navigate(`/product/${item.data.categoryname}`)}
            >
              <img
                src={`${window.location.origin}/assets/category/${item.data.categoryname}.jpg`}
                height="300px"
                width="260px"
                className="mix-blend-hard-light"
                alt={`logo of ${item.data.categoryname}`}
              />
              <h3 className=" text-xl font-semibold capitalize">
                {item.data.categoryname}
              </h3>

              <button className="buttons">Explore More</button>
            </div>
          );
        })}
    </div>
  );
};

export default Category;
