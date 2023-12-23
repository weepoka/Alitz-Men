import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Api from "../../Api";
import { useDispatch } from "react-redux";
import { Rnvoice } from "../../redux/orebiSlice";
const OrderList = ({ order, index }) => {
  const {
    customerData,
    _id,

    TotalPrice,
    products,
    paidStatus,
    orderStatus,
    updatedAt,
  } = order;
  //   [
  //     //   "Order Placed",
  //     "Processing",
  //     "Shipped",
  //     "Delivered",
  //     "canceled",
  //   ];
  const [statusColor, setStatusColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderStatus === "Delivered") {
      setStatusColor("bg-green-400");
    } else if (orderStatus === "canceled") {
      setStatusColor("bg-red-400");
    } else if (orderStatus === "Processing") {
      setStatusColor("bg-[#54b7d3]");
    } else if (orderStatus === "Shipped") {
      setStatusColor("bg-[#1e91cf]");
    } else {
      setStatusColor("bg-[#f3a638]");
    }
  }, []);

  //   const date = new Date();
  function formatDate(dateString) {
    const dateOptions = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    return formattedDate;
  }
  const [userId, SetUserId] = useState("");
  const genarateId = () => {
    console.log(_id);
  };
  // console.log(statusColor);
  //   className="py-10 text-center"
  return (
    <>
      <tr
        className={`py-5 bg-fourth  text-white border-b  duration-500 sticky-top ${
          index % 2 === 0 ? "even-row" : "odd-row"
        }`}
      >
        <td>{index}</td>
        <td>{_id?.slice(0, 6)}</td>
        {/* <td>{date.toLocaleDateString("en-US", updatedAt)}</td> */}
        <td>{formatDate(updatedAt)}</td>

        <td className="py-16 text-center flex flex-wrap gap-2 ml-4 justify-center items-cente relative w-[100px]">
          {products?.map((item, idx) => (
            <img
              key={idx}
              src={`${Api.defaults.baseURL}/uploads/${item?.url[0]}`}
              className="h-6 w-6 rounded-full  hover:h-20 hover:w-20 hover:absolute duration-200"
              alt=""
            />
          ))}
        </td>

        <td scope="row">
          {products?.map((item) => (
            <>
              <p>{item.quantity}</p>
            </>
          ))}
        </td>
        <td scope="row">
          {products?.map((item) => (
            <>
              <p>{Math.round(item?.price)}</p>
            </>
          ))}
        </td>
        <td>{TotalPrice}</td>

        <td>{customerData?.name}</td>
        <td>{customerData?.mobile}</td>
        <td>
          <button
            onClick={() => dispatch(Rnvoice({ show: true, data: order }))}
          >
            Click
          </button>
        </td>

        <td>
          <span
            className={`${statusColor} text-white p-2 rounded-md mx-2 font-bold`}
          >
            {orderStatus}
          </span>
        </td>
      </tr>
    </>
  );
};

export default OrderList;
