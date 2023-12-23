import React, { useEffect, useState } from "react";
import OrderTable from "../../components/Admin/OrderTable";
import Api from "../../Api";
import Invoice from "../../components/Invoice/Invoice";
import { useDispatch, useSelector } from "react-redux";
const Order = () => {
  const [orders, setorders] = useState([""]);
  const [odd, setOdd] = useState([""]);
  const info = useSelector((state) => state?.orebiReducer?.Rnvoice);
  // get product /////
  const getProduct = async () => {
    try {
      const res = await Api.get("master/api/v1/order");
      if (res.data.data) {
        setorders(res.data.data);
      }
    } catch (error) {
      console.error({ error });
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  //####### filter start ##################
  const ifLess = orders.filter((item) => item?.products?.length < 2);
  const ifTwo = orders.filter((item) => item?.products?.length === 2);
  const ifThree = orders.filter((item) => item?.products?.length === 3);
  const ifFour = orders.filter((item) => item?.products?.length === 4);
  const ifMore = orders.filter((item) => item?.products?.length > 4);
  const shipped = orders.filter((item) =>
    ["Shipped", "Processing"].includes(item?.orderStatus)
  );

  //####### filter end ##################

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl my-10 font-semibold bg-primary text-white py-3 px-5 font-serif">
        Orders
      </h2>
      <div className="flex md:flex-nowrap flex-wrap justify-average gap-5">
        <div className="text-center text-lg border-primary border-2 rounded w-[200px] py-8 px-5">
          <p>Total Orders</p>
          <p className="text-4xl mt-3 font-semibold">{orders?.length}</p>
        </div>
        <div className="text-center text-lg border-primary border-2 rounded w-[200px] py-8 px-5">
          <p>Total Shipment</p>
          <p className="text-4xl mt-3 font-semibold">
            {orders?.filter((item) => item?.orderStatus === "Shipped")?.length}
          </p>
        </div>
        <div className="text-center text-lg border-primary border-2 rounded w-[200px] py-8 px-5">
          <p>Total Delivered</p>
          <p className="text-4xl mt-3 font-semibold">
            {
              orders?.filter((item) => item?.orderStatus === "Delivered")
                ?.length
            }
          </p>
        </div>
        <div className="text-center text-lg border-primary border-2 rounded w-[200px] py-8 px-5">
          <p>Total Canceled</p>
          <p className="text-4xl mt-3 font-semibold">
            {orders?.filter((item) => item?.orderStatus === "Canceled")?.length}
          </p>
        </div>
        {/* <div className="text-center text-lg border-primary border-2 rounded w-[200px] py-8 px-5">
          <p>Total Return</p>
          <p className="text-4xl mt-3 font-semibold">{orders?.length}</p>
        </div> */}
      </div>
      {/* Order Procesing */}

      <h2 className="text-3xl my-10 font-semibold bg-primary text-white py-2 px-5 font-serif ">
        OrderProcess
      </h2>

      {/* orderTable Started */}
      <div className=" flex justify-between ">
        <p
          onClick={() => setOdd(ifLess)}
          className=" border py-1 px-3 transition-colors rounded-md cursor-pointer hover:border-primary hover:text-primary"
        >
          {" "}
          One Orders
        </p>
        <p
          onClick={() => setOdd(ifTwo)}
          className="border py-1 px-3 transition-colors rounded-md cursor-pointer hover:border-primary hover:text-primary"
        >
          {" "}
          Two Orders
        </p>
        <p
          onClick={() => setOdd(ifThree)}
          className="border py-1 px-3 transition-colors rounded-md cursor-pointer hover:border-primary hover:text-primary"
        >
          {" "}
          Three Orders
        </p>
        <p
          onClick={() => setOdd(ifFour)}
          className="border py-1 px-3 transition-colors rounded-md cursor-pointer hover:border-primary hover:text-primary"
        >
          {" "}
          Four Orders
        </p>
        <p
          onClick={() => setOdd(ifMore)}
          className="border py-1 px-3 transition-colors rounded-md cursor-pointer hover:border-primary hover:text-primary"
        >
          {" "}
          More Orders
        </p>
      </div>
      <div className=" mt-8 md:grid-cols-2 grid-cols-1 ">
        <OrderTable orders={odd}></OrderTable>
      </div>
      <div className="mt-10 ">
        <div className=" p-5 border-2 rounded-md border-green-600 mr-4">
          <h2 className="text-3xl my-10 font-semibold bg-primary text-white py-2 px-5 font-serif ">
            Shipped & Procesing
          </h2>

          <OrderTable orders={shipped}></OrderTable>
        </div>
      </div>
      <div className=" my-10 p-4 rounded-md ">
        {info && info.show && info.data && <Invoice order={info.data} />}
      </div>
    </div>
  );
};

export default Order;
