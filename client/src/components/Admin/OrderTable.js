import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import OrderList from "./OrderList";

const OrderTable = ({ orders }) => {
  return (
    <>
      <Scrollbars style={{ width: "100%", height: 600 }}>
        <div className="relative  sm:rounded-lg ">
          <table className="w-full table-auto text-center  text-black dark:text-gray-400 sticky top-0 z-50">
            <thead className="text-xs font-serif  text-white bg-primary dark:bg-gray-800 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>

                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Print
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item, index) => (
                <OrderList key={index} order={item} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </Scrollbars>
    </>
  );
};

export default OrderTable;
