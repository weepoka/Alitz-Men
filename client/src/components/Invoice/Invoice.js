// import React, { useEffect, useState, useRef } from "react";
// import { Icon } from "@iconify/react";
// const Invoice = ({ oder }) => {
//   console.log(oder);
//   const order = oder;
//   const invoiceRef = useRef(null);

//   const handlePrint = () => {
//     const printWindow = window.open("", "", "width=1000,height=1000");
//     printWindow.document.open();
//     printWindow.document.write("<html><head><title>Print</title></head><body>");
//     printWindow.document.write('<div id="print">');
//     printWindow.document.write(invoiceRef.current.innerHTML);
//     printWindow.document.write("</div></body></html>");
//     printWindow.document.close();
//     printWindow.print();

//   };
//   return (
//     <div className="bg-white max-w-full p-8 shadow mb-20 ">
//       <div className="text-right">
//         <button
//           onClick={handlePrint}
//           className="mt-4 ml-auto bg-primary_hov text-black px-4 py-2 rounded"
//         >
//           Print Invoice <Icon icon="material-symbols:download" />
//         </button>
//       </div>
//       <div className="" id="print-section" ref={invoiceRef}>
//         <div className="">
//           <h2 className="text-2xl font-semibold mb-4 text-primary tracking-widest">
//             Invoice
//           </h2>
//         </div>

//         <div className="flex justify-between items-start">
//           <div className="mb-4">
//             <p>
//               <strong>{order?._id ? "Transaction ID" : "Order ID"}:</strong>{" "}
//               {order?._id ? order?._id : null}
//             </p>
//             <p>
//               <strong>Order Date:</strong> {order?.createdAt?.split("T")[1]}
//             </p>
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold">Customer Details</h3>
//             <p>
//               <strong>Name:</strong> {order?.customerData?.name}
//             </p>
//             <p>
//               <strong>Contact Number:</strong> {order?.customerData?.mobile}
//             </p>
//             <p>
//               <strong>Address:</strong> {order?.customerData?.address},{" "}
//               {order?.customerData?.area}, {order?.customerData?.division}
//             </p>
//           </div>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold">Products</h3>
//           <table className="w-full mt-4">
//             <thead>
//               <tr>
//                 <th className="text-left px-5">Name</th>
//                 <th className="text-end px-5">Quantity</th>
//                 <th className="text-end px-5">Sizes</th>
//                 <th className="text-end px-5">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order?.products?.map((product) => (
//                 <tr key={product._id}>
//                   <td className="text-left px-5">{product?.category}</td>
//                   <td className="text-end px-5">{product?.quantity}</td>
//                   <td className="text-end px-5">
//                     {product?.size?.selectedSize
//                       ? product?.size?.selectedSize
//                       : 0}
//                   </td>
//                   <td className="text-end px-5">${product?.price}</td>
//                 </tr>
//               ))}
//               <tr>
//                 <td colSpan={4} className="text-end px-5">
//                   {" "}
//                   <strong>Total:</strong>{" "}
//                   <span className="ml-20">${order?.TotalPrice}</span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;

import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import logo from "../../assets/logo/Logo-01.png";
import "./Invoice.css";
const Invoice = ({ order }) => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const invoiceRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=1000,height=1000");
    printWindow.document.open();
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write('<div id="print">');
    printWindow.document.write(invoiceRef.current.innerHTML);
    printWindow.document.write("</div></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white rounded-md ">
      <div className="max-w-screen-xl mx-auto  p-8 rounded-lg shadow-md border ">
        <div>
          <div className="text-right">
            <button
              onClick={handlePrint}
              className="mt-4 flex justify-center font-semibold gap-2 items-center ml-auto bg-primary text-black px-4 py-2 rounded
           "
            >
              Print Invoice <Icon icon="material-symbols:download" />
            </button>
          </div>
        </div>
        <div className="" id="print-section" ref={invoiceRef}>
          {/* <div className="py-5 flex justify-between gap-5 border-b-2">
            <div>
              <img src={logo} alt="" className="md:w-80 w-60 -ml-6" />
              <div className="pt-5 font-bold">
                <p> Date : {date.toLocaleDateString()}</p>
              </div>
            </div>
          </div> */}
          <div className="py-5 flex justify-between gap-5 border-b-2">
            <div>
              <h1 className="font-bold text-xl py-2">Bill From:</h1>

              <div>
                {" "}
                <img
                  src={logo}
                  alt="logo"
                  className="w-40 ml-3  logo-for-print max-w-[100px] max-h-[100px]"
                />
              </div>
              <p>
                10 Taher Tower Shopping Center,Shop#219,(1st Floor), <br />
                Gulshan-2,Dhaka-1212., Dhaka, Bangladesh
              </p>
              <p>0123542235</p>
              <p> Date : {date.toLocaleDateString()}</p>
            </div>
            <div>
              <h1 className="font-bold text-xl py-2">Bill To:</h1>
              <p>{order?.customerData?.name}</p>
              <p>{order?.customerData?.mobile}</p>
              <p>
                {order?.customerData?.addrerss}, {order?.customerData?.area},{" "}
                {order?.customerData?.division}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mb-4 my-5">
              <p>
                <strong>{order?._id ? "Transaction ID" : "Order ID"}:</strong>{" "}
                {order?._id ? order?._id : "01234"}
              </p>
              <p className="pt-2">
                <strong>Order Date:</strong>{" "}
                {new Date(order?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              Courier Information:
              <p> {order?.courierService}</p>
              <p>{order?.courierLocation}</p>
              <p>{order?.courierMan}</p>
              <p> {order?.courierPhone}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-left px-5">Name</th>
                  <th className="text-end px-5">Quantity</th>
                  <th className="text-end px-5">Sizes</th>

                  <th className="text-end px-5">Price </th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((product, i) => (
                  <tr key={i}>
                    <td className="text-left px-5">{product?.name}</td>
                    <td className="text-end px-5">{product?.quantity}</td>
                    <td className="text-end px-5">
                      {product?.size?.selectedSize !== undefined
                        ? product.size.selectedSize
                        : "N/A"}
                    </td>

                    <td className="text-end px-5">${product?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t">
            <div>
              <p className="my-2 font-bold ">Subtotal: ${order?.Subtotal}</p>
              <p className="my-2 font-bold">
                Delivery Fee : {order?.deliveryFee}
              </p>
              <p className="my-2 font-bold">
                Vat/Tax 15% : {order?.Subtotal * 0.15}
              </p>
              <div className="mt-6 ">
                <span className="text-lg font-bold items-center bg-slate-200 text-black inline-flex rounded-md   px-3 py-2">
                  Total:
                  <Icon icon="mdi:currency-bdt" />
                  {Math.round(order?.TotalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
