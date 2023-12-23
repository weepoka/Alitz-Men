import React, { useEffect, useState } from "react";
import Api from "../../Api";
import { Row, Col, Card } from "antd";


import { Input, Space } from "antd";
const { Search } = Input;
const Contact = () => {
  const [std, setStd] = useState([]);
  const [view, setView] = useState([]);
  const [vieww, setVieww] = useState(false);
  const [oder, setRegi] = useState("");

  //############ get customer #####
  const getStudent = async () => {
    try {
      const res = await Api.get("/master/api/v1/customer");
      setStd(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrder = async (regi) => {
    try {
      const res = await Api.get(`/master/api/v1/customer/${regi}`);
      setRegi(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const viewOrder = async (info) => {
    setVieww(true);
    await setView(info);
  };

  //######################################

  //######################################

  useEffect(() => {
    getStudent();
  }, []);
  const onSearch = (value, _e, info) => {
    const filteredData = std?.data?.filter(
      (info) => value.includes(info?.mobile) || value.includes(info?.email)
    );
    const mm = filteredData && filteredData[0];
    console.log(mm);
    getOrder(mm?._id);
  };
  console.log(typeof oder);
  console.log(oder);
  //############ get customer #####
  return (
    <>
      <div className=" py-10 mt-10 border-2 rounded-md border-green-600 mr-4 w-full">
        <h2 className="text-3xl my-10 font-semibold bg-primary text-white py-2 px-5 font-serif ">
          {std?.message}
        </h2>
        <div className="ml-4 w-[300px]">
          <Search
            placeholder="Customer Email or Mobile"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <section
          id="TaskList"
          className="w-full relative px-5 mt-5 h-[350px] overflow-y-scroll"
        >
          <Card
            sx={{ color: "#fffff" }}
            className="py-3 bg-primary text-white mt-4 sticky top-0 left-0"
          >
            <Row gutter={[16, 16]}>
              {std?.data &&
                std?.data?.map((info, i) => (
                  <>
                    <Col key={i} xs={24} sm={12} md={8} lg={5} xl={6}>
                      <Card className="p-2  hover:scale-105 duration-200">
                        <div className="w-full relative">
                          <p> Customer: {info?.name}</p>
                          <p> Contact: {info?.mobile}</p>
                          <p> Email: {info?.email}</p>
                          <p> Address: {info?.addrerss}</p>
                          <p> Area: {info?.area}</p>
                          <p> Division: {info?.division}</p>
                          <p className="absolute top-0 right-0"> {1 + i}</p>
                          <p className="mt-2">
                            {" "}
                            Total Order: {info?.orderList?.length}
                          </p>
                          <p
                            onClick={() => getOrder(info?._id)}
                            className="cursor-pointer text-end   "
                          >
                            View Order
                          </p>
                        </div>
                      </Card>
                    </Col>
                  </>
                ))}
            </Row>
          </Card>
        </section>

        <section className="OrderList">
          <div className=" p-5 mt-10 w-full flex justify-between">
            <div>
              {oder &&
                oder?.order?.map((item, i) => (
                  <div>
                    <p
                      onClick={() => viewOrder(item)}
                      className="text-white inline-block cursor-pointer mt-2 px-5 py-2 mr-4 border rounded-md bg-gray-700 "
                    >
                      {`SR(${i + 1})   ${item?.createdAt?.split("T")[0]}`}
                    </p>
                  </div>
                ))}
              <div className="text-white p-4 mr-2">
                <p> Customer: {oder?.name}</p>
                <p> Contact: {oder?.mobile}</p>
                <p> Email: {oder?.email}</p>
                <p> Address: {oder?.addrerss}</p>
                <p> Area: {oder?.area}</p>
                <p> Division: {oder?.division}</p>

                <p className="mt-2"> Total Order: {oder?.orderList?.length}</p>
              </div>
            </div>
            {vieww && (
              <div className="text-white w-[70%]">
                <p>Order ID: {view?._id}</p>
                <p>Customer ID: {view?.cId}</p>
                <p>Subtotal: ${view?.Subtotal}</p>
                <p>Total Price: ${view?.TotalPrice}</p>
                <p>Delivery Fee: ${view?.deliveryFee}</p>
                <p>Payment Method: {view?.paymentBy}</p>
                <p>Paid Status: {view?.paidStatus ? "Paid" : "Not Paid"}</p>
                <p>Order Status: {view?.orderStatus}</p>
                <p>VAT: ${view?.vat}</p>
                <p>Created At: {new Date(view?.createdAt).toLocaleString()}</p>
                {/* Add more details as needed */}
                {view?.products?.map((product, index) => (
                  <div
                    className=" p-4 my-2 w-full flex justify-between gap-x-4"
                    key={index}
                  >
                    <p>Proudct: {product?.name}</p>
                    <p>Price: {product?.price}</p>
                    <p>Size: {product?.size?.selectedSize}</p>
                    <p>Quantity: {product?.quantity}</p>
                    {product?.url?.map((url) => (
                      <div className=" flex w-full px-4 gap-x-2">
                        <img
                          className="h-[100px] w-[100px] rounded-md"
                          src={`${Api.defaults.baseURL}/uploads/${url}`}
                          alt="ny"
                        />
                      </div>
                    ))}
                    {/* Add more product details as needed */}
                  </div>
                ))}
                {view?.pId?.map((product, index) => (
                  <div key={index}>
                    <p>Product ID: {product}</p>
                    {/* Add more product details as needed */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
