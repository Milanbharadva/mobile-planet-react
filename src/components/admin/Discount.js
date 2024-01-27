import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useFetch } from "../../hook/usefetch";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { MdEdit } from "react-icons/md";
import { milisecondtotime } from "./TImeConvertor";

const Discount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemperpage, setitemperpage] = useState(2);
  const [discountnamesearch, setdiscountnamesearch] = useState("");
  const navigate = useNavigate();
  const { loadeddata, isPending } = useFetch("discount");
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, []);

  let filteredwithname = loadeddata.filter((item) =>
    item.name.toLowerCase().includes(discountnamesearch.toLowerCase())
  );
  var totalProducts = filteredwithname.length;
  var paginatedProducts = filteredwithname.slice(
    (currentPage - 1) * itemperpage,
    currentPage * itemperpage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <AdminNavbar />

      <div className="flex flex-col md:flex-row mx-4 md:mx-10 my-5 gap-4 md:gap-5 md:items-end">
        <div className="flex flex-col w-full md:w-1/4 gap-2">
          <label className="text-sm md:text-base">Discount name</label>
          <input
            type="text"
            onChange={(e) => setdiscountnamesearch(e.target.value)}
            name="name"
            value={discountnamesearch}
            className="pl-2 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/4 gap-2">
          <label className="text-sm md:text-base">
            Discount Items Per Page
          </label>
          <select
            name="productperpageselector"
            onChange={(e) => {
              setCurrentPage(1);
              setitemperpage(e.target.value);
            }}
            value={itemperpage}
            className="h-10 px-2 border border-gray-300 rounded-md"
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setitemperpage(2);
              setdiscountnamesearch("");
            }}
            className="border px-4 md:px-10 h-10 border-black"
          >
            RESET
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              navigate("/admin/adddiscount");
            }}
            className="buttons"
          >
            Add Discount
          </button>
        </div>
      </div>
      {isPending ? (
        <div className="flex items-center justify-center ">
          <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th className="px-6 py-4" scope="col">
                    Delete
                  </th>
                  <th className="px-6 py-4">Edit</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4"> Discount Name </th>
                  <th className="px-6 py-4">Discount Code</th>
                  <th className="px-6 py-4"> Discount Start date</th>
                  <th className="px-6 py-4">Discount Expire date</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4">Minimum Cart</th>
                  <th className="px-6 py-4">Show</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((item, index) => {
                  const calculatedId =
                    (currentPage - 1) * itemperpage + index + 1;

                  return (
                    <tr
                      className="border-b  dark:border-neutral-500"
                      key={item.id}
                    >
                      <td
                        className="whitespace-nowrap px-6 py-4 cursor-pointer"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Do you want to delete this discount"
                            )
                          ) {
                            deleteDoc(doc(db, "discount", item.id));
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
                          navigate("/admin/editdiscount", {
                            state: {
                              discountid: item.id,
                            },
                          });
                        }}
                      >
                        <MdEdit />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <h5 className="font-medium text-black ">
                          {calculatedId}
                        </h5>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="text-black text-md font-bold">
                          {item.name}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {item.DiscountCode}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning whitespace-nowrap bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {milisecondtotime(item.startDate)}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {" "}
                          {milisecondtotime(item.endDate)}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {item.Discount} {item.DiscountBy}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                          {item.MinimumCart}
                        </p>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 cursor-pointer"
                        onClick={() => {
                          navigate("/admin/editdiscount", {
                            state: {
                              discountid: item.id,
                            },
                          });
                        }}
                      >
                        <div>Show</div>
                      </td>
                    </tr>
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
      )}
    </>
  );
};
export default Discount;
