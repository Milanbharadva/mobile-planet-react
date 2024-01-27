import { useEffect } from "react";
import { useFetch } from "../../hook/usefetch";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../Firebase/fiirebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product = (props) => {
  const cartdata = useFetch("cart");

  const notify = () => toast.success("Product added to cart");
  const notify4 = () => toast.success("item quantity updated sucessfully");
  const notify2 = () => toast.warning("Please log in to add to cart");
  const notify3 = () =>
    toast.error("error in add to cart please try again later");
  const navigator = useNavigate();
  let parameter = useParams();
  let category = parameter.category;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  document.title = "Mobile Planet | Product";
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

  const { error, isPending, loadeddata } = useFetch("product");
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
      {loadeddata.length == 0 ? (
        <h1 className="flex justify-center items-center text-xl font-bold text-red-700">
          Sorry! No Product Available
        </h1>
      ) : (
        <div>
          {loadeddata &&
            loadeddata
              .filter((item) =>
                category ? item.categoryname === category : item
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-around py-5 border-2 items-center md:items-start md:flex-row flex-col gap-8"
                >
                  <div className="lg:w-[20%] object-contain">
                    <img
                      src={`${item.productimage}`}
                      height="200px"
                      width="200px"
                      alt={item.productname}
                    />
                  </div>
                  <div className="flex flex-col justify-around md:w-[30%] lg:w-[50%] gap-4 px-3">
                    <h2 className="text-xl font-bold text-center sm:text-left">{`${item.productname.toUpperCase()} ( ${
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
                    <h2 className="text-xl font-bold">
                      {parseInt(item.productprice).toLocaleString()}
                    </h2>
                    <button
                      className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]"
                      onClick={() => navigator(`/singleproduct/${item.id}`)}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        addtocart(item.id);
                      }}
                      className="text-white bg-[#F28123] h-[50px] w-[200px] rounded-[50px]"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Product;
