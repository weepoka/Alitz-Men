import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Api from "../../Api";

import { Invoice } from "../../components/Invoice/Invoice";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import SingleCard from "../../components/home/Products/Product";
import { Row, Col, Card, Input, Space } from "antd";

const { Search } = Input;
const Process = () => {
  // const { user, status } = useSelector((state) => state.user);
  const [taskList, setTaskList] = useState([""]);
  const [doneList, setDoneList] = useState([""]);
  const [orderInfo, setOrderInfo] = useState([""]);
  const [print, setPrint] = useState([""]);
  const [save, setSave] = useState([""]);
  const [products, setProducts] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [formData, setData] = useState({
    status: "",
    courier: "",
    courierLocation: "",
    courierPhone: "",
    courierMan: "",
  });
  const [custData, setCustData] = useState({
    name: "",
    email: "",
    phone: "",
    add: "",
  });
  const [infoPro, setInfoPro] = useState({
    info: "",
  });
  //######## get Task start######
  const getTaskList = async () => {
    try {
      const res = await Api.get(`/master/api/v1/order/`);
      if (res.data.data) {
        setTaskList(res.data.data);
      } else {
        alert("NO task");
      }
    } catch (error) {
      console.error({ error });
    }
  };
  const getDoneList = async () => {
    try {
      const res = await Api.post(`/api/v1/user/task-done/${""}`);
      if (res.data.data) {
        setDoneList(res.data.data);
      } else {
        alert("NO task");
      }
    } catch (error) {
      console.error({ error });
    }
  };
  //######## get Task end######
  //################# submit data ##
  const handelChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };
  const submitData = async () => {
    const id = orderInfo?._id;
    console.log({ formData });
    if (!id) {
      console.error("Invalid order ID or user ID");
      return;
    }
    try {
      const response = await Api.post(`master/api/v1/order/${id}`, formData);
      console.log({ response });

      if (response.status === 200) {
        getTaskList();
        getDoneList();
        alert("Update Success");
      } else {
        alert("Update failed with status:", response.status);
      }
    } catch (error) {
      console.log("Error updating order:", error.message);
    }
  };
  //############## customer data get ######
  const preChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCustData({ ...custData, [name]: value });
  };
  const custInfoSave = (e) => {
    if (!custData) {
      alert("Customer Info Needed");
      return;
    }
    setSave(custData);
    setCustData({
      name: "",
      email: "",
      phone: "",
      add: "",
    });
  };

  const infoChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfoPro({ ...infoPro, [name]: value });
  };
  const searchPro = (e) => {
    if (e.key === "Enter") {
      if (!infoPro.info) {
        setFilteredProducts(null);
        return;
      }

      // Filter products based on the search query
      const filtered = products?.filter((product) =>
        product?.name?.toLowerCase().includes(infoPro.info?.toLowerCase())
      );

      if (filtered?.length > 0) {
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(null);
      }
      setInfoPro({
        info: "",
      });
    } else {
      return;
    }
  };

  // ### order delete ####
  const orderDel = async (ids) => {
    try {
      const res = await Api.delete(`/master/api/v1/order/${ids}`);
      if (res.data.message === "Deleted") {
        getTaskList();
        getDoneList();
        getData();
        alert("Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // ### get Products ####
  const getData = async () => {
    try {
      const res = await fetch(`${Api}/products/displayProducts`);
      const data = await res.json();

      setProducts(data?.data);
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  //######## effect start#####
  useEffect(() => {
    getTaskList();
    getDoneList();
    getData();
  }, []);
  //######## effect end#####
  //######## search logic start#######
  const onSearch = (value, _e, info) => {
    const filteredData = taskList?.filter(
      (info) =>
        value.includes(info?.customerData?.mobile) ||
        value.includes(info?.customerData?.email)
    );
    const mm = filteredData && filteredData[0];
    console.log(filteredData);
    setOrderInfo(mm);
  };
  //######## search logic end #######
  //######## log start#######

  console.log(taskList);
  //######## log end #######
  return (
    <div className="">
      <div className="flex justify-center p-4">
        <div className="ml-4 w-[300px]">
          <Search
            placeholder="Customer Email or Mobile"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
      <section
        id="TaskList"
        className="w-full relative px-5 mt-5 h-[350px] overflow-y-scroll"
      >
        <Card
          sx={{ color: "#fffff" }}
          title={`My Order List (${
            taskList?.filter((item) => item?.orderStatus === "Order Placed")
              ?.length
          })`}
          className="py-3 bg-primary text-white mt-4 sticky top-0 left-0"
        >
          <Row gutter={[16, 16]}>
            {taskList &&
              taskList?.map((info, i) => (
                <>
                  {info?.orderStatus === "Order Placed" && (
                    <Col key={i} xs={24} sm={12} md={8} lg={5} xl={6}>
                      <Card
                        onClick={() => setOrderInfo(info)}
                        className="p-2 cursor-pointer hover:scale-105 duration-200"
                      >
                        <div className="w-full relative">
                          <p> Customer: {info?.customerData?.name}</p>
                          <p> Contact: {info?.customerData?.mobile}</p>
                          <p> Status: {info?.orderStatus}</p>
                          <p> Item: {info?.products?.length}</p>
                          <p className="absolute top-0 right-0"> {1 + i}</p>
                        </div>
                      </Card>
                    </Col>
                  )}
                </>
              ))}
          </Row>
        </Card>
      </section>

      <section
        id="OrderView"
        className="px-5 mt-5 flex justify-between items-start border-t pt-5 border-[#858585]"
      >
        <div className="w-[40%]">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card title="Customer Information">
                <p>
                  {" "}
                  <span className="font-bold">Customer: </span>
                  {orderInfo?.customerData?.name}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Contact:</span>{" "}
                  {orderInfo?.customerData?.mobile}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Status:</span>{" "}
                  {orderInfo?.orderStatus}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Item:</span>{" "}
                  {orderInfo?.products?.length}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card title="Address">
                <p>
                  {" "}
                  <span className="font-bold"> Address: </span>{" "}
                  {orderInfo?.customerData?.addrerss}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Area: </span>{" "}
                  {orderInfo?.customerData?.area}
                </p>
                <p>
                  {" "}
                  <span className="font-bold"> City: </span>{" "}
                  {orderInfo?.customerData?.division}
                </p>
                <p>
                  {" "}
                  <span className="font-bold"> Date: </span>{" "}
                  {orderInfo?.createdAt?.split("T")[0]}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card title="Payment Information">
                <p>
                  {" "}
                  <span className="font-bold"> Payment:</span>{" "}
                  {orderInfo?.paymentBy}
                </p>
                <p>
                  {" "}
                  <span className="font-bold"> Status:</span>{" "}
                  {orderInfo?.orderStatus}
                </p>
                <p>
                  {" "}
                  <span className="font-bold"> Paid Status:</span>{" "}
                  {orderInfo?.paidStatus ? "YES" : "NO"}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card title="Cash Information">
                <p>
                  {" "}
                  <span className="font-bold"> Delivery Fee:</span>{" "}
                  {orderInfo?.deliveryFee}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Vat:</span> {orderInfo?.vat}
                </p>
                <p>
                  {" "}
                  <span className="font-bold"> Total price:</span>{" "}
                  {Math.round(orderInfo?.TotalPrice)} tk
                </p>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="flex gap-4 flex-wrap  w-[58%]">
          {orderInfo?.products?.map((url, i) => (
            <Card
              key={i}
              className="w-[calc(50%-1rem)] lg:w-[calc(33.333333%-1rem)]"
            >
              <img
                className="w-full h-48"
                src={`${Api.defaults.baseURL}/uploads/${url?.url[0]}`}
                alt={`Product ${i + 1}`}
              />
              <div className=" flex justify-between">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={`${Api.defaults.baseURL}/uploads/${url?.url[1]}`}
                  alt={`Product ${i + 1}`}
                />
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={`${Api.defaults.baseURL}/uploads/${url?.url[2]}`}
                  alt={`Product ${i + 1}`}
                />
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={`${Api.defaults.baseURL}/uploads/${url?.url[3]}`}
                  alt={`Product ${i + 1}`}
                />
              </div>
              <p>Quantity: {url?.quantity}</p>
              <p>Price: {Math.round(url?.price)} tk</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="confirmation" className=" px-5 mt-10 ">
        <p className="py-3 p-1 bg-primary text-white font-bold rounded-md text-center ">
          Order Shipment Process
        </p>
        <div className=" flex gap-x-10 mt-2">
          <div className="">
            <p> Order Status</p>
            <select
              name="status"
              onChange={(e) => handelChange(e)}
              className=" w-[220px] h-10 border rounded-md p-2"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Assign">Assign</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
          <div className="">
            <p> Cancellation Reason</p>
            <input
              onChange={(e) => handelChange(e)}
              type="text"
              name="reason"
              className=" w-[220px] h-10 border rounded-md p-2"
            />
          </div>
          <div className="">
            <p> Courier Service</p>
            <input
              onChange={(e) => handelChange(e)}
              type="text"
              name="courier"
              className=" w-[220px] h-10 border rounded-md p-2"
            />
          </div>
          <div className="">
            <p> Courier Location</p>
            <input
              onChange={(e) => handelChange(e)}
              type="text"
              name="courierLocation"
              className=" w-[220px] h-10 border rounded-md p-2"
            />
          </div>
          <div className="">
            <p> Courier Phone</p>
            <input
              onChange={(e) => handelChange(e)}
              type="text"
              name="courierPhone"
              className=" w-[220px] h-10 border rounded-md p-2"
            />
          </div>
          <div className="">
            <p> Courier Man</p>
            <input
              onChange={(e) => handelChange(e)}
              type="text"
              name="courierMan"
              className=" w-[220px] h-10 border rounded-md p-2"
            />
          </div>
        </div>
        <button
          onClick={submitData}
          className=" w-[220px] border rounded-xl py-2 mt-5"
        >
          Submit
        </button>
      </section>

      <section
        id="Cancel"
        className=" w-full px-5 h-[350px] overflow-y-scroll "
      >
        <p className="py-3 bg-primary text-white font-bold rounded-md text-center mt-10 ">
          {`Cancel List :(${
            taskList?.filter((item) => item?.orderStatus === "Canceled")?.length
          })`}
        </p>
        <div className="flex  gap-2 flex-wrap  ">
          {taskList &&
            taskList?.map((info, i) => (
              <>
                {info?.orderStatus === "Canceled" && (
                  <div
                    key={i}
                    onClick={() => setOrderInfo(info)}
                    className="p-2 bg-red-400 w-[300px] flex justify-end shadow-xl rounded-md border cursor-pointer mt-5 hover:scale-105 duration-200 "
                  >
                    <div className=" w-full">
                      <p> Customer:{info?.customerData?.name}</p>
                      <p> Contact:{info?.customerData?.mobile}</p>
                      <p> Reason:{info?.reason}</p>
                      <p> Item: {info?.products?.length}</p>
                      <p
                        className="  rounded-md border text-center text-white cursor-pointer bg-red-800"
                        onClick={() => orderDel(info._id)}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </section>

      <section
        id="Shipped"
        className=" w-full px-5 h-[350px] overflow-y-scroll "
      >
        <p className="py-3 bg-primary text-white font-bold rounded-md text-center mt-10 ">
          {`Shipped List :(${
            taskList?.filter((item) => item?.orderStatus === "Shipped")?.length
          })`}
        </p>
        <div className="flex  gap-2 flex-wrap  ">
          {taskList &&
            taskList?.map((info, i) => (
              <>
                {info?.orderStatus === "Shipped" && (
                  <div
                    key={i}
                    onClick={() => setOrderInfo(info)}
                    className="p-2 bg-green-400 w-[300px] flex justify-end shadow-xl rounded-md border cursor-pointer mt-5 hover:scale-105 duration-200 "
                  >
                    <div className=" w-full">
                      <p> Customer:{info?.customerData?.name}</p>
                      <p> Contact:{info?.customerData?.mobile}</p>
                      <p> Reason:{info?.reason}</p>
                      <p> Item: {info?.products?.length}</p>
                      <p
                        className="  rounded-md border text-center text-white cursor-pointer bg-red-800"
                        onClick={() => orderDel(info._id)}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </section>
      <section
        id="Delivered"
        className=" w-full px-5 h-[350px] overflow-y-scroll "
      >
        <p className="py-3 bg-primary text-white font-bold rounded-md text-center mt-10 ">
          {`Delivered List :(${
            taskList?.filter((item) => item?.orderStatus === "Delivered")
              ?.length
          })`}
        </p>
        <div className="flex  gap-2 flex-wrap  ">
          {taskList &&
            taskList?.map((info, i) => (
              <>
                {info?.orderStatus === "Delivered" && (
                  <div
                    key={i}
                    onClick={() => setOrderInfo(info)}
                    className="p-2 bg-yellow-400 w-[300px] flex justify-end shadow-xl rounded-md border cursor-pointer mt-5 hover:scale-105 duration-200 "
                  >
                    <div className=" w-full">
                      <p> Customer:{info?.customerData?.name}</p>
                      <p> Contact:{info?.customerData?.mobile}</p>
                      <p> Reason:{info?.reason}</p>
                      <p> Item: {info?.products?.length}</p>
                      <p
                        className="  rounded-md border text-center text-white cursor-pointer bg-red-800"
                        onClick={() => orderDel(info._id)}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Process;
