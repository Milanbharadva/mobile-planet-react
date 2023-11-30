import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/usefetch";
import { useEffect } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../Firebase/fiirebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
const Shop = (props) => {
  const { loadeddata, error, isPending } = useFetch("product");
  const cartdata = useFetch("cart");

  const notify = () => toast.success("Product added to cart");
  const notify2 = () => toast.warning("Please log in to add to cart");
  const notify3 = () =>
    toast.error("error in add to cart please try again later");
  const notify4 = () => toast.success("item quantity updated sucessfully");

  async function addtocart(productid) {
    let isdatarepeat = false;
    let idtodelete;
    let previousquantity = 0;
    if (localStorage.getItem("userid")) {
      cartdata.loadeddata.map((data) => {
        if (data.itemdata.productid == productid) {
          previousquantity = data.itemdata.quantity;
          isdatarepeat = true;
          idtodelete = data.id;
        }
      });
      if (isdatarepeat) {
        if (idtodelete != null) {
          const itemdata = {
            id: uuidv4(),
            userid: localStorage.getItem("userid"),
            productid: productid,
            quantity: previousquantity + 1,
          };
          await deleteDoc(doc(db, "cart", idtodelete));
          await addDoc(collection(db, "cart"), {
            itemdata,
          }).then((data) => (data.id ? notify4() : ""));
        }
      } else {
        const itemdata = {
          id: uuidv4(),
          userid: localStorage.getItem("userid"),
          productid: productid,
          quantity: 1,
        };
        await addDoc(collection(db, "cart"), {
          itemdata,
        }).then((res) => {
          if (res._key.path.segments[1] != null) {
            props.onchange();
            notify();
          } else {
            notify3();
          }
        });
      }
    } else {
      notify2();
    }
  }

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
                key={item.id}
                className={`a hover:shadow-none flex  flex-col py-8 items-center gap-2
              ${item.categoryname}`}
              >
                <img
                  src={`${window.location.origin}/assets/product/${item.productimage}`}
                  height="300px"
                  alt={`${item.productname}`}
                  onClick={() => {
                    navigate(`/singleproduct/${item.id}`);
                  }}
                  className="cursor-pointer"
                />
                <h1 className="text-lg md:text-2xl font-bold">
                  {item.productname.toUpperCase()}
                </h1>
                <p className="text-xl font-semibold">
                  {parseInt(item.productprice).toLocaleString()}₹
                </p>
                <button
                  onClick={() => {
                    addtocart(`${item.id}`);
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
