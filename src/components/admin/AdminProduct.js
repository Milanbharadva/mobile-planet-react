import React, { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import AdminNavbar from "./AdminNavbar";
import { useFetch } from "../../hook/usefetch";
import Pagination from "./Pagination";
import { db } from "../../Firebase/fiirebase";
import { FaEye } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";
import { ImSortAmountDesc } from "react-icons/im";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemperpage, setitemperpage] = useState(20);
  const [categoryfilter, setCategoryfilter] = useState("All");
  const [productnamesearch, setproductnamesearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, [navigate]);
  const data = useFetch("product");
  var totalProducts, paginatedProducts;
  let uniqdata = data.loadeddata.filter((obj, i) => {
    return (
      i ===
      data.loadeddata.findIndex((o) => obj.categoryname === o.categoryname)
    );
  });
  let allcateogryarr = ["All"];
  uniqdata.map((item) => allcateogryarr.push(item.categoryname));
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (productnamesearch === "" && categoryfilter === "All") {
    totalProducts = data.loadeddata.length;
    paginatedProducts = data.loadeddata.slice(
      (currentPage - 1) * itemperpage,
      currentPage * itemperpage
    );
  } else {
    var filteredwithname;
    if (productnamesearch !== "" && categoryfilter !== "All") {
      filteredwithname = data.loadeddata
        .filter((item) =>
          item.productname
            .toLowerCase()
            .includes(productnamesearch.toLowerCase())
        )
        .filter(
          (item) =>
            item.categoryname.toLowerCase() === categoryfilter.toLowerCase()
        );
    }
    if (productnamesearch !== "" && categoryfilter === "All") {
      filteredwithname = data.loadeddata.filter((item) =>
        item.productname.toLowerCase().includes(productnamesearch.toLowerCase())
      );
    }
    if (productnamesearch === "" && categoryfilter !== "All") {
      filteredwithname = data.loadeddata.filter(
        (item) =>
          item.categoryname.toLowerCase() === categoryfilter.toLowerCase()
      );
    }
    totalProducts = filteredwithname.length;
    paginatedProducts = filteredwithname.slice(
      (currentPage - 1) * itemperpage,
      currentPage * itemperpage
    );
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [productnamesearch]);
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col md:flex-row mx-4 md:mx-10 my-5 gap-4 md:gap-5 md:items-end">
        <div className="flex flex-col w-full md:w-1/4 gap-2">
          <label className="text-sm md:text-base">Product name</label>
          <input
            type="text"
            onChange={(e) => setproductnamesearch(e.target.value)}
            name="name"
            value={productnamesearch}
            className="pl-2 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/4 gap-2">
          <label className="text-sm md:text-base">Product Per Page</label>
          <select
            name="productperpageselector"
            onChange={(e) => {
              setCurrentPage(1);
              setitemperpage(e.target.value);
            }}
            defaultValue={20}
            className="h-10 px-2 border border-gray-300 rounded-md"
          >
            <option value="20" selected={20 === itemperpage}>
              20
            </option>
            <option value="50" selected={50 === itemperpage}>
              50
            </option>
            <option value="100" selected={100 === itemperpage}>
              100
            </option>
          </select>
        </div>
        <div className="flex flex-col w-full md:w-1/4 gap-2">
          <label className="text-sm md:text-base">Select Category</label>
          <select
            name="productperpageselector"
            onChange={(e) => {
              setCategoryfilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 px-2 border border-gray-300 rounded-md"
          >
            {allcateogryarr &&
              allcateogryarr.map((item) => {
                return (
                  <option
                    value={item}
                    key={item}
                    selected={item === categoryfilter}
                  >
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setCategoryfilter("All");
              setitemperpage(20);
              setproductnamesearch("");
            }}
            className="border px-4 md:px-10 h-10 border-black"
          >
            RESET
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              navigate("/admin/addproduct");
            }}
            className="buttons"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="whitespace-nowrap"> ID</span>
                    <FaSort className="cursor-pointer" />
                    <ImSortAmountDesc />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="whitespace-nowrap"> Category Name</span>
                    <FaSort className="cursor-pointer" />
                    <ImSortAmountDesc />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="whitespace-nowrap"> Product Name</span>
                    <FaSort className="cursor-pointer" />
                    <ImSortAmountDesc />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="whitespace-nowrap"> Product Color</span>
                    <FaSort className="cursor-pointer" />
                    <ImSortAmountDesc />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="whitespace-nowrap"> Product Price</span>
                    <FaSort className="cursor-pointer" />
                    <ImSortAmountDesc />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="whitespace-nowrap"> Product RAM</span>
                    <FaSort className="cursor-pointer" />
                    <ImSortAmountDesc />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="whitespace-nowrap"> Product ROM</span>
                    <FaSort className="cursor-pointer" />
                    <ImSortAmountDesc />
                  </div>
                </th>
                <th className="px-6 py-4">Show</th>
                <th className="px-6 py-4" scope="col">
                  Delete
                </th>
                <th className="px-6 py-4">Edit</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((item, index) => {
                const calculatedId =
                  (currentPage - 1) * itemperpage + index + 1;
                return (
                  <>
                    <tr
                      className="border-b  dark:border-neutral-500"
                      key={calculatedId}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <h5 className="font-medium text-black ">
                          {calculatedId}
                        </h5>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <h5 className="font-medium text-black ">
                          {item.categoryname}
                        </h5>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="text-black  font-bold">
                          {item.productname}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {item.productcolor}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning whitespace-nowrap bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {`${parseInt(item.productprice).toLocaleString()} ₹`}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {item.productram}GB
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {item.productrom}GB
                        </p>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 cursor-pointer"
                        onClick={() => {
                          navigate("/admin/showproduct", {
                            state: {
                              productid: item.id,
                            },
                          });
                        }}
                      >
                        <div>
                          <FaEye className="text-xl" />
                        </div>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 cursor-pointer text-xl"
                        onClick={() => {
                          if (
                            window.confirm("Do you want to delete this product")
                          ) {
                            deleteDoc(doc(db, "product", item.id));
                          }
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4"
                        onClick={() => {
                          navigate("/admin/editproduct", {
                            state: {
                              productid: item.id,
                            },
                          });
                        }}
                      >
                        <MdEdit className="cursor-pointer text-xl" />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalProducts / itemperpage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
export default AdminProduct;
