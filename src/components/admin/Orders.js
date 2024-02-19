import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useFetch } from "../../hook/usefetch";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/fiirebase";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { milisecondtotime } from "./TImeConvertor";
import { localStringConverter } from "../../global";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemperpage, setitemperpage] = useState(2);

  const [orderdatesearch, setorderdatesearch] = useState(null);
  const navigate = useNavigate();
  const { loadeddata, isPending } = useFetch("orders");
  useEffect(() => {
    if (localStorage.getItem("adminid") === null) {
      navigate("/admin/signin");
    }
  }, [navigate]);

  let filteredwithname = loadeddata;

  if (orderdatesearch != null) {
    let todayDate = new Date();
    let yesterdayTimestamp = todayDate.getTime() - 24 * 60 * 60 * 1000;
    let weekTimestamp = todayDate.getTime() - 7 * 24 * 60 * 60 * 1000;
    let monthTimestamp = todayDate.getTime() - 30 * 24 * 60 * 60 * 1000;
    let yearTimestamp = todayDate.getTime() - 365 * 24 * 60 * 60 * 1000;
    let yesterdayDate = new Date(yesterdayTimestamp);
    let weekDate = new Date(weekTimestamp);
    let monthDate = new Date(monthTimestamp);
    let yearDate = new Date(yearTimestamp);

    filteredwithname = loadeddata.filter((item) => {
      if (orderdatesearch == "today") {
        return item.orderdate > yesterdayDate;
      } else if (orderdatesearch == "week") {
        return item.orderdate > weekDate;
      } else if (orderdatesearch == "month") {
        return item.orderdate > monthDate;
      } else if (orderdatesearch == "year") {
        return item.orderdate > yearDate;
      } else {
        return item;
      }
    });
  }

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
        <div className="flex flex-col w-full md:w-[20%] gap-2">
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
        <div className="flex gap-2">
          <button
            className={`buttons ${orderdatesearch == "today" ? "activebutton" : ""}`}
            onClick={() => {
              setorderdatesearch("today");
            }}
          >
            Today
          </button>
          <button
            className={`buttons ${orderdatesearch == "week" ? "activebutton" : ""}`}
            onClick={() => {
              setorderdatesearch("week");
            }}
          >
            This Week
          </button>
          <button
            className={`buttons ${orderdatesearch == "month" ? "activebutton" : ""}`}
            onClick={() => {
              setorderdatesearch("month");
            }}
          >
            This Month
          </button>
          <button
            className={`buttons ${orderdatesearch == "year" ? "activebutton" : ""}`}
            onClick={() => {
              setorderdatesearch("year");
            }}
          >
            This Year
          </button>
          <button
            className={`buttons ${orderdatesearch == null ? "activebutton" : ""}`}
            onClick={() => {
              setorderdatesearch(null);
            }}
          >
            All Orders
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setitemperpage(2);
              setorderdatesearch(null);
            }}
            className="border px-4 md:px-10 h-10 border-black"
          >
            RESET
          </button>
        </div>
      </div>
      {isPending ? (
        <div className="flex items-center justify-center ">
          <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : totalProducts === 0 ? (
        <h1 className="flex justify-center mt-10">No Data Available</h1>
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">SubTotal</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Delivery</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Print</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((item) => {
                  return (
                    <tr
                      className="border-b  dark:border-neutral-500"
                      key={item.id}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.orderID}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {milisecondtotime(item.orderdate)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.products.map((singleitem, index) => (
                          <React.Fragment key={index}>
                            <span>
                              {singleitem.product.productname}
                              <br />
                              {"RAM : " +
                                singleitem.product.productram +
                                " GB "}
                              <br />
                              {"ROM : " +
                                singleitem.product.productrom +
                                " GB "}
                              <br />
                              {"Quantity : " + singleitem.quantity}
                              <br />
                              {"Color : " + singleitem.product.productcolor}
                              <br />
                            </span>
                            {item.products.length != index + 1 && <br />}
                          </React.Fragment>
                        ))}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {localStringConverter(item.totalprice)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.discountprice
                          ? localStringConverter(item.discountprice)
                          : "0"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.discountprice
                          ? localStringConverter(item.totalpricetopay)
                          : localStringConverter(item.totalprice)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <select
                          name="orderstatus"
                          id="orderstatus"
                          defaultValue={item.status}
                          className="px-3 py-1 cursor-pointer font-bold"
                          onChange={async (e) => {
                            if (
                              window.confirm(
                                "Are you sure you want to change order status"
                              )
                            ) {
                              const getproduct = doc(db, "orders", item.id);
                              await updateDoc(getproduct, {
                                status: e.target.value,
                              });
                            }
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirm">Confirm</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Cancel">Cancel</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span>
                          {item.address.address}
                          <br />
                          {"Country : " + item.address.country}
                          <br />
                          {"State : " + item.address.state}
                          <br />
                          {"Pin code : " + item.address.postal}
                          <br />
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.address.phone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 cursor-pointer">
                        <div className="bg-[#F28123] text-center py-2 px-3 text-white font-bold rounded-lg">
                          Print
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {totalProducts !== 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalProducts / itemperpage)}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};
export default Orders;
